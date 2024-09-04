import { TokenInfo } from '@uniswap/token-lists'
import { Address, erc20Abi, getAddress, isAddress, zeroAddress } from 'viem'
import { useLocalStorage } from 'usehooks-ts'
import { useReadContracts } from 'wagmi'

export type TokenInfoMap = Record<number, Record<Address, TokenInfo>>

const userAddedTokensKey = 'userAddedTokens'
export function useUserAddedTokens(chainId: number) {
  const unknownToken = {
    chainId,
    address: zeroAddress,
    name: 'Unknown Token',
    symbol: 'UNKOWN',
    decimals: 18,
  }

  const initialUserTokenInfoMap = {
    [chainId]: {
      [unknownToken.address]: unknownToken,
    },
  }

  const [value, setValue] = useLocalStorage<TokenInfoMap>(
    userAddedTokensKey,
    initialUserTokenInfoMap,
  )

  const addNewToken = (newToken: TokenInfo) => {
    const updatedTokens = {
      ...value,
      [chainId]: {
        ...value[chainId],
        [newToken.address]: newToken,
      },
    }

    setValue(updatedTokens)
  }

  return { userAddedTokens: value, setUserAddedTokens: setValue, addNewToken }
}

export function useToken(chainId: number, address: string, enabled: boolean) {
  const addr =
    address === '' || address == null || !isAddress(address) ? zeroAddress : getAddress(address)
  const data = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: addr,
        chainId,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: addr,
        chainId,
        abi: erc20Abi,
        functionName: 'name',
      },
      {
        address: addr,
        chainId,
        abi: erc20Abi,
        functionName: 'symbol',
      },
    ],
    query: {
      enabled,
    },
  })

  const tokenInfo = data.data
  const isFetching = data.isFetching
  const error = data.error
  if (tokenInfo === undefined) {
    return { token: undefined, isFetching, error }
  }

  return {
    token: {
      chainId,
      address,
      decimals: tokenInfo[0],
      name: tokenInfo[1],
      symbol: tokenInfo[2],
    } as TokenInfo,
    isFetching,
    error,
  }
}
