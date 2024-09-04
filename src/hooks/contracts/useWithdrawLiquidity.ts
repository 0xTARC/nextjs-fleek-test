import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { abi as CollateralTrackerAbi } from '../../abis/CollateralTracker'
import { Address, getAddress, zeroAddress } from 'viem'
import { TokenApyInfo } from '~/utils/userAccount'

export const useWithdrawLiquidity = (
  collateralAddress: Address,
  token: TokenApyInfo | undefined,
  withdrawAssetAmount: bigint,
  callback?: () => void | undefined,
) => {
  const { address } = useAccount()

  const { data: withdrawData, isError } = useSimulateContract({
    address: collateralAddress,
    abi: CollateralTrackerAbi,
    functionName: 'withdraw',
    args: [
      withdrawAssetAmount,
      address ?? getAddress(zeroAddress),
      address ?? getAddress(zeroAddress),
    ],
    query: {
      enabled:
        withdrawAssetAmount > BigInt(0) &&
        collateralAddress !== getAddress(zeroAddress) &&
        address !== undefined &&
        getAddress(address) !== getAddress(zeroAddress),
    },
  })

  const { writeContract: writeContractWithdraw, isPending, data: withdrawHash } = useWriteContract()

  const withdrawWait = useWaitForTransactionReceipt({
    hash: withdrawHash,
    query: {
      meta: {
        successMessage: `Successfully withdraw ${token?.tokenSymbol}`,
        callback: callback ? callback : undefined,
      },
    },
  })

  return {
    write: writeContractWithdraw,
    data: withdrawData,
    wait: withdrawWait,
    actionLabel: `Withdraw ${token?.tokenSymbol}`,
    isLoading: isPending || withdrawWait.isLoading,
    isError: isError,
  }
}
