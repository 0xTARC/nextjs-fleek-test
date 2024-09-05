import { Separator } from '@radix-ui/themes'
import { TokenInfo } from '@uniswap/token-lists'
import { useMemo, useRef, useState } from 'react'
import { SlMagnifier } from 'react-icons/sl'
import { TokenIcon } from './token-icon'
import { useChainId } from 'wagmi'
import { useToken } from '~/hooks/useToken'
import { getAddress, isAddress, zeroAddress } from 'viem'
import { Loading } from './loading'
import { shortenAddress } from '~/utils/address'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoMdTrendingUp, IoMdArrowBack } from 'react-icons/io'
import { useOnClickOutside } from 'usehooks-ts'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Button } from './button'
import clsx from 'clsx'
import { getTokensFilter } from '~/utils/tokens'
import { Overlay } from './overlay'

export function CurrencySelect({
  selectedToken,
  label,
  onTokenSelect,
  selectableTokens,
  suggestedTokens,
  disabled = false,
}: {
  selectedToken?: TokenInfo
  label: string
  onTokenSelect: React.Dispatch<TokenInfo | undefined>
  selectableTokens: TokenInfo[]
  suggestedTokens?: TokenInfo[]
  disabled?: boolean
}) {
  const selectableTokensWithoutSuggested = selectableTokens.filter(
    (token) => !suggestedTokens?.includes(token),
  )

  const searchableTokens =
    suggestedTokens && suggestedTokens.length > 0
      ? [...suggestedTokens, ...selectableTokensWithoutSuggested]
      : selectableTokens

  const parentRef = useRef<HTMLDivElement | null>(null)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [inputVal, setInputVal] = useState<string>('')
  const [tokens, setTokens] = useState(searchableTokens)
  const { isMobile } = useScreenDetector()
  const searchResultsExist = tokens.length !== selectableTokens.length
  const chainId = useChainId()
  const enabled =
    inputVal != null && inputVal !== '' && inputVal !== zeroAddress && isAddress(inputVal)
  const { token, isFetching, error } = useToken(chainId, inputVal, enabled)
  const maybeFoundToken = tokens.find((t) => t.address == inputVal)
  useOnClickOutside(parentRef, () => setShowDropdown(false))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchToken = (e: any) => {
    const inputVal = e.target.value
    setInputVal(inputVal)
    const filteredTokens = selectableTokens.filter(getTokensFilter(inputVal ?? ''))
    setTokens(filteredTokens)
  }

  const tokenListItems = useMemo(() => {
    // If user is searching for a specific token by address, render the search result in the main token list.
    // Otherwise, we will render the filtered tokens.
    if (maybeFoundToken == undefined) {
      // No token exists in token list for pasted address, infer it's metadata and return special list item when user searches for a specific address
      if (isFetching) {
        return (
          <div>
            <span className="h-8 w-8 bg-transparent"></span>
            <div className="py-2 px-3 flex flex-col">
              <Loading />
            </div>
          </div>
        )
      } else if (error != null) {
        return (
          <div className="p-4">
            <div className="text-center text-lg">Token not found.</div>
          </div>
        )
      } else if (token !== undefined) {
        const foundTokenInList = selectableTokens.find(
          (t) => t.address.toLowerCase() === token.address.toLowerCase(),
        )

        const searchedToken: TokenInfo = {
          chainId,
          address: getAddress(token.address),
          name: token.name ?? '',
          decimals: token.decimals,
          symbol: token.symbol ?? '',
          logoURI: foundTokenInList?.logoURI,
        }
        return (
          <div
            className="flex flex-row items-center gap-3 pl-4 w-full cursor-pointer hover:bg-gray-100"
            role="presentation"
            onClick={() => {
              onTokenSelect(searchedToken)
              isMobile ? setIsOverlayOpen(false) : setShowDropdown(false)
            }}>
            <TokenIcon token={searchedToken} width={44} height={44} />
            <span className={'py-2 px-3 flex flex-col'}>
              <span className="text-lg font-medium text-[#131316]">{searchedToken.name}</span>
              <div className="flex flex-row items-center gap-x-2">
                <span className="text-md font-medium text-[#7B7B7B]">{searchedToken.symbol}</span>
                <span className="text-md font-medium text-[#7B7B7B]">
                  {shortenAddress(searchedToken.address)}
                </span>
              </div>
            </span>
          </div>
        )
      }
    }

    let mainListItems = tokens
    if (!searchResultsExist) {
      // If items are unfiltered, return all items w/o the suggested tokens and adjust selection index so the highlights are correct.
      mainListItems = tokens.slice(suggestedTokens?.length)
    } else {
      // If items are filtered, return all search results.
      mainListItems = tokens
    }

    return mainListItems.length ? (
      mainListItems.map((item, index) => (
        <div
          className={
            'flex flex-row items-center gap-3 pl-4 w-full cursor-pointer hover:bg-gray-100'
          }
          key={item.address}
          onClick={() => {
            const token = mainListItems[index]
            onTokenSelect(token ?? undefined)
            isMobile ? setIsOverlayOpen(false) : setShowDropdown(false)
          }}
          role="presentation">
          <TokenIcon token={item} width={44} height={44} />
          <span className={'py-2 px-3 flex flex-col'} key={item.address}>
            <span className="text-lg font-medium text-[#131316]">{item.name}</span>
            <span className="text-md font-medium text-[#7B7B7B]">{item.symbol}</span>
          </span>
        </div>
      ))
    ) : (
      <div className="p-4">
        <div className="text-center text-lg">Token not found.</div>
      </div>
    )
  }, [
    chainId,
    error,
    isFetching,
    isMobile,
    maybeFoundToken,
    onTokenSelect,
    searchResultsExist,
    selectableTokens,
    suggestedTokens?.length,
    token,
    tokens,
  ])

  const tokenSelectDropdown = useMemo(() => {
    if (!showDropdown && !isOverlayOpen) return
    return (
      <div
        className={clsx('w-full overflow-y-auto', {
          'max-h-[470px] border shadow-bold-shadow absolute z-10 rounded-lg mt-1 bg-white':
            !isMobile,
        })}>
        <div>
          {suggestedTokens != null && suggestedTokens.length > 0 && !searchResultsExist ? (
            <div id="currency_selector" className="p-4">
              <div className="flex flex-row items-center gap-x-2 pb-4">
                <IoMdTrendingUp color="gray" size={20} />
                <p className="text-md font-normal text-color-text-alt">Popular quote tokens</p>
              </div>
              {tokens?.slice(0, suggestedTokens?.length ?? 0).map((token, index) => (
                <div
                  className="flex flex-row items-center gap-x-3 border rounded-3xl cursor-pointer w-fit"
                  key={token.address}
                  role="presentation"
                  onClick={() => {
                    const token = suggestedTokens[index]
                    onTokenSelect(token ?? undefined)
                    isMobile ? setIsOverlayOpen(false) : setShowDropdown(false)
                  }}>
                  <div className="flex flex-row items-center gap-x-2 px-2.5 py-1 hover:bg-gray-100 rounded-full">
                    <TokenIcon token={token} width={30} height={30} />
                    <span className="text-lg font-bold">{token.symbol}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Separator orientation="horizontal" size="4" />
        <div className={clsx('h-full')}>{tokenListItems}</div>
      </div>
    )
  }, [
    showDropdown,
    isOverlayOpen,
    isMobile,
    suggestedTokens,
    searchResultsExist,
    tokens,
    tokenListItems,
    onTokenSelect,
  ])

  if (isMobile) {
    return (
      <div>
        <div>
          <label className="text-md font-normal pb-2">{label}</label>
          <div className="h-[56px] border border-gray-200 w-full px-4 py-2 rounded-lg hover:cursor-text hover:border-gray-400">
            {selectedToken ? (
              <div className="rounded-lg w-fit relative">
                <div className="flex flex-row items-center gap-x-5 bg-gray-100 rounded-full px-2.5 py-1 shadow-md">
                  <div className="flex flex-row items-center gap-x-1">
                    <TokenIcon token={selectedToken} width={30} height={30} />
                    <span className="text-lg font-bold">{selectedToken.symbol}</span>
                  </div>
                  <button
                    aria-label="Clear selection"
                    id="clear-selection"
                    onClick={(e) => {
                      e.preventDefault()
                      onTokenSelect(undefined)
                    }}>
                    <AiOutlineCloseCircle size={26} />
                  </button>
                </div>
              </div>
            ) : (
              <button className="w-full h-full" onClick={() => setIsOverlayOpen(true)}></button>
            )}
          </div>
        </div>
        <Overlay isOpen={isOverlayOpen}>
          <div className="flex flex-row items-center px-2 pb-4">
            <Button
              variant="flat"
              className="!w-26 !h-26 !p-4 !border-none"
              onClick={() => setIsOverlayOpen(false)}>
              <div className="flex items-center justify-center">
                <IoMdArrowBack size={22} />
              </div>
            </Button>
            <div className="p-4 mx-4 border border-gray-200 rounded-full bg-gray-100 w-full">
              <div className="flex flex-row items-center gap-x-4">
                <SlMagnifier size={22} />
                <input
                  placeholder={'Search name or paste address'}
                  className="w-full placeholder:text-lg focus:outline-none text-lg bg-gray-100"
                  onChange={(e) => searchToken(e)}
                  value={inputVal}
                />
              </div>
            </div>
          </div>
          {tokenSelectDropdown}
        </Overlay>
      </div>
    )
  } else {
    return (
      <div className="relative" ref={parentRef}>
        <label className="text-md font-normal pb-2">{label}</label>
        <div className="h-[56px] border border-gray-200 w-full px-4 py-2 rounded-lg hover:cursor-text hover:border-gray-400">
          {selectedToken ? (
            <div className="rounded-lg w-fit relative">
              <div className="flex flex-row items-center gap-x-5 bg-gray-100 rounded-full px-2.5 py-1 shadow-md">
                <div className="flex flex-row items-center gap-x-1">
                  <TokenIcon token={selectedToken} width={30} height={30} />
                  <span className="text-lg font-bold">{selectedToken.symbol}</span>
                </div>
                <button
                  aria-label="Clear selection"
                  id="clear-selection"
                  onClick={(e) => {
                    e.preventDefault()
                    onTokenSelect(undefined)
                  }}>
                  <AiOutlineCloseCircle size={26} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-4 py-2">
              <SlMagnifier size={22} />
              <input
                placeholder="Search tokens"
                className="w-full placeholder:text-lg focus:outline-none"
                onChange={(e) => searchToken(e)}
                value={inputVal}
                onFocus={() => setShowDropdown(true)}
              />
            </div>
          )}
        </div>
        {tokenSelectDropdown}
      </div>
    )
  }
}
