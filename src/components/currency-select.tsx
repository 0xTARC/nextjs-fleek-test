import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { RxChevronDown as ChevronDownIcon } from 'react-icons/rx'
import { getAddress, isAddress, zeroAddress } from 'viem'
import { useChainId } from 'wagmi'
import { Loading } from './loading'
import { TokenIcon } from './token-icon'
import { TokenInfo } from '@uniswap/token-lists'
import { useToken } from '~/hooks/useToken'
import { Dialog, Separator } from '@radix-ui/themes'
import { Button } from './button'
import { DialogTitle } from './dialog-title'
import { SlMagnifier } from 'react-icons/sl'
import { shortenAddress } from '~/utils/address'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Sheet } from 'react-modal-sheet'

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
  function getTokensFilter(inputValue: string) {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return function tokensFilter(token: TokenInfo) {
      return (
        !inputValue ||
        token.name.toLowerCase().includes(lowerCasedInputValue) ||
        token.symbol.toLowerCase().includes(lowerCasedInputValue)
      )
    }
  }

  const selectableTokensWithoutSuggested = selectableTokens.filter(
    (token) => !suggestedTokens?.includes(token),
  )

  // If this component receives a list of suggestedTokens, make sure they are removed from the overall selectableTokens list and put at the front of the final item list
  const searchableTokens =
    suggestedTokens && suggestedTokens.length > 0
      ? [...suggestedTokens, ...selectableTokensWithoutSuggested]
      : selectableTokens

  const chainId = useChainId()
  const [items, setItems] = useState(searchableTokens)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState<string>('')
  const { isMobile } = useScreenDetector()
  const [isOpenMobileTokenSearch, setIsOpenMobileTokenSearch] = useState<boolean>(false)
  const searchResultsExist = items.length !== selectableTokens.length

  const enabled =
    inputVal != null && inputVal !== '' && inputVal !== zeroAddress && isAddress(inputVal)
  const { token, isFetching, error } = useToken(chainId, inputVal, enabled)
  const maybeFoundToken = items.find((t) => t.address == inputVal)
  const MainTokenListItems = useMemo(() => {
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
          <div>
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
              isMobile ? setIsOpenMobileTokenSearch(false) : setIsDialogOpen(false)
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

    let mainListItems = items
    if (!searchResultsExist) {
      // If items are unfiltered, return all items w/o the suggested tokens and adjust selection index so the highlights are correct.
      mainListItems = items.slice(suggestedTokens?.length)
    } else {
      // If items are filtered, return all search results.
      mainListItems = items
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
            isMobile ? setIsOpenMobileTokenSearch(false) : setIsDialogOpen(false)
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
      <div>
        <div className="text-center text-lg">Token not found.</div>
      </div>
    )
  }, [
    chainId,
    error,
    isFetching,
    isMobile,
    items,
    maybeFoundToken,
    onTokenSelect,
    searchResultsExist,
    selectableTokens,
    suggestedTokens?.length,
    token,
  ])

  const tokenSelectionContent = useMemo(() => {
    return (
      <>
        <div className="px-5 pb-6">
          <div className="border border-gray-200 p-3 rounded-3xl flex flex-row items-center gap-x-4">
            <SlMagnifier />
            <input
              placeholder="Search name or paste address"
              className="w-full placeholder:text-lg focus:outline-none"
              onChange={(e) => {
                const inputVal = e.target.value
                setInputVal(inputVal)
                const filteredTokens = selectableTokens.filter(getTokensFilter(inputVal ?? ''))
                setItems(filteredTokens)
              }}
              value={inputVal}
            />
          </div>
          {suggestedTokens != null && suggestedTokens.length > 0 && !searchResultsExist ? (
            <div id="currency_selector" className="py-2">
              <p className="text-md font-medium py-3">Popular quote tokens</p>
              {items?.slice(0, suggestedTokens?.length ?? 0).map((item, index) => (
                <div
                  className="flex flex-row items-center gap-x-3 border rounded-3xl cursor-pointer w-fit"
                  key={item.address}
                  role="presentation"
                  onClick={() => {
                    const token = suggestedTokens[index]
                    onTokenSelect(token ?? undefined)
                    isMobile ? setIsOpenMobileTokenSearch(false) : setIsDialogOpen(false)
                  }}>
                  <div className="flex flex-row items-center gap-x-2 px-2.5 py-1 hover:bg-gray-100 rounded-full">
                    <TokenIcon token={item} width={30} height={30} />
                    <span className="text-lg font-bold">{item.symbol}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Separator orientation="horizontal" size="4" />
        <div className={clsx('overflow-y-scroll py-4', { 'h-[700px]': !isMobile })}>
          {MainTokenListItems}
        </div>
      </>
    )
  }, [
    MainTokenListItems,
    inputVal,
    isMobile,
    items,
    onTokenSelect,
    searchResultsExist,
    selectableTokens,
    suggestedTokens,
  ])

  const dialogContent = useMemo(() => {
    return (
      <>
        <DialogTitle dialogTitle={'Select a token'} setDialogOpen={setIsDialogOpen} />
        {tokenSelectionContent}
      </>
    )
  }, [tokenSelectionContent])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mainButton = (onClick: any) => {
    return (
      <Button
        className="!px-2 !py-3 !text-md !rounded-lg !border !border-gray-200 w-[200px] h-[48px]"
        onClick={onClick}
        variant="flat">
        <div className="flex flex-row items-center justify-between">
          <p className="font-normal pl-1">Select Token</p>
          <ChevronDownIcon
            size={22}
            className={clsx('transition-transform duration-200', {
              'rotate-180': isDialogOpen || isOpenMobileTokenSearch,
            })}
          />
        </div>
      </Button>
    )
  }

  const selectedTokenButton = useMemo(() => {
    if (selectedToken) {
      return (
        <div className="px-2 py-1 text-md rounded-lg border border-gray-200 flex flex-row items-center gap-x-3 w-[200px] h-[48px] justify-between">
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
              <AiOutlineCloseCircle size={22} />
            </button>
          </div>
          <ChevronDownIcon
            size={22}
            className={clsx('transition-transform duration-200', {
              'rotate-180': isDialogOpen,
            })}
          />
        </div>
      )
    }
  }, [isDialogOpen, onTokenSelect, selectedToken])

  return (
    <div className="flex flex-col">
      <label className="text-md font-normal pb-2">{label}</label>
      {isMobile ? (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-end">
              {selectedToken
                ? selectedTokenButton
                : mainButton(() => setIsOpenMobileTokenSearch(true))}
            </div>
          </div>
          <Sheet
            isOpen={isOpenMobileTokenSearch}
            onClose={() => setIsOpenMobileTokenSearch(false)}
            detent="full-height">
            <Sheet.Container>
              <Sheet.Header />
              <Sheet.Content>
                <Sheet.Scroller>
                  <div className="flex flex-row items-center justify-between pb-4 px-4">
                    <p className="text-lg font-semibold">Search Token</p>
                    <Button
                      variant="flat"
                      className="!border-none"
                      onClick={() => setIsOpenMobileTokenSearch(false)}>
                      Close
                    </Button>
                  </div>
                  {tokenSelectionContent}
                </Sheet.Scroller>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
          </Sheet>
        </>
      ) : (
        <Dialog.Root open={isDialogOpen}>
          <Dialog.Trigger>
            {selectedToken
              ? selectedTokenButton
              : mainButton(() => {
                  setIsDialogOpen(true)
                })}
          </Dialog.Trigger>
          <Dialog.Content className="!p-0" maxWidth={'500px'}>
            {dialogContent}
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  )
}
