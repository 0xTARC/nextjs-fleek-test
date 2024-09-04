import { zeroAddress, type Address } from 'viem'
import { useChainId, useReadContract } from 'wagmi'

import { abi as panopticFactoryAbi } from '~/abis/PanopticFactory'
import { contracts } from '~/utils/constants'

export const usePanopticPoolV2 = (uniswapPoolAddress: Address, disabled: boolean) => {
  const chainId = useChainId()

  const { data: panopticPoolAddress, isLoading: isGetPanopticPoolLoading } = useReadContract({
    address: contracts[chainId].PanopticFactory,
    abi: panopticFactoryAbi,
    functionName: 'getPanopticPool',
    query: {
      enabled: !disabled && uniswapPoolAddress !== zeroAddress,
    },
    args: [uniswapPoolAddress],
  })

  return { panopticPoolAddress, isGetPanopticPoolLoading }
}
