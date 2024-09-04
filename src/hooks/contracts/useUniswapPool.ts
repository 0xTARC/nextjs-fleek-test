import { Address, zeroAddress } from 'viem'
import { Config, useChainId, useReadContract } from 'wagmi'
import { abi as uniswapV3FactoryAbi } from '~/abis/UniswapV3Factory'
import { abi as UniswapV3PoolAbi } from '~/abis/UniswapV3Pool'
import { contracts } from '~/utils/constants'

export type Slot0 = [
  sqrtPriceX96: bigint,
  tick: number,
  observationIndex: number,
  observationCardinality: number,
  observationCardinalityNext: number,
  feeProtocol: number,
  unlocked: boolean,
]

export const useUniswapPoolV2 = (
  token0: Address | undefined,
  token1: Address | undefined,
  feeTier: number,
  disabled?: boolean,
) => {
  const chainId = useChainId()

  const shouldTryGetPool =
    !disabled &&
    token0 != null &&
    token0 != zeroAddress &&
    token1 != null &&
    token1 != zeroAddress &&
    !isNaN(feeTier)

  const {
    data: uniswapPoolAddress,
    isLoading: isGetPoolLoading,
    refetch: refetchUniswapPool,
  } = useReadContract({
    address: contracts[chainId].UniswapV3Factory,
    abi: uniswapV3FactoryAbi,
    functionName: 'getPool',
    query: {
      enabled: shouldTryGetPool,
    },
    args: [token0 ?? zeroAddress, token1 ?? zeroAddress, feeTier],
  })

  const {
    data: slot0,
    isLoading: isSlot0Loading,
    refetch: refetchSlot0,
  } = useReadContract<typeof UniswapV3PoolAbi, 'slot0', [], Config, Slot0>({
    address: uniswapPoolAddress,
    abi: UniswapV3PoolAbi,
    functionName: 'slot0',
    query: {
      enabled: shouldTryGetPool && uniswapPoolAddress != null && uniswapPoolAddress !== zeroAddress,
    },
  })
  // slot0 layout:
  /*  
    struct Slot0 {
      // the current price
      uint160 sqrtPriceX96;
      // the current tick
      int24 tick;
      // the most-recently updated index of the observations array
      uint16 observationIndex;
      // the current maximum number of observations that are being stored
      uint16 observationCardinality;
      // the next maximum number of observations to store, triggered in observations.write
      uint16 observationCardinalityNext;
      // the current protocol fee as a percentage of the swap fee taken on withdrawal
      // represented as an integer denominator (1/x)%
      uint8 feeProtocol;
      // whether the pool is locked
      bool unlocked;
    }
    */
  const refetch = () => {
    refetchUniswapPool()
    refetchSlot0()
  }
  return { uniswapPoolAddress, isGetPoolLoading, slot0, isSlot0Loading, refetch }
}
