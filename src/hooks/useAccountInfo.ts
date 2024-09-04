import { useMemo } from 'react'
import { Address } from 'viem'
import { PanopticPoolAccountFragment } from '~/graphql/types.generated'

export const useAccountCollateralShares = (panopticPoolAccounts: PanopticPoolAccountFragment[]) => {
  const accountCollateralSharesMap = useMemo(() => {
    if (!panopticPoolAccounts.length) return {}

    return panopticPoolAccounts.reduce((acc: Record<Address, bigint>, ppa) => {
      const collateral0Address = ppa.panopticPool.collateral0.id as Address
      const collateral1Address = ppa.panopticPool.collateral1.id as Address

      if (!Object.prototype.hasOwnProperty.call(acc, collateral0Address)) {
        acc[collateral0Address] = BigInt(ppa.collateral0Shares)
      }

      if (!Object.prototype.hasOwnProperty.call(acc, collateral1Address)) {
        acc[collateral1Address] = BigInt(ppa.collateral1Shares)
      }
      return acc
    }, {})
  }, [panopticPoolAccounts])
  return accountCollateralSharesMap
}
