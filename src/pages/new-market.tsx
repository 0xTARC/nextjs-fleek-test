// import { Container } from '@radix-ui/themes'
// import { Link, useNavigate } from '@remix-run/react'
// import { toast } from 'react-toastify'
// import { getAddress, zeroAddress } from 'viem'
// import { useChainId } from 'wagmi'
// import { Button } from '~/components/button'
// import { CreateAndInitializeUniPoolForm } from '~/components/create-and-initialize-uni-pool-form'
// import { CreatePanopticPoolForm } from '~/components/create-panoptic-pool-form'
// import { CurrencySelect } from '~/components/currency-select'
// import { FeeTierSelect } from '~/components/fee-tier-select'
// import { usePanopticPoolV2 } from '~/hooks/contracts/usePanopticPool'
// import { useUniswapPoolV2 } from '~/hooks/contracts/useUniswapPool'
// import { useUserAddedTokens } from '~/hooks/useToken'
// import { getChainSpecificTokensList } from '~/utils/tokens'
// import { PiLessThan } from 'react-icons/pi'

// export default function NewMarket() {
//   const chainId = useChainId()
//   const navigate = useNavigate()

//   const goBack = () => navigate(-1)
//   const searchParams = new URLSearchParams(window.location.search)
//   const token0Addr = getAddress(searchParams.get('token0') ?? zeroAddress)
//   const token1Addr = getAddress(searchParams.get('token1') ?? zeroAddress)
//   const fee = searchParams.has('fee') ? Number(searchParams.get('fee')) : undefined

//   const { userAddedTokens } = useUserAddedTokens(chainId)
//   const tokens = getChainSpecificTokensList(chainId)
//   const currentChainTokens = [...tokens, ...Object.values(userAddedTokens[chainId])].filter(
//     (t) => t.address !== zeroAddress, // Filter out default "Unknown" token used to prime localStorage for custom tokens
//   )

//   const token0 = currentChainTokens.find((t) => t.address === token0Addr)
//   const token1 = currentChainTokens.find((t) => t.address === token1Addr)

//   // Uniswap state
//   const {
//     uniswapPoolAddress,
//     slot0,
//     refetch: refetchUniswapPoolAddress,
//   } = useUniswapPoolV2(token0Addr, token1Addr, fee ?? NaN, false)
//   const uniswapPoolExists = uniswapPoolAddress != undefined && uniswapPoolAddress !== zeroAddress
//   const poolIsInitialized = slot0?.[0] != null && slot0?.[0] !== 0n
//   const poolCreatedAndInitialized = uniswapPoolExists && poolIsInitialized

//   // Panoptic state
//   const { panopticPoolAddress } = usePanopticPoolV2(uniswapPoolAddress ?? zeroAddress, false)
//   const panopticPoolExists = panopticPoolAddress != null && panopticPoolAddress !== zeroAddress

//   function renderAction() {
//     if (poolCreatedAndInitialized && panopticPoolExists) {
//       return (
//         <div className="mt-4 flex flex-col items-center justify-center w-full">
//           <p>This market already exists!</p>
//           <Link
//             className="mt-4 font-semibold inline-flex items-center justify-center hover:underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
//             to={`/markets/${panopticPoolAddress}`}>
//             Go to market {'->'}
//           </Link>
//         </div>
//       )
//     }

//     if (token0 == null || token1 == null || fee == null) {
//       return null
//     } else if (!poolCreatedAndInitialized) {
//       return (
//         <CreateAndInitializeUniPoolForm
//           token0={token0}
//           token1={token1}
//           fee={fee}
//           onInitializeConfirmed={() => {
//             toast.success('Uniswap Pool initialized successfully!')
//             refetchUniswapPoolAddress()
//           }}
//         />
//       )
//     } else if (!panopticPoolExists) {
//       return <CreatePanopticPoolForm token0={token0} token1={token1} fee={fee} />
//     } else {
//       console.error('Unkown renderAction case')
//     }
//   }

//   return (
//     <Container size="2">
//       <section className="flex flex-row mx-1 gap-2">
//         <Button onClick={goBack} variant="flat" className="!border-none">
//           <div className="flex flex-row items-center gap-x-2">
//             <PiLessThan size={16} />
//             <h2 className="text-color-text-alt text-lg font-medium">Create Market</h2>
//           </div>
//         </Button>
//       </section>
//       <section className="flex flex-col gap-2 mt-4 px-6">
//         <div className="flex flex-wrap justify-between items-center">
//           <CurrencySelect
//             label="Market"
//             selectedToken={token0}
//             selectableTokens={currentChainTokens}
//             disabled={true}
//             onTokenSelect={() => {}}
//           />
//           <CurrencySelect
//             label="Priced In"
//             selectedToken={token1}
//             selectableTokens={currentChainTokens}
//             disabled={true}
//             onTokenSelect={() => {}}
//           />
//           <FeeTierSelect
//             label="Fee tier"
//             onFeeTierSelect={(newFee) => {
//               const searchParams = new URLSearchParams(window.location.search)
//               if (newFee != null) {
//                 searchParams.set('fee', newFee.toString())
//                 navigate(`?${searchParams.toString()}`)
//               }
//             }}
//             disabled={true}
//             selectedFeeTier={fee}
//           />
//         </div>
//         {renderAction()}
//       </section>
//     </Container>
//   )
// }

export default function NewMarket(){
  return <div>new mkt</div>
}