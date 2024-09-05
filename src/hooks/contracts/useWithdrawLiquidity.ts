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

  const simulateWithdraw = useSimulateContract({
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

  const writeWithdraw = useWriteContract()

  const withdrawWait = useWaitForTransactionReceipt({
    hash: writeWithdraw.data,
    query: {
      meta: {
        successMessage: `Successfully withdraw ${token?.tokenSymbol}`,
        callback: callback ? callback : undefined,
      },
    },
  })

  return {
    write: () =>
      simulateWithdraw.data?.request != null
        ? writeWithdraw.writeContract(simulateWithdraw.data.request)
        : null,
    isReady:
      simulateWithdraw.isLoading ||
      simulateWithdraw.error != null ||
      writeWithdraw.isPending ||
      withdrawWait.isLoading,
    wait: withdrawWait,
    actionLabel: `Withdraw ${token?.tokenSymbol}`,
    errors: [simulateWithdraw.error, writeWithdraw.error].filter((error) => error !== null),
  }
}
