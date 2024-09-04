import { Container, Flex, SegmentedControl } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { Deposit } from '~/components/deposit'
import { Withdraw } from '~/components/withdraw'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { chainToGraphQlSdk } from '~/subgraph'

export function clientLoader() {
  const data = { success: true }
  return data
}

export const getEthPriceUSD = async (chainId: number) => {
  const sdk = chainToGraphQlSdk?.[chainId]
  const ethPriceUSD = await sdk.GetEthPriceUSD()
  return ethPriceUSD
}

export default function Earn() {
return <div>earn</div>
}
// export default function Earn() {
//   const router = useRouter()
//   const type = (router.query.type as string) ?? null
//   const tokenId = (router.query.tokenId as string) ?? null
//   const marketId = (router.query.marketId as string) ?? null
//   const [isDeposit, setIsDeposit] = useState<boolean>(
//     type === null ? true : type === 'deposit' ? true : false,
//   )
//   const [isChangeEarnType, setIsChangeEarnType] = useState<boolean>(false)
//   const { address, isConnected } = useAccount()
//   const chainId = useChainId()
//   const { isMobile, isTablet, isDesktop } = useScreenDetector()

//   const ethPriceUSD = useQuery({
//     queryKey: ['getEthPriceUSD', chainId],
//     queryFn: () => getEthPriceUSD(chainId),
//   })

//   useEffect(() => {
//     if (isChangeEarnType) {
//       const url = `?type=${isDeposit ? 'deposit' : 'withdraw'}`
//       router.push(url)
//       setIsChangeEarnType(false)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isChangeEarnType, isDeposit])

//   return (
//     <Container size="4">
//       <Flex direction="column" gap="8">
//         <div>
//           <h1 className="text-center font-semibold text-3xl mb-3">Earn</h1>
//           <Flex align="center" justify="center">
//             <SegmentedControl.Root defaultValue={isDeposit ? 'deposit' : 'withdraw'} radius="small">
//               <SegmentedControl.Item
//                 value="deposit"
//                 onClick={() => {
//                   setIsDeposit(true)
//                   setIsChangeEarnType(true)
//                 }}>
//                 Deposit
//               </SegmentedControl.Item>
//               <SegmentedControl.Item
//                 value="withdraw"
//                 onClick={() => {
//                   setIsDeposit(false)
//                   setIsChangeEarnType(true)
//                 }}>
//                 Withdraw
//               </SegmentedControl.Item>
//             </SegmentedControl.Root>
//           </Flex>
//         </div>
//         <div className="flex flex-row items-center justify-center">
//           <div className={clsx({ 'w-1/2': isDesktop }, { 'w-full': isMobile || isTablet })}>
//             {isDeposit ? (
//               <Deposit
//                 address={address}
//                 isConnected={isConnected}
//                 chainId={chainId}
//                 paramTokenId={tokenId}
//                 paramMarketId={marketId}
//                 ethPriceUSD={ethPriceUSD}
//               />
//             ) : (
//               <Withdraw
//                 address={address}
//                 isConnected={isConnected}
//                 chainId={chainId}
//                 paramTokenId={tokenId}
//                 paramMarketId={marketId}
//                 ethPriceUSD={ethPriceUSD}
//               />
//             )}
//           </div>
//         </div>
//       </Flex>
//     </Container>
//   )
// }
