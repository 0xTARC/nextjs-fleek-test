import { Container } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Address, zeroAddress } from 'viem'
import { useAccount, useChainId, useReadContracts } from 'wagmi'
import { PortfolioTable } from '~/components/portfolioTable'
import { chainToGraphQlSdk } from '~/subgraph'
import * as Separator from '@radix-ui/react-separator'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { formatPpaAccountsForPortfolioInfo } from '~/utils/portfolio'
import { PanopticPoolAccount } from '~/graphql/types.generated'
import { useMemo } from 'react'
import { abi as CollateralTrackerAbi } from '~/abis/CollateralTracker'

export const getVaultsWithDepositsFromAccount = async (chainId: number, address: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const vaultsWithDeposits = await sdk.GetVaultsWithDepositsFromAccount({
    account: address.toLowerCase(),
  })

  return vaultsWithDeposits
}

export default function Portfolio() {
  const chainId = useChainId()
  const { address } = useAccount()
  const { isMobile } = useScreenDetector()

  const { data, isLoading } = useQuery({
    queryKey: ['vaultsWithDepositsFromAccount', chainId, address],
    queryFn: () => getVaultsWithDepositsFromAccount(chainId, address ?? zeroAddress),
    enabled: address !== undefined,
  })

  const collateralTrackerAddressSet = useMemo(() => {
    const addressSet = new Set<Address>()
    if (data?.panopticPoolAccounts.length) {
      data?.panopticPoolAccounts.forEach((ppa) => {
        const collateral0Address = ppa.panopticPool.collateral0.id as Address
        const collateral1Address = ppa.panopticPool.collateral1.id as Address
        addressSet.add(collateral0Address)
        addressSet.add(collateral1Address)
      })
    }
    return addressSet
  }, [data?.panopticPoolAccounts])

  const { data: maxTokensWithdraw, isLoading: isLoadingMaxTokenWithdraw } = useReadContracts({
    contracts: [...collateralTrackerAddressSet].map((collateralTrackerAddress) => {
      return {
        address: collateralTrackerAddress,
        abi: CollateralTrackerAbi,
        functionName: 'maxWithdraw',
        args: [address ?? zeroAddress],
      }
    }),
  })

  const collateralTrackerAddressMaxWithdrawMap = useMemo(() => {
    const temp: Record<Address, bigint> = {}
    const collateralTrackerAddressArr = [...collateralTrackerAddressSet]
    for (let i = 0; i < collateralTrackerAddressArr.length; i++) {
      const collateralTrackerAddress = collateralTrackerAddressArr[i]
      const maxTokenWithdraw = maxTokensWithdraw
        ? (maxTokensWithdraw[i].result as bigint)
        : BigInt(0)
      temp[collateralTrackerAddress] = maxTokenWithdraw
    }
    return temp
  }, [collateralTrackerAddressSet, maxTokensWithdraw])

  const ethToUSD = data?.bundle?.ethPriceUSD
  const portfolioInfo =
    data && data.panopticPoolAccounts.length
      ? formatPpaAccountsForPortfolioInfo(
          data.panopticPoolAccounts as PanopticPoolAccount[],
          Number(ethToUSD),
          collateralTrackerAddressMaxWithdrawMap,
        ).filter((ppa) => {
          return ppa.collateral0Shares > 0 || ppa.collateral1Shares > 0
        })
      : []

  return (
    <Container size="4">
      <div className="flex flex-col gap-y-10">
        <h2 className="text-color-text-base text-3xl font-semibold">Portfolio</h2>
        <div>
          <p className="text-color-text-base text-base font-medium">Deposited Tokens</p>
          {isMobile ? (
            <Separator.Root
              className="bg-gray-100 data-[orientation=horizontal]:h-px mt-3"
              decorative
              orientation="horizontal"
            />
          ) : null}
          <PortfolioTable
            portfolioInfo={portfolioInfo}
            isLoading={isLoading || isLoadingMaxTokenWithdraw}
          />
        </div>

        {/* Link to market detail page */}
        {/* Don't show for now */}
        {/* <p> Earnings </p> */}
      </div>
    </Container>
  )
}
