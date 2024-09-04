import { Address, erc20Abi, getAddress, maxUint256, zeroAddress } from 'viem'
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { TokenApyInfo } from '~/utils/userAccount'

export const useTokenApprove = (
  token: TokenApyInfo | undefined,
  collateralAddress: Address,
  tokenNeedsApproval: boolean,
  callback?: () => void | undefined,
) => {
  const { chainId } = useAccount()
  const tokenAddress = getAddress(token ? token.tokenAddress : zeroAddress)
  const { data: approveData } = useSimulateContract({
    address: tokenAddress,
    chainId: chainId,
    abi: erc20Abi,
    functionName: 'approve',
    args: [collateralAddress, maxUint256],
    query: {
      enabled: tokenNeedsApproval && tokenAddress !== zeroAddress,
    },
  })

  const {
    writeContract: writeContractApprove,
    isPending: isPendingApprove,
    data: approveHash,
  } = useWriteContract()

  const approveWait = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      meta: {
        successMessage: `Successfully approved ${token?.tokenSymbol}`,
        callback: callback ? callback : undefined,
      },
    },
  })

  return {
    write: writeContractApprove,
    isLoading: isPendingApprove,
    data: approveData,
    wait: approveWait,
  }
}
