import { GraphQLClient } from 'graphql-request'
import { avalanche, base, optimism, polygon, sepolia } from 'wagmi/chains'
import { getSdk } from '~/graphql/sdk.generated'

/*
 __  __       _                   _                           _         
|  \/  | __ _(_)_ __    ___ _   _| |__   __ _ _ __ __ _ _ __ | |__
| |\/| |/ _` | | '_ \  / __| | | | '_ \ / _` | '__/ _` | '_ \| '_ \
| |  | | (_| | | | | | \__ \ |_| | |_) | (_| | | | (_| | |_) | | | \
|_|  |_|\__,_|_|_| |_| |___/\__,_|_.__/ \__, |_|  \__,_| .__/|_| |_|
                                        |___/          |_|              

// Must have an account-like entity which calculates rolling commissions
// between ERC-4626 transfer events (see: commissionsSinceLastTransfer0).
*/
export const chainToGraphQlAPI: Record<number, string> = {
  // // mainnet
  // 1: 'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-sepolia/prod/gn',
  // // polygon
  // 137: 'https://api.thegraph.com/subgraphs/name/0xtarc/panoptic-subgraph-polygon-graf',
  // // arbitrum
  // 42161:
  //   'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-sepolia/prod/gn',
  // // base
  // 8453: 'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-base/beta4-prod/gn',
  // sepolia
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-sepolia/beta7-prod/gn',
  // avalanche
  // 43114:
  //   'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-avalanche/beta4-prod/gn',
  // // op
  // 10: 'https://api.thegraph.com/subgraphs/name/0xtarc/panoptic-subgraph-optimism-dev',
}

const graphQLClients: Record<number, GraphQLClient> = Object.keys(chainToGraphQlAPI).reduce(
  (clients: Record<number, GraphQLClient>, key) => {
    clients[Number(key)] = new GraphQLClient(chainToGraphQlAPI[Number(key)])
    return clients
  },
  {},
)

export const chainToGraphQlSdk: Record<number, ReturnType<typeof getSdk>> = Object.keys(
  graphQLClients,
).reduce((acc: Record<number, ReturnType<typeof getSdk>>, key) => {
  acc[Number(key)] = getSdk(graphQLClients[Number(key)])
  return acc
}, {})

/*
 ____  _            _                    _                           _         
| __ )| | ___   ___| | _____   ___ _   _| |__   __ _ _ __ __ _ _ __ | |__  ___ 
|  _ \| |/ _ \ / __| |/ / __| / __| | | | '_ \ / _` | '__/ _` | '_ \| '_ \/ __|
| |_) | | (_) | (__|   <\__ \ \__ \ |_| | |_) | (_| | | | (_| | |_) | | | \__ \
|____/|_|\___/ \___|_|\_\___/ |___/\__,_|_.__/ \__, |_|  \__,_| .__/|_| |_|___/
                                               |___/          |_|              

For assembling time series data from a series of subgraph queries.
*/
export const chainToBlocksGraphQlAPI: Record<number, string> = {
  [base.id]: 'https://api.studio.thegraph.com/query/54723/base-blocks/version/latest',
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/sepolia-blocks/1.0.0/gn',
  [avalanche.id]: 'https://api.thegraph.com/subgraphs/name/dasconnor/avalanche-blocks',
  [optimism.id]: 'https://api.thegraph.com/subgraphs/name/lyra-finance/optimism-mainnet-blocks',
  [polygon.id]: 'https://api.thegraph.com/subgraphs/name/matthewlilley/polygon-blocks',
}
