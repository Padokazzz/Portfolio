export type BlogSearchParams = Promise<{
  page?: string | string[]
  busca?: string | string[]
}>

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function parseBlogSearchParams(searchParams: BlogSearchParams) {
  const query = await searchParams
  const parsedPage = Number.parseInt(firstValue(query.page) ?? "1", 10)

  return {
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    search: firstValue(query.busca)?.trim() ?? "",
  }
}
