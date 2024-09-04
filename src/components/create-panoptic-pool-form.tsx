// import * as Label from '@radix-ui/react-label'
// import { TokenInfo } from '@uniswap/token-lists'
// import { TickMath } from '@uniswap/v3-sdk'
// import { useCallback, useState } from 'react'
// import { Address, formatUnits, getAddress, toHex, zeroAddress } from 'viem'
// import { useAccount, useChainId } from 'wagmi'
// import { useDeployNewPanopticPool } from '~/hooks/contracts/useDeployNewPanopticPool'
// import { usePanopticPoolV2 } from '~/hooks/contracts/usePanopticPool'
// import { useUniswapPoolV2 } from '~/hooks/contracts/useUniswapPool'
// import { wrappedNativeTokenAddressesPerChain } from '~/utils/constants'
// import { feeTierToTickSpacing } from '~/utils/options'
// import { Q96, getAmountsForLiquidity, getLowerAndUpperFullRangeTicks } from '~/utils/uniswap'
// import { inputStyles } from './component.styles'
// import { Button } from './button'
// import { Button as RadixButton, Callout } from '@radix-ui/themes'
// import { RxInfoCircled as InfoCircledIcon } from 'react-icons/rx'
// import { shortenMantissaIfNecessary } from '~/utils/currencyFormat'
// import { toast } from 'react-toastify'
// import { useNavigate } from '@remix-run/react'

// /// Calculate liquidity and approximate token amounts needed for full range liq. deployed as a consequence of PanopticPool deployment
// const calcFullRangeLiqForDeployment = (
//   wrappedNativeAssetAddress: Address,
//   token0Address: Address,
//   token1Address: Address,
//   currentSqrtPriceX96: bigint,
// ): bigint => {
//   if (
//     currentSqrtPriceX96 === 0n ||
//     wrappedNativeAssetAddress === zeroAddress ||
//     token0Address === zeroAddress ||
//     token1Address === zeroAddress
//   ) {
//     console.warn('[calcFullRangeLiqForDeployment] Invalid args.', {
//       currentSqrtPriceX96,
//       wrappedNativeAssetAddress,
//       token0Address,
//       token1Address,
//     })
//     return 0n
//   }

//   const FULL_RANGE_LIQUIDITY_AMOUNT_TOKEN = BigInt(1e6)
//   const FULL_RANGE_LIQUIDITY_AMOUNT_WETH = BigInt(0.1 * 10 ** 18) // 0.1 ether in Wei
//   let fullRangeLiquidity: bigint

//   if (wrappedNativeAssetAddress === token0Address) {
//     fullRangeLiquidity = (FULL_RANGE_LIQUIDITY_AMOUNT_WETH * currentSqrtPriceX96) / Q96
//   } else if (wrappedNativeAssetAddress === token1Address) {
//     fullRangeLiquidity = (FULL_RANGE_LIQUIDITY_AMOUNT_WETH * Q96) / currentSqrtPriceX96
//   } else {
//     const liquidity0 = (FULL_RANGE_LIQUIDITY_AMOUNT_TOKEN * currentSqrtPriceX96) / Q96

//     const liquidity1 = (FULL_RANGE_LIQUIDITY_AMOUNT_TOKEN * Q96) / currentSqrtPriceX96

//     fullRangeLiquidity = liquidity0 > liquidity1 ? liquidity0 : liquidity1
//   }
//   return fullRangeLiquidity
// }

// export function CreatePanopticPoolForm({
//   token0,
//   token1, // if no asset token specified use the uniswap default (token0)
//   fee,
// }: {
//   token0: TokenInfo
//   token1: TokenInfo
//   fee: number
// }) {
//   const navigate = useNavigate()
//   const { address } = useAccount()
//   const chainId = useChainId()

//   const { uniswapPoolAddress, slot0 } = useUniswapPoolV2(
//     getAddress(token0.address),
//     getAddress(token1.address),
//     fee,
//     false,
//   )

//   const generateSalt = useCallback(() => {
//     const randomValues = crypto.getRandomValues(new Uint32Array(3))
//     // Create a random uint96 by concatenating 3 random uint32s
//     const salt =
//       (BigInt(randomValues[0]) << 64n) | (BigInt(randomValues[1]) << 32n) | BigInt(randomValues[2])
//     // size_in_bytes = 96bits / 8 = 12
//     const size = 12
//     return toHex(salt, { size }).toString().slice(2) // `.slice(2)` to remove the leading '0x'
//   }, [])
//   const [salt, setSalt] = useState(generateSalt)

//   const { panopticPoolAddress } = usePanopticPoolV2(uniswapPoolAddress ?? zeroAddress, false)
//   const panopticPoolExists = panopticPoolAddress != null && panopticPoolAddress !== zeroAddress

//   const wrappedNativeAssetAddress = wrappedNativeTokenAddressesPerChain[chainId]

//   const currentSqrtPriceX96 = slot0?.[0] ?? 0n

//   const fullRangeLiquidity =
//     slot0 == null
//       ? 0n
//       : calcFullRangeLiqForDeployment(
//           wrappedNativeAssetAddress,
//           getAddress(token0.address),
//           getAddress(token1.address),
//           currentSqrtPriceX96,
//         )

//   const [lowerTick, upperTick] = getLowerAndUpperFullRangeTicks(feeTierToTickSpacing(fee))
//   const lowerSqrtPrice = TickMath.getSqrtRatioAtTick(lowerTick)
//   const upperSqrtPrice = TickMath.getSqrtRatioAtTick(upperTick)
//   const [minRequiredToken0, minRequiredToken1] = getAmountsForLiquidity(
//     currentSqrtPriceX96,
//     fullRangeLiquidity,
//     BigInt(lowerSqrtPrice.toString()),
//     BigInt(upperSqrtPrice.toString()),
//   )
//   // add 10% margin to calculated requirements to account for price moves
//   const requiredToken0 = (minRequiredToken0 * 110n) / 100n
//   const requiredToken1 = (minRequiredToken1 * 110n) / 100n

//   const {
//     action: createPanopticPoolAction,
//     actionLabel: createPanopticPoolActionLabel,
//     approveToken0,
//     approveToken1,
//     simulateDeploy,
//     writeDeploy,
//     waitDeploy,
//   } = useDeployNewPanopticPool(
//     {
//       token0: getAddress(token0?.address ?? zeroAddress),
//       token0Amount: requiredToken0,
//       token1: getAddress(token1?.address ?? zeroAddress),
//       token1Amount: requiredToken1,
//       fee: fee,
//       // Salt is bytes32. It must begin with first 20bytes being the address. The following 12 bytes (24 characters) can be mined to generate a more rare pool addresses.
//       salt: `${address ?? zeroAddress}${salt}`,
//       disabled: false,
//     },
//     () => {
//       toast.success('Market created successfully!')
//       // Navigate after 10 secs
//       setTimeout(() => {
//         navigate(`/markets/${simulateDeploy.data?.result}`)
//       }, 10000)
//     },
//   )

//   return (
//     <div>
//       {!panopticPoolExists ? (
//         <div className="my-3 flex flex-col gap-1 w-full">
//           <Label.Root htmlFor="salt" className="text-md font-normal">
//             Choose salt
//           </Label.Root>
//           <input
//             className={inputStyles}
//             name="salt"
//             id="salt"
//             value={salt}
//             onChange={(e) => setSalt(e.target.value)}
//           />
//           <RadixButton color="violet" variant="soft" onMouseDown={() => setSalt(generateSalt)}>
//             Mine salt
//           </RadixButton>
//           <span className="text-red-400 text-xs">
//             {salt.length !== 24
//               ? `Salt must be 24 characters long (currently ${salt.length})`
//               : null}
//           </span>
//         </div>
//       ) : null}

//       <Callout.Root className="mt-4" color="gray">
//         <Callout.Icon>
//           <InfoCircledIcon />
//         </Callout.Icon>
//         <Callout.Text>
//           The salt is any random sequence of 24 characters. Depending on the salt entered, an NFT of
//           varying rarity will be rewarded.
//         </Callout.Text>
//       </Callout.Root>

//       {!panopticPoolExists ? (
//         <div className="mt-4 flex flex-col gap-2">
//           {[token0, token1].map((token, i) => {
//             const requiredAmount = i === 0 ? requiredToken0 : requiredToken1
//             const formattedDepositAmount = shortenMantissaIfNecessary(
//               formatUnits(requiredAmount, token?.decimals ?? 0),
//             )

//             return (
//               <div key={token.address + i.toString()} className="flex flex-row justify-between">
//                 <p className="text-md text-slate-600">{token.symbol} Fee</p>
//                 <p className="text-md text-slate-600">
//                   {token ? formattedDepositAmount : '0'} {token.symbol}
//                 </p>
//               </div>
//             )
//           })}
//         </div>
//       ) : null}

//       <Button
//         id="action-button"
//         onClick={() => createPanopticPoolAction.write?.()}
//         disabled={
//           address === undefined ||
//           !createPanopticPoolAction.write ||
//           createPanopticPoolAction.isLoading ||
//           approveToken0.simulate.error != null ||
//           approveToken0.simulate.isLoading ||
//           approveToken1.simulate.error != null ||
//           approveToken1.simulate.isLoading ||
//           simulateDeploy.isLoading ||
//           simulateDeploy.error != null ||
//           writeDeploy.isPending ||
//           waitDeploy.isLoading
//         }
//         unsafeDisable={
//           address === undefined ||
//           !createPanopticPoolAction.write ||
//           createPanopticPoolAction.isLoading ||
//           approveToken0.simulate.error != null ||
//           approveToken0.simulate.isLoading ||
//           approveToken1.simulate.error != null ||
//           approveToken1.simulate.isLoading ||
//           simulateDeploy.isLoading ||
//           simulateDeploy.error != null ||
//           writeDeploy.isPending ||
//           waitDeploy.isLoading
//         }
//         variant="primary"
//         size="lg"
//         className="w-full rounded-xl mt-4">
//         {createPanopticPoolActionLabel}
//       </Button>

//       {simulateDeploy.error != null && (
//         <Callout.Root className="my-4 max-w-fit overflow-auto" color="red">
//           <Callout.Icon>
//             <InfoCircledIcon />
//           </Callout.Icon>
//           <Callout.Text>
//             <p>Error: {simulateDeploy.error.name}</p>
//             <p>
//               <b>
//                 Do you have enough {token0.symbol} and {token1.symbol}?
//               </b>
//             </p>
//             <p>Full error: {simulateDeploy.error.message}</p>
//           </Callout.Text>
//         </Callout.Root>
//       )}
//     </div>
//   )
// }
