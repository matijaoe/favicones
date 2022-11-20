export type IconifySearchModel = {
  icons: string[]
  total: number
  limit: number
  start: number
  collections: string[]
  request: Request
}

export type Request = {
  query: string
}
