import { NextRouter } from 'next/router'

export const handleUrlSearchPramUpdate = (
  router: NextRouter,
  key: string,
  value: string,
) => {
  const newQuery = new URLSearchParams()
  newQuery.set(key, value)
  router.push(`${router.pathname}?${newQuery.toString()}`)
}

export const handleUrlSearchPramPreserveUpdate = (
  router: NextRouter,
  query: URLSearchParams,
  key: string,
  value: string,
) => {
  const newQuery = new URLSearchParams(query)
  newQuery.set(key, value)
  router.push(`${router.pathname}?${newQuery.toString()}`)
}

export const handleUrlSearchPramRemoveKeys = (
  router: NextRouter,
  query: URLSearchParams,
  keys: string[],
) => {
  const newQuery = new URLSearchParams(query)
  keys.forEach((key) => newQuery.delete(key))
  router.push(`${router.pathname}?${newQuery.toString()}`)
}
