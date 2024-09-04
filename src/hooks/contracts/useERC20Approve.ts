import type { Address, TransactionExecutionErrorType } from 'viem'
import { getAddress, zeroAddress } from 'viem'
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { erc20ABI } from '~/abis/ERC20Abi'

export const useERC20Approve = (
  token: Address,
  amount: bigint,
  contractAddress: Address,
  onSuccess?: { onSuccess: () => void },
  disabled?: boolean,
) => {
  const write = useWriteContract()

  const simulate = useSimulateContract({
    address: token,
    abi: erc20ABI,
    functionName: 'approve',
    query: {
      enabled:
        !disabled &&
        !write.isPending &&
        token !== getAddress(zeroAddress) &&
        contractAddress !== getAddress(zeroAddress),
    },
    args: [contractAddress, amount],
  })

  if (simulate.error != null) {
    const error = simulate.error as unknown as TransactionExecutionErrorType
    console.error(
      `Approve gas estimation error. Token: ${token} | Contract to approve: ${contractAddress} | Error: ${error}`,
    )
  }

  const wait = useWaitForTransactionReceipt({
    hash: write.data,
    query: {
      meta: {
        callback: onSuccess?.onSuccess,
      },
    },
  })

  return {
    write: () =>
      simulate.data?.request != null ? write.writeContract(simulate.data?.request) : null,
    simulate,
    ...wait,
  }
}
