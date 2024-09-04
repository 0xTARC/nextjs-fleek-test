import type { FC } from 'react'
import { GoLinkExternal } from 'react-icons/go'
import { arbitrum, avalanche, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'
import { Button } from './button'
import { useChainId } from 'wagmi'

interface TxExplorerButtonProps {
  txHash: string
  variant?: 'button' | 'hyperText'
}

export const TxExplorerButton: FC<TxExplorerButtonProps> = ({ txHash, variant = 'button' }) => {
  const chainId = useChainId()
  const chainToExplorer: Record<number, string> = {
    [mainnet.id]: mainnet.blockExplorers.default.url,
    [polygon.id]: polygon.blockExplorers.default.url,
    [arbitrum.id]: arbitrum.blockExplorers.default.url,
    [sepolia.id]: sepolia.blockExplorers.default.url,
    [base.id]: base.blockExplorers.default.url,
    [avalanche.id]: avalanche.blockExplorers.default.url,
    [optimism.id]: optimism.blockExplorers.default.url,
  }

  const chainToExplorerName: Record<number, string> = {
    [mainnet.id]: mainnet.blockExplorers.default.name,
    [polygon.id]: polygon.blockExplorers.default.name,
    [arbitrum.id]: arbitrum.blockExplorers.default.name,
    [sepolia.id]: sepolia.blockExplorers.default.name,
    [base.id]: base.blockExplorers.default.name,
    [avalanche.id]: avalanche.blockExplorers.default.name,
    [optimism.id]: optimism.blockExplorers.default.name,
  }

  if (variant === 'button') {
    return (
      <Button
        variant="flat"
        onClick={() => typeof window !== 'undefined' && window.open(`${chainToExplorer[chainId]}/tx/${txHash}`, '_blank')}>
        <GoLinkExternal />
      </Button>
    )
  } else if (variant === 'hyperText') {
    return (
      <Button
        variant="flat"
        onClick={() => typeof window !== 'undefined' && window.open(`${chainToExplorer[chainId]}/tx/${txHash}`, '_blank')}
        className="flex gap-1">
        View on {chainToExplorerName[chainId]}
        <GoLinkExternal />
      </Button>
    )
  }
}
