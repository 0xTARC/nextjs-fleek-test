import { TransactionExecutionErrorType, zeroAddress, type Address } from 'viem'
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { abi as nonFungiblePositionManager } from '~/abis/NonFungiblePositionManager'
import { contracts } from '~/utils/constants'
import { addGasMarginToPrepareContractWriteConfig } from '~/utils/ethereum'

export const useCreateAndInitializeUniswapPool = (
  args: {
    token0: Address
    token1: Address
    fee: number
    initSqrtPriceX96Str: string
    disabled: boolean
    onInitializeSuccess?: () => void
  },
  onInitializeConfirmed?: () => void,
) => {
  const initSqrtPriceX96ToBigInt = BigInt(
    args.initSqrtPriceX96Str === '' ? 0 : args.initSqrtPriceX96Str,
  )

  const chainId = useChainId()

  // Deploy New Pool
  const simulate = useSimulateContract({
    address: contracts[chainId].NonFungiblePositionManager,
    abi: nonFungiblePositionManager,
    functionName: 'createAndInitializePoolIfNecessary',
    args: [args.token0, args.token1, args.fee, initSqrtPriceX96ToBigInt],
    query: {
      enabled:
        !args.disabled &&
        args.token0 != zeroAddress &&
        args.token1 != zeroAddress &&
        !isNaN(args.fee) &&
        args.initSqrtPriceX96Str !== '',
    },
  })

  if (simulate.error) {
    const error = simulate.error as unknown as TransactionExecutionErrorType
    console.error('createAndInitializePoolIfNecessary error: ', error)
  }

  const configWithGasMargin: (typeof simulate)['data'] = addGasMarginToPrepareContractWriteConfig(
    simulate.data,
  )

  const write = useWriteContract({
    mutation: {
      onError: (e) => {
        const error = e as TransactionExecutionErrorType
        console.error(error)
      },
      onSuccess: () => {
        args?.onInitializeSuccess?.()
      },
    },
  })

  const wait = useWaitForTransactionReceipt({
    hash: write.data,
    query: {
      meta: {
        callback: onInitializeConfirmed,
      },
    },
  })

  const createAndInitializePoolAction = {
    write: () =>
      configWithGasMargin?.request != null
        ? write.writeContract(configWithGasMargin.request)
        : null,
    ...wait,
  }

  let actionLabel = 'Initialize Uniswap Pool'
  if (wait.isLoading) {
    actionLabel = 'Initializing Uniswap Pool...'
  }

  return {
    actionLabel: actionLabel,
    action: createAndInitializePoolAction,
    simulate,
    write,
    wait,
  }
}
