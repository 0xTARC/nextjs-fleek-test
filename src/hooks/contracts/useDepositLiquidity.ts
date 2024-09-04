import { Address, getAddress, zeroAddress } from 'viem'

import { abi as CollateralTrackerAbi } from '../../abis/CollateralTracker'
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { TokenApyInfo } from '~/utils/userAccount'
import { useTokenAllowance } from './useTokenAllowance'
import { useTokenApprove } from './useTokenApprove'
import { useMemo } from 'react'

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
    write: writeContractApprove,
    isLoading: isPendingApprove,
    data: approveData,
    wait: approveWait,
  } = useTokenApprove(token, collateralAddress, needApprove, () => {
    tokenAllowance.refetch()
  })

  const { data: depositData } = useSimulateContract({
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

  const {
    writeContract: writeContractDeposit,
    isPending: isPendingDeposit,
    data: depositHash,
  } = useWriteContract()

  const depositWait = useWaitForTransactionReceipt({
    hash: depositHash,
    query: {
      meta: {
        successMessage: `Successfully deposit ${token?.tokenSymbol}`,
        callback: callback ? callback : undefined,
      },
    },
  })

  return {
    write: needApprove ? writeContractApprove : writeContractDeposit,
    isLoading:
      isPendingDeposit || isPendingApprove || approveWait.isLoading || depositWait.isLoading,
    data: needApprove ? approveData : depositData,
    wait: needApprove ? approveWait : depositWait,
    actionLabel: needApprove ? `Approve ${token?.tokenSymbol}` : `Deposit ${token?.tokenSymbol}`,
  }
}
