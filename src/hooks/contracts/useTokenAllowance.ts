import { Address, erc20Abi, getAddress, zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useTokenAllowance = (token: Address, contractAddress: Address) => {
  const { address, chainId } = useAccount()

  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address ?? zeroAddress, contractAddress],
    chainId,
    query: {
      enabled:
        getAddress(token) !== zeroAddress &&
        getAddress(address ?? zeroAddress) !== zeroAddress &&
        getAddress(contractAddress) !== zeroAddress,
    },
  })
}
