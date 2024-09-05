import { NextRouter } from 'next/router'

export const handleUrlSearchPramUpdate = (
  router: NextRouter,
  key: string,
  value: string,
) => {
  const newQuery = new URLSearchParams(router.asPath.split('?')[1] || '')
  newQuery.set(key, value)
  const newUrl = `${
    router.asPath.includes("?")
      ? router.pathname + `?${newQuery.toString()}`
      : router.pathname + `?${key}=${value}`
  }`
  window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
}

export const handleUrlSearchPramPreserveUpdate = (
  router: NextRouter,
  query: URLSearchParams,
  key: string,
  value: string,
) => {
  const newQuery = new URLSearchParams(query)
  newQuery.set(key, value)
  const newUrl = `${
    router.asPath.includes("?")
      ? router.pathname + `?${newQuery.toString()}`
      : router.pathname + `?${key}=${value}`
  }`
  window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
}

export const handleUrlSearchPramRemoveKeys = (
  router: NextRouter,
  query: URLSearchParams,
  keys: string[],
) => {
  const newQuery = new URLSearchParams(query)
  keys.forEach((key) => newQuery.delete(key))
  const newUrl = `${
    router.asPath.includes("?")
      ? router.pathname + `?${newQuery.toString()}`
      : router.pathname
  }`
  window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
}