import * as Types from './types.generated';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const LegFragmentDoc = gql`
    fragment Leg on Leg {
  id
  index
  optionRatio
  asset
  tokenType
  isLong
  riskPartner
  strike
  width
}
    `;
export const PoolDayDataFragmentDoc = gql`
    fragment PoolDayData on PoolDayData {
  id
  date
  txCount
  liquidity
  token0Price
  token1Price
  volumeToken0
  volumeToken1
  volumeUSD
  feesUSD
  open
  high
  low
  close
}
    `;
export const PoolHourDataFragmentDoc = gql`
    fragment PoolHourData on PoolHourData {
  id
  open
  close
  high
  low
  txCount
  periodStartUnix
  token0Price
  token1Price
}
    `;
export const PanopticPoolFragmentDoc = gql`
    fragment PanopticPool on PanopticPool {
  id
  txCount
  underlyingPool {
    id
    feeTier
    tickSpacing
    token0 {
      id
      name
      symbol
      derivedETH
      decimals
    }
    token1 {
      id
      name
      symbol
      derivedETH
      decimals
    }
    totalValueLockedUSD
    poolDayData(first: 1000, orderBy: date, orderDirection: desc) {
      ...PoolDayData
    }
    poolHourData(first: 1000, orderBy: periodStartUnix, orderDirection: desc) {
      ...PoolHourData
    }
  }
  collateral0 {
    id
    totalAssets
    totalShares
    collateralDayData(first: 7) {
      id
      sharePrice
    }
  }
  collateral1 {
    id
    totalAssets
    totalShares
    collateralDayData(first: 7) {
      id
      sharePrice
    }
  }
  commissions0
  commissions1
}
    ${PoolDayDataFragmentDoc}
${PoolHourDataFragmentDoc}`;
export const PoolFragmentDoc = gql`
    fragment Pool on Pool {
  poolId
  sqrtPrice
  tick
  tickSpacing
  id
  liquidity
  token0Price
  token1Price
  feeTier
  totalValueLockedToken0
  totalValueLockedToken1
  totalValueLockedUSD
  token0 {
    id
    name
    symbol
    decimals
    derivedETH
  }
  token1 {
    id
    name
    symbol
    decimals
    derivedETH
  }
  panopticPool {
    ...PanopticPool
  }
}
    ${PanopticPoolFragmentDoc}`;
export const OptionMintFragmentDoc = gql`
    fragment OptionMint on OptionMint {
  id
  from
  eventType
  recipient {
    id
  }
  tickAt
  hash
  blockNumber
  timestamp
  positionSize
  poolUtilizations
  tokenId {
    id
    legs {
      ...Leg
    }
    pool {
      ...Pool
      token0 {
        id
        decimals
        derivedETH
      }
      token1 {
        id
        decimals
        derivedETH
      }
    }
  }
  panopticPool {
    id
  }
}
    ${LegFragmentDoc}
${PoolFragmentDoc}`;
export const OptionBurnFragmentDoc = gql`
    fragment OptionBurn on OptionBurn {
  id
  from
  eventType
  recipient {
    id
  }
  tickAt
  premia
  hash
  blockNumber
  timestamp
  positionSize
  premium0
  premium1
  panopticPool {
    id
  }
  tokenId {
    id
    legs {
      ...Leg
    }
    pool {
      ...Pool
      token0 {
        id
        decimals
      }
      token1 {
        id
        decimals
      }
    }
  }
  txnOpened {
    ...OptionMint
  }
}
    ${LegFragmentDoc}
${PoolFragmentDoc}
${OptionMintFragmentDoc}`;
export const AccountBalanceFragmentDoc = gql`
    fragment AccountBalance on AccountBalance {
  id
  owner {
    id
  }
  sender {
    id
  }
  tokenId {
    id
    idHexString
    legs {
      ...Leg
    }
    pool {
      ...Pool
      token0 {
        id
        decimals
        derivedETH
      }
      token1 {
        id
        decimals
        derivedETH
      }
    }
  }
  panopticPoolAccount {
    id
    panopticPool {
      id
      underlyingPool {
        tick
      }
    }
  }
  tokenCount
  createdTimestamp
  createdBlockNumber
  txnOpened {
    eventType
    ... on OptionMint {
      ...OptionMint
    }
  }
  txnClosed {
    eventType
    ... on OptionBurn {
      ...OptionBurn
    }
  }
}
    ${LegFragmentDoc}
${PoolFragmentDoc}
${OptionMintFragmentDoc}
${OptionBurnFragmentDoc}`;
export const AccountFragmentDoc = gql`
    fragment Account on Account {
  id
  accountBalances {
    ...AccountBalance
  }
}
    ${AccountBalanceFragmentDoc}`;
export const ChunkFragmentDoc = gql`
    fragment Chunk on Chunk {
  id
  owner {
    id
  }
  manager {
    id
  }
  tickLower
  tickUpper
  strike
  width
  tokenType
  pool {
    id
  }
  panopticPool {
    id
  }
  netLiquidity
  shortLiquidity
  longLiquidity
  shortCounts
  longCounts
  totalLiquidity
  legs {
    id
  }
}
    `;
export const CollateralFragmentDoc = gql`
    fragment Collateral on Collateral {
  id
  token {
    id
  }
  totalAssets
  totalShares
  inAMM
  panopticPool {
    id
  }
  index
}
    `;
export const MetaFragmentDoc = gql`
    fragment Meta on _Meta_ {
  block {
    number
  }
}
    `;
export const PanopticPoolAccountFragmentDoc = gql`
    fragment PanopticPoolAccount on PanopticPoolAccount {
  id
  collateral0Assets
  collateral0Shares
  collateral1Assets
  collateral1Shares
  account {
    id
  }
  panopticPool {
    id
    underlyingPool {
      id
      feeTier
      token0 {
        id
        name
        symbol
        derivedETH
        decimals
      }
      token1 {
        id
        name
        symbol
        derivedETH
        decimals
      }
    }
    collateral0 {
      id
      totalAssets
      totalShares
      collateralDayData(first: 7) {
        id
        sharePrice
      }
    }
    collateral1 {
      id
      totalAssets
      totalShares
      collateralDayData(first: 7) {
        id
        sharePrice
      }
    }
  }
}
    `;
export const GetCommissionsAtBlockDocument = gql`
    query GetCommissionsAtBlock($account: String!, $blockNumber: Int) {
  bundle(id: 1, block: {number: $blockNumber}) {
    ethPriceUSD
  }
  panopticPoolAccounts(where: {account: $account}, block: {number: $blockNumber}) {
    id
    collateral0Assets
    collateral1Assets
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
        ...Collateral
      }
      collateral1 {
        ...Collateral
      }
    }
  }
}
    ${CollateralFragmentDoc}`;
export const GetCommissionsDocument = gql`
    query GetCommissions($account: String!) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(where: {account: $account}) {
    id
    commissionsSinceLastTransfer0
    commissionsSinceLastTransfer1
    sharePriceAtLastTransfer0
    sharePriceAtLastTransfer1
    collateral0Shares
    collateral1Shares
    collateral0Assets
    collateral1Assets
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
        ...Collateral
      }
      collateral1 {
        ...Collateral
      }
    }
  }
}
    ${CollateralFragmentDoc}`;
export const GetSamplePoolsWithCollateralDayDataDocument = gql`
    query GetSamplePoolsWithCollateralDayData {
  panopticPools(first: 3) {
    id
    underlyingPool {
      id
      feeTier
      token0 {
        id
        decimals
        symbol
      }
      token1 {
        id
        decimals
        symbol
      }
    }
    collateral0 {
      totalAssets
      totalShares
      collateralDayData(first: 7) {
        id
        sharePrice
      }
    }
    collateral1 {
      totalAssets
      totalShares
      collateralDayData(first: 7) {
        id
        sharePrice
      }
    }
  }
}
    `;
export const GetMarketDetailsDocument = gql`
    query GetMarketDetails($market: ID!) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPool(id: $market) {
    ...PanopticPool
  }
}
    ${PanopticPoolFragmentDoc}`;
export const GetMarketDetailsFromBlockDocument = gql`
    query GetMarketDetailsFromBlock($market: ID!, $blockNumber: Int) {
  bundle(id: 1, block: {number: $blockNumber}) {
    ethPriceUSD
  }
  panopticPool(id: $market, block: {number: $blockNumber}) {
    ...PanopticPool
  }
}
    ${PanopticPoolFragmentDoc}`;
export const GetMarketMintEventsDocument = gql`
    query GetMarketMintEvents($market: String!, $weekAgo: BigInt) {
  events(
    where: {pool_: {panopticPool: $market}, timestamp_gt: $weekAgo, eventType: OptionMint}
    first: 1000
    orderBy: blockNumber
    orderDirection: desc
  ) {
    ... on OptionMint {
      ...OptionMint
    }
  }
}
    ${OptionMintFragmentDoc}`;
export const GetMarketsMintEventsDocument = gql`
    query GetMarketsMintEvents($weekAgo: BigInt) {
  events(
    where: {timestamp_gt: $weekAgo, eventType: OptionMint}
    first: 1000
    orderBy: blockNumber
    orderDirection: desc
  ) {
    ... on OptionMint {
      ...OptionMint
    }
  }
}
    ${OptionMintFragmentDoc}`;
export const GetTokenRelatedMarketsDocument = gql`
    query GetTokenRelatedMarkets($tokenId: String!) {
  panopticPools(where: {or: [{token0: $tokenId}, {token1: $tokenId}]}) {
    ...PanopticPool
  }
}
    ${PanopticPoolFragmentDoc}`;
export const GetMarketsBySelectedTokenAndFeeTierDocument = gql`
    query GetMarketsBySelectedTokenAndFeeTier($assetToken: String!, $quoteToken: String!, $feeTiers: [BigInt!] = [100, 500, 3000, 10000]) {
  pools(
    first: 20
    where: {or: [{token0: $assetToken, token1: $quoteToken, feeTier_in: $feeTiers}, {token0: $quoteToken, token1: $assetToken, feeTier_in: $feeTiers}]}
  ) {
    ...Pool
    poolDayData(orderBy: date, orderDirection: desc) {
      ...PoolDayData
    }
  }
}
    ${PoolFragmentDoc}
${PoolDayDataFragmentDoc}`;
export const GetMarketsDocument = gql`
    query GetMarkets {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPools {
    ...PanopticPool
  }
}
    ${PanopticPoolFragmentDoc}`;
export const GetVaultsWithDepositsFromAccountDocument = gql`
    query GetVaultsWithDepositsFromAccount($account: String!) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(
    where: {or: [{collateral0Shares_gt: 0, account: $account}, {collateral1Shares_gt: 0, account: $account}]}
  ) {
    ...PanopticPoolAccount
  }
}
    ${PanopticPoolAccountFragmentDoc}`;
export const GetVaultsInfoFromNonDepositedPoolsDocument = gql`
    query GetVaultsInfoFromNonDepositedPools($panopticPoolIds: [String!]) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(
    where: {panopticPool_not_in: $panopticPoolIds, collateral0Shares_gt: 0, collateral1Shares_gt: 0}
  ) {
    ...PanopticPoolAccount
  }
}
    ${PanopticPoolAccountFragmentDoc}`;
export const GetVaultsInfoFromAllPoolsDocument = gql`
    query GetVaultsInfoFromAllPools {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(where: {collateral0Shares_gt: 0, collateral1Shares_gt: 0}) {
    ...PanopticPoolAccount
  }
}
    ${PanopticPoolAccountFragmentDoc}`;
export const GetVaultsInfoFromPoolIdsDocument = gql`
    query GetVaultsInfoFromPoolIds($panopticPoolIds: [String!]) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(
    where: {panopticPool_in: $panopticPoolIds, collateral0Shares_gt: 0, collateral1Shares_gt: 0}
  ) {
    ...PanopticPoolAccount
  }
}
    ${PanopticPoolAccountFragmentDoc}`;
export const GetAllPoolsDocument = gql`
    query GetAllPools($panopticPoolIds: [String!]) {
  bundle(id: 1) {
    ethPriceUSD
  }
  panopticPoolAccounts(where: {panopticPool_in: $panopticPoolIds}) {
    ...PanopticPoolAccount
  }
}
    ${PanopticPoolAccountFragmentDoc}`;
export const GetEthPriceUsdDocument = gql`
    query GetEthPriceUSD {
  bundle(id: 1) {
    ethPriceUSD
  }
}
    `;
export const GetPpaAccountCollateralInfoDocument = gql`
    query GetPpaAccountCollateralInfo($account: String!) {
  panopticPoolAccounts(
    where: {account: $account, collateral0Shares_gt: 0, collateral1Shares_gt: 0}
  ) {
    collateral0Assets
    collateral0Shares
    collateral1Assets
    collateral1Shares
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetCommissionsAtBlock(variables: Types.GetCommissionsAtBlockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCommissionsAtBlockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCommissionsAtBlockQuery>(GetCommissionsAtBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCommissionsAtBlock', 'query', variables);
    },
    GetCommissions(variables: Types.GetCommissionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCommissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCommissionsQuery>(GetCommissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCommissions', 'query', variables);
    },
    GetSamplePoolsWithCollateralDayData(variables?: Types.GetSamplePoolsWithCollateralDayDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetSamplePoolsWithCollateralDayDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetSamplePoolsWithCollateralDayDataQuery>(GetSamplePoolsWithCollateralDayDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSamplePoolsWithCollateralDayData', 'query', variables);
    },
    GetMarketDetails(variables: Types.GetMarketDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketDetailsQuery>(GetMarketDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarketDetails', 'query', variables);
    },
    GetMarketDetailsFromBlock(variables: Types.GetMarketDetailsFromBlockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketDetailsFromBlockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketDetailsFromBlockQuery>(GetMarketDetailsFromBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarketDetailsFromBlock', 'query', variables);
    },
    GetMarketMintEvents(variables: Types.GetMarketMintEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketMintEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketMintEventsQuery>(GetMarketMintEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarketMintEvents', 'query', variables);
    },
    GetMarketsMintEvents(variables?: Types.GetMarketsMintEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketsMintEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketsMintEventsQuery>(GetMarketsMintEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarketsMintEvents', 'query', variables);
    },
    GetTokenRelatedMarkets(variables: Types.GetTokenRelatedMarketsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetTokenRelatedMarketsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetTokenRelatedMarketsQuery>(GetTokenRelatedMarketsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTokenRelatedMarkets', 'query', variables);
    },
    GetMarketsBySelectedTokenAndFeeTier(variables: Types.GetMarketsBySelectedTokenAndFeeTierQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketsBySelectedTokenAndFeeTierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketsBySelectedTokenAndFeeTierQuery>(GetMarketsBySelectedTokenAndFeeTierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarketsBySelectedTokenAndFeeTier', 'query', variables);
    },
    GetMarkets(variables?: Types.GetMarketsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetMarketsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetMarketsQuery>(GetMarketsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMarkets', 'query', variables);
    },
    GetVaultsWithDepositsFromAccount(variables: Types.GetVaultsWithDepositsFromAccountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetVaultsWithDepositsFromAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetVaultsWithDepositsFromAccountQuery>(GetVaultsWithDepositsFromAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetVaultsWithDepositsFromAccount', 'query', variables);
    },
    GetVaultsInfoFromNonDepositedPools(variables?: Types.GetVaultsInfoFromNonDepositedPoolsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetVaultsInfoFromNonDepositedPoolsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetVaultsInfoFromNonDepositedPoolsQuery>(GetVaultsInfoFromNonDepositedPoolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetVaultsInfoFromNonDepositedPools', 'query', variables);
    },
    GetVaultsInfoFromAllPools(variables?: Types.GetVaultsInfoFromAllPoolsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetVaultsInfoFromAllPoolsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetVaultsInfoFromAllPoolsQuery>(GetVaultsInfoFromAllPoolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetVaultsInfoFromAllPools', 'query', variables);
    },
    GetVaultsInfoFromPoolIds(variables?: Types.GetVaultsInfoFromPoolIdsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetVaultsInfoFromPoolIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetVaultsInfoFromPoolIdsQuery>(GetVaultsInfoFromPoolIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetVaultsInfoFromPoolIds', 'query', variables);
    },
    GetAllPools(variables?: Types.GetAllPoolsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetAllPoolsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetAllPoolsQuery>(GetAllPoolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllPools', 'query', variables);
    },
    GetEthPriceUSD(variables?: Types.GetEthPriceUsdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetEthPriceUsdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetEthPriceUsdQuery>(GetEthPriceUsdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEthPriceUSD', 'query', variables);
    },
    GetPpaAccountCollateralInfo(variables: Types.GetPpaAccountCollateralInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetPpaAccountCollateralInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetPpaAccountCollateralInfoQuery>(GetPpaAccountCollateralInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPpaAccountCollateralInfo', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;