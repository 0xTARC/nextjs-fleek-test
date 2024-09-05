import { Address, getAddress, zeroAddress } from 'viem'

import { useMemo } from 'react'
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { TokenApyInfo } from '~/utils/userAccount'
import { abi as CollateralTrackerAbi } from '../../abis/CollateralTracker'
import { useTokenAllowance } from './useTokenAllowance'
import { useTokenApprove } from './useTokenApprove'

export const useDepositLiquidity = (
  collateralAddress: Address,
  token: TokenApyInfo | undefined,
  depositAmount: bigint,
  callback?: () => void | undefined,
) => {
  const { address } = useAccount()
  const tokenAddress = getAddress(token ? token.tokenAddress : zeroAddress)
  const tokenAllowance = useTokenAllowance(tokenAddress, collateralAddress)
  const needApprove: boolean = useMemo(() => {
    if (
      tokenAllowance.data === undefined ||
      tokenAllowance.data === BigInt(0) ||
      tokenAllowance.data < depositAmount
    ) {
      return true
    }
    return false
  }, [tokenAllowance, depositAmount])

  const {
    write: writeApprove,
    simulate: simulateApprove,
    wait: waitApprove,
  } = useTokenApprove(token, collateralAddress, needApprove, () => {
    tokenAllowance.refetch()
  })

  const simulateDeposit = useSimulateContract({
    address: collateralAddress,
    abi: CollateralTrackerAbi,
    functionName: 'deposit',
    args: [depositAmount, address ?? getAddress(zeroAddress)],
    query: {
      enabled:
        tokenAllowance.isSuccess &&
        !needApprove &&
        Number(depositAmount) > 0 &&
        address !== getAddress(zeroAddress) &&
        collateralAddress !== getAddress(zeroAddress),
    },
  })

  const writeDeposit = useWriteContract()

  const depositWait = useWaitForTransactionReceipt({
    hash: writeDeposit.data,
    query: {
      meta: {
        successMessage: `Successfully deposit ${token?.tokenSymbol}`,
        callback: callback ? callback : undefined,
      },
    },
  })

  return {
    write: needApprove
      ? () =>
          simulateApprove.data?.request != null
            ? writeApprove.writeContract(simulateApprove.data?.request)
            : null
      : () =>
          simulateDeposit.data?.request != null
            ? writeDeposit.writeContract(simulateDeposit.data?.request)
            : null,
    isReady:
      simulateApprove.isLoading ||
      writeApprove.isPending ||
      simulateApprove.error != null ||
      waitApprove.isLoading ||
      simulateDeposit.isLoading ||
      simulateDeposit.error != null ||
      writeDeposit.isPending ||
      depositWait.isLoading,
    wait: needApprove ? waitApprove : depositWait,
    actionLabel: needApprove ? `Approve ${token?.tokenSymbol}` : `Deposit ${token?.tokenSymbol}`,
    errors: [
      simulateApprove.error,
      writeApprove.error,
      simulateDeposit.error,
      writeDeposit.error,
    ].filter((error) => error !== null),
  }
}
