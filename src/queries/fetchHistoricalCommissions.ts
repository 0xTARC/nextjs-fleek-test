import Decimal from 'decimal.js'
import { request as gqlRequest } from 'graphql-request'

import { Address } from 'viem'
import { chainToBlocksGraphQlAPI, chainToGraphQlAPI, chainToGraphQlSdk } from '~/subgraph'
import { CommissionsData, calcCommissionsEarnedSinceLastTransfer } from '~/utils/collateral'
import {
  BlocksForTimestampsResponse,
  CommissionsTimeSeriesResponse,
  generateTimestamps,
} from '~/utils/timestamp'

const fetchHistoricalCommissions = async (chainId: number, connectedAccount: Address) => {
  const nowInSeconds = Math.floor(new Date().getTime() / 1000)
  const dailyTimestamps = generateTimestamps(nowInSeconds, '1d', 30)

  /// Build query to Blocks subgraph to transform timestamps to block numbers
  const blocksApiUrl = chainToBlocksGraphQlAPI?.[chainId]
  let query = 'query {'
  for (const timestamp of dailyTimestamps) {
    query += `
      t${timestamp}: blocks(
        first: 1,
        orderBy: number,
        orderDirection: asc,
        where: {
          timestamp_gte: "${timestamp}",
          timestamp_lt: "${timestamp + 60}"
        }
      ) {
        number
      }
    `
  }
  query += '}'
  const blocksForTimestamps = await gqlRequest<BlocksForTimestampsResponse>(blocksApiUrl, query)
  /// End timestamp query

  /// Build query to panoptic subgraph to get commission data over time
  let commissionsTimeSeriesQuery = 'query {'
  const blocksForTimestampEntriesTrimmed = Object.entries(blocksForTimestamps).slice(0, -1) // excludes last entry which represents the block at the current time and will always be undefined

  blocksForTimestampEntriesTrimmed.forEach(([timestamp, block]) => {
    const blockToQuery = block[0]?.number ? BigInt(block[0].number) : undefined
    commissionsTimeSeriesQuery += `
        ${timestamp}bundle: bundle(id: 1, block: { number: ${blockToQuery} }) {
          ethPriceUSD
        }

        ${timestamp}panopticPoolAccounts: panopticPoolAccounts(where: { account: "${connectedAccount.toLowerCase()}" }, block: { number: ${blockToQuery} }) {
          id
          commissionsSinceLastTransfer0
          commissionsSinceLastTransfer1
          panopticPool {
            underlyingPool {
              id
              token0 {
                name
                derivedETH
              }
              token1 {
                name
                derivedETH
              }
            }

            collateral0 {
              id
              index
              token {
                id
              }
              totalAssets
              totalShares
            }

            collateral1 {
              id
              index
              token {
                id
              }
              totalAssets
              totalShares
            }
          }
        }
    `
  })
  commissionsTimeSeriesQuery += '}'
  // console.log('commissionsTimeSeriesQuery: ', commissionsTimeSeriesQuery)
  const panopticApiUrl = chainToGraphQlAPI?.[chainId]
  const commissionsTimeSeriesData = await gqlRequest<CommissionsTimeSeriesResponse>(
    panopticApiUrl,
    commissionsTimeSeriesQuery,
  )
  // console.log('commissionsTimeSeriesData: ', commissionsTimeSeriesData)
  /// End commissions time series data query

  /// Get latest commission data point
  const sdk = chainToGraphQlSdk?.[chainId]
  const latestCommissionsData = await sdk.GetCommissions({
    account: connectedAccount.toLowerCase(),
  })

  // Update latest commission data with remaining commissions between most recent update and current time
  // console.log('latestCommissionsData: ', latestCommissionsData)
  latestCommissionsData.panopticPoolAccounts.forEach((ppa) => {
    const currentSharePrice0 = new Decimal(ppa.panopticPool.collateral0.totalAssets).div(
      new Decimal(ppa.panopticPool.collateral0.totalShares),
    )
    const sharePriceAtLastTransfer0 = new Decimal(ppa.sharePriceAtLastTransfer0)
    const sharesBeforeTransfer0 = new Decimal(ppa.collateral0Shares)
    const sharePriceBeforeTransfer0 = currentSharePrice0
    const sharesAfterTransfer0 = new Decimal(ppa.collateral0Shares)
    const sharePriceAfterTransfer0 = currentSharePrice0
    // TODO: is this double counting? should i just do the first term since there's no affect on share price? e.g. sharesBeforeTransfer * (sharePriceBeforeTransfer - sharePriceAtLastTransfer)
    const commissionsSinceLastTransfer0 = calcCommissionsEarnedSinceLastTransfer(
      sharePriceAtLastTransfer0.toString(),
      sharesBeforeTransfer0.toString(),
      sharePriceBeforeTransfer0.toString(),
      sharesAfterTransfer0.toString(),
      sharePriceAfterTransfer0.toString(),
    )
    ppa.commissionsSinceLastTransfer0 = new Decimal(ppa.commissionsSinceLastTransfer0)
      .plus(new Decimal(commissionsSinceLastTransfer0))
      .toString()

    const currentSharePrice1 = new Decimal(ppa.panopticPool.collateral1.totalAssets).div(
      new Decimal(ppa.panopticPool.collateral1.totalShares),
    )
    const sharePriceAtLastTransfer1 = new Decimal(ppa.sharePriceAtLastTransfer1)
    const sharesBeforeTransfer1 = new Decimal(ppa.collateral1Shares)
    const sharePriceBeforeTransfer1 = currentSharePrice1
    const sharesAfterTransfer1 = new Decimal(ppa.collateral1Shares)
    const sharePriceAfterTransfer1 = currentSharePrice1
    const commissionsSinceLastTransfer1 = calcCommissionsEarnedSinceLastTransfer(
      sharePriceAtLastTransfer1.toString(),
      sharesBeforeTransfer1.toString(),
      sharePriceBeforeTransfer1.toString(),
      sharesAfterTransfer1.toString(),
      sharePriceAfterTransfer1.toString(),
    )

    ppa.commissionsSinceLastTransfer1 = (
      Number(ppa.commissionsSinceLastTransfer1) + Number(commissionsSinceLastTransfer1)
    ).toString()
  })

  /// Create combined list of historical and current commissions data
  const allCommissionsData = [
    ...Object.values(commissionsTimeSeriesData),
    ...Object.values(latestCommissionsData),
  ]

  /// Create list of all historical + current timestamp
  const allTimestamps = Object.keys(blocksForTimestamps).map((b) => b.split('t')[1])
  // console.log('allTimestamps: ', allTimestamps)
  // console.log('allTimestamps.length: ', allTimestamps.length)

  /// Convert commissions data at each point in time to USD
  // console.log('allCommissionsData: ', allCommissionsData)
  // console.log('allCommissionsData.length: ', allCommissionsData.length)
  const historicalCommissions: CommissionsData[] = []
  for (let i = 0; i < allCommissionsData.length - 1; i += 2) {
    // TODO: type the dynamic gql query results
    const curBundle = allCommissionsData[i]
    const currentEthPrice = Number(curBundle?.ethPriceUSD)

    const curPpa = allCommissionsData[i + 1][0]
    const curCommissionsUsd =
      Number(curPpa?.commissionsSinceLastTransfer0) *
        Number(curPpa?.panopticPool.underlyingPool.token0.derivedETH) *
        currentEthPrice +
      Number(curPpa?.commissionsSinceLastTransfer1) *
        Number(curPpa?.panopticPool.underlyingPool.token1.derivedETH) *
        currentEthPrice

    historicalCommissions.push({
      commissionsUsd: isNaN(curCommissionsUsd) ? 0 : curCommissionsUsd,
      timestamp: allTimestamps[i / 2],
    })
  }

  // To get total earnings, we can simply get the last item out of the list to get total earnings.
  // This is because historicalCommissions accumulate on every transfer event, and we updated the latest entry
  // to reflect share price changes since the last update.
  const totalEarned = historicalCommissions[historicalCommissions.length - 1].commissionsUsd

  return {
    historicalCommissions,
    latestCommissionsData,
    totalEarned,
  }
}

// TODO: total earned can be split out into a separate query which loads faster by just querying the user's panopticPoolAccounts. Doesn't need the bulk query results of fetchHistoricalCommissions
export const fetchHistoricalCommissionsWithTotalEarned = async (
  chainId: number,
  address: Address,
) => {
  // console.log('[fetchHistoricalCommissionsWithTotalEarned]')
  try {
    const { historicalCommissions, latestCommissionsData, totalEarned } =
      await fetchHistoricalCommissions(chainId, address)

    // console.log(
    //   '[fetchHistoricalCommissionsWithTotalEarned] historicalCommissions: ',
    //   historicalCommissions,
    // )

    // To get total deposits, Sum deposited assets among all panoptic pool accounts for the connected account.
    const currentEthPrice = Number(latestCommissionsData.bundle?.ethPriceUSD)
    const totalDeposited = latestCommissionsData?.panopticPoolAccounts.reduce((acc, ppa) => {
      const curPpaDepositsUsd =
        Number(ppa?.collateral0Assets) *
          Number(ppa?.panopticPool.underlyingPool.token0.derivedETH) *
          currentEthPrice +
        Number(ppa?.collateral1Assets) *
          Number(ppa?.panopticPool.underlyingPool.token1.derivedETH) *
          currentEthPrice

      return acc + curPpaDepositsUsd
    }, 0)

    return { historicalCommissions, totalEarned, totalDeposited }
  } catch (e) {
    console.error('e: ', e)
    throw e
  }
}

const mockCommissions: CommissionsData[] = [
  {
    commissionsUsd: 0.0,
    timestamp: '1714068818',
  },
  {
    commissionsUsd: 0.76,
    timestamp: '1714155218',
  },
  {
    commissionsUsd: 1.75,
    timestamp: '1714241618',
  },
  {
    commissionsUsd: 2.66,
    timestamp: '1714328018',
  },
  {
    commissionsUsd: 3.31,
    timestamp: '1714414418',
  },
  {
    commissionsUsd: 4.19,
    timestamp: '1714500818',
  },
  {
    commissionsUsd: 5.22,
    timestamp: '1714587218',
  },
  {
    commissionsUsd: 6.56,
    timestamp: '1714673618',
  },
  {
    commissionsUsd: 7.78,
    timestamp: '1714760018',
  },
  {
    commissionsUsd: 8.83,
    timestamp: '1714846418',
  },
  {
    commissionsUsd: 10.11,
    timestamp: '1714932818',
  },
  {
    commissionsUsd: 11.04,
    timestamp: '1715019218',
  },
  {
    commissionsUsd: 11.63,
    timestamp: '1715105618',
  },
  {
    commissionsUsd: 12.84,
    timestamp: '1715192018',
  },
  {
    commissionsUsd: 14.0,
    timestamp: '1715278418',
  },
  {
    commissionsUsd: 14.74,
    timestamp: '1715364818',
  },
  {
    commissionsUsd: 15.79,
    timestamp: '1715451218',
  },
  {
    commissionsUsd: 16.97,
    timestamp: '1715537618',
  },
  {
    commissionsUsd: 17.99,
    timestamp: '1715624018',
  },
  {
    commissionsUsd: 18.95,
    timestamp: '1715710418',
  },
  {
    commissionsUsd: 19.88,
    timestamp: '1715796818',
  },
  {
    commissionsUsd: 21.05,
    timestamp: '1715883218',
  },
  {
    commissionsUsd: 22.11,
    timestamp: '1715969618',
  },
  {
    commissionsUsd: 23.2,
    timestamp: '1716056018',
  },
  {
    commissionsUsd: 23.99,
    timestamp: '1716142418',
  },
  {
    commissionsUsd: 25.0,
    timestamp: '1716228818',
  },
  {
    commissionsUsd: 26.15,
    timestamp: '1716315218',
  },
  {
    commissionsUsd: 27.21,
    timestamp: '1716401618',
  },
  {
    commissionsUsd: 28.5,
    timestamp: '1716488018',
  },
  {
    commissionsUsd: 29.7,
    timestamp: '1716574418',
  },
]

export const fetchHistoricalCommissionsMockData: Awaited<
  ReturnType<typeof fetchHistoricalCommissionsWithTotalEarned>
> = {
  historicalCommissions: mockCommissions,
  totalEarned: 0.0,
  totalDeposited: 0.0,
}
