import { toast } from 'react-toastify'
import type { Address, Hex, TransactionExecutionErrorType } from 'viem'
import { getAddress, zeroAddress } from 'viem'
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { abi as PanopticFactoryAbi } from '~/abis/PanopticFactory'
import { useERC20Approve } from '~/hooks/contracts/useERC20Approve'
import { contracts } from '~/utils/constants'
import { addGasMarginToPrepareContractWriteConfig } from '~/utils/ethereum'
import { useTokenAllowance } from '~/hooks/contracts/useTokenAllowance'

export const useDeployNewPanopticPool = (
  args: {
    token0: Address
    token0Amount: bigint
    token1: Address
    token1Amount: bigint
    fee: number
    salt: Hex
    disabled: boolean
  },
  onSuccess?: () => void,
) => {
  const chainId = useChainId()

  // Approvals
  const allowanceToken0 = useTokenAllowance(args.token0, contracts[chainId].PanopticFactory)

  const approveToken0 = useERC20Approve(
    args.token0,
    args.token0Amount,
    contracts[chainId].PanopticFactory,
    {
      onSuccess: () => {
        allowanceToken0.refetch()
      },
    },
    args.disabled,
  )

  const token0NeedsApproval =
    allowanceToken0.data === undefined || allowanceToken0.data < args.token0Amount

  const allowanceToken1 = useTokenAllowance(args.token1, contracts[chainId].PanopticFactory)

  const token1NeedsApproval =
    allowanceToken1.data === undefined || allowanceToken1.data < args.token1Amount

  const approveToken1 = useERC20Approve(
    args.token1,
    args.token1Amount,
    contracts[chainId].PanopticFactory,
    {
      onSuccess: () => {
        allowanceToken1.refetch()
      },
    },
    args.disabled,
  )

  const simulateDeployEnabled =
    !args.disabled &&
    !allowanceToken0.isFetching &&
    !token0NeedsApproval &&
    !allowanceToken1.isFetching &&
    !token1NeedsApproval &&
    args.token0 !== getAddress(zeroAddress) &&
    args.token1 !== getAddress(zeroAddress) &&
    !isNaN(args.fee)

  // Deploy New Pool
  const simulateDeploy = useSimulateContract({
    address: contracts[chainId].PanopticFactory,
    abi: PanopticFactoryAbi,
    functionName: 'deployNewPool',
    args: [
      args.token0,
      args.token1,
      args.fee,
      BigInt(args.salt),
      args.token0Amount,
      args.token1Amount,
    ],
    query: {
      enabled: simulateDeployEnabled,
    },
  })

  if (simulateDeploy.error) {
    const error = simulateDeploy.error as unknown as TransactionExecutionErrorType
    console.error('Simulate deploy error:', error)
  }

  const configWithGasMargin: (typeof simulateDeploy)['data'] =
    addGasMarginToPrepareContractWriteConfig(simulateDeploy.data)

  const writeDeploy = useWriteContract({
    mutation: {
      onError: (e) => {
        console.error(e)
      },
    },
  })

  const writeContractAction = {
    write: () =>
      configWithGasMargin?.request != null
        ? writeDeploy.writeContract(configWithGasMargin.request)
        : null,
  }

  const waitDeploy = useWaitForTransactionReceipt({
    hash: writeDeploy.data,
    query: {
      meta: {
        callback: onSuccess
          ? onSuccess
          : () => {
              toast.success('Market created successfully!', undefined)
            },
      },
    },
  })

  const deployPanopticPoolAction = {
    ...writeContractAction,
    ...waitDeploy,
  }

  let actionLabel = 'Create Market'
  if (token0NeedsApproval && !approveToken0.isLoading) {
    actionLabel = 'Approve Token 0'
  } else if (token0NeedsApproval && approveToken0.isLoading) {
    actionLabel = 'Approving Token 0...'
  } else if (token1NeedsApproval && !approveToken1.isLoading) {
    actionLabel = 'Approve Token 1'
  } else if (token1NeedsApproval && approveToken1.isLoading) {
    actionLabel = 'Approving Token 1...'
  } else if (waitDeploy.isLoading) {
    actionLabel = 'Creating Market...'
  }

  return {
    actionLabel: actionLabel,
    action: token0NeedsApproval
      ? approveToken0
      : token1NeedsApproval
        ? approveToken1
        : deployPanopticPoolAction,
    approveToken0,
    approveToken1,
    simulateDeploy,
    writeDeploy,
    waitDeploy,
  }
}
