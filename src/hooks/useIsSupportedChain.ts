import { useAccount, useChains } from 'wagmi'

export const useIsSupportedChain = () => {
  const { chainId } = useAccount()
  const chains = useChains().map((chain) => chain.id)
  return chainId === undefined ? false : chains.includes(chainId)
}
