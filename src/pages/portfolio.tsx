import { Container } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Address, zeroAddress } from 'viem'
import { useAccount, useChainId } from 'wagmi'
import { PortfolioTable } from '~/components/portfolioTable'
import { chainToGraphQlSdk } from '~/subgraph'
import * as Separator from '@radix-ui/react-separator'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { formatPpaAccountsForPortfolioInfo } from '~/utils/portfolio'
import { PanopticPoolAccount } from '~/graphql/types.generated'
import { pageTitle, subSectionTitle } from '~/components/component.styles'

export const getVaultsWithDepositsFromAccount = async (chainId: number, address: Address) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const vaultsWithDeposits = await sdk.GetVaultsWithDepositsFromAccount({
    account: address.toLowerCase(),
  })

  return vaultsWithDeposits
}

export default function Portfolio() {
  const chainId = useChainId()
  const { address } = useAccount()
  const { isMobile } = useScreenDetector()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vaultsWithDepositsFromAccount', chainId, address],
    queryFn: () => getVaultsWithDepositsFromAccount(chainId, address ?? zeroAddress),
    enabled: address !== undefined,
  })

  const ethToUSD = data?.bundle?.ethPriceUSD

  const portfolioInfo =
    data && data.panopticPoolAccounts.length
      ? formatPpaAccountsForPortfolioInfo(
          data.panopticPoolAccounts as PanopticPoolAccount[],
          Number(ethToUSD),
        ).filter((ppa) => {
          return ppa.collateral0Shares > 0 || ppa.collateral1Shares > 0
        })
      : []

  return (
    <Container size="4">
      <div className="flex flex-col gap-y-10">
        <h2 className={pageTitle}>Portfolio</h2>
        <div>
          <p className={subSectionTitle}>Deposited Tokens</p>
          {isMobile ? (
            <Separator.Root
              className="bg-gray-100 data-[orientation=horizontal]:h-px mt-3"
              decorative
              orientation="horizontal"
            />
          ) : null}
          <PortfolioTable portfolioInfo={portfolioInfo} isLoading={isLoading} />
        </div>

        {/* Link to market detail page */}
        {/* Don't show for now */}
        {/* <p> Earnings </p> */}
      </div>
    </Container>
  )
}
