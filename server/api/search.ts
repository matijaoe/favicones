import type { IconifySearchModel } from '~~/model'

const fetchResults = async (query: string) => {
  return await $fetch<IconifySearchModel>('https://api.iconify.design/search', { params: { query } })
}

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event) as { query: string }

  return fetchResults(query)
})
