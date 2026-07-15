import "server-only"

import type {
  BlogCategory,
  BlogPost,
  BlogPostFilters,
  BlogTag,
  PaginatedBlogPosts,
} from "@/types/blog"

type PublicPostResponse = Omit<BlogPost, "categories" | "tags"> & {
  categoryIds: string[]
  tagIds: string[]
}

type PagedPostsResponse = Omit<PaginatedBlogPosts, "items"> & {
  items: PublicPostResponse[]
}

function normalizePagedPosts(
  response: PagedPostsResponse | PublicPostResponse[],
  requestedPage: number,
  requestedPageSize: number,
): PagedPostsResponse {
  if (!Array.isArray(response)) return response

  return {
    items: response,
    page: requestedPage,
    pageSize: requestedPageSize,
    totalItems: response.length,
    totalPages: response.length > 0 ? 1 : 0,
  }
}

export class PublicBlogApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = "PublicBlogApiError"
  }
}

function getApiBaseUrl() {
  const value = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL
  if (!value) {
    throw new PublicBlogApiError("A API do blog não está configurada.")
  }

  return value.replace(/\/$/, "")
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/blog${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300, tags: ["public-blog"] },
  })

  if (!response.ok) {
    throw new PublicBlogApiError(
      response.status === 404
        ? "Conteúdo do blog não encontrado."
        : "Não foi possível carregar o blog.",
      response.status,
    )
  }

  return response.json() as Promise<T>
}

function hydratePost(
  post: PublicPostResponse,
  categories: BlogCategory[],
  tags: BlogTag[],
): BlogPost {
  const { categoryIds, tagIds, ...fields } = post
  const categoryIdSet = new Set(categoryIds)
  const tagIdSet = new Set(tagIds)

  return {
    ...fields,
    categories: categories.filter((category) => categoryIdSet.has(category.id)),
    tags: tags.filter((tag) => tagIdSet.has(tag.id)),
  }
}

export function getBlogCategories() {
  return request<BlogCategory[]>("/categories")
}

export function getBlogTags() {
  return request<BlogTag[]>("/tags")
}

async function getBlogTaxonomies() {
  const [categories, tags] = await Promise.all([
    getBlogCategories(),
    getBlogTags(),
  ])

  return { categories, tags }
}

export async function getPublishedPosts(
  filters: BlogPostFilters = {},
): Promise<PaginatedBlogPosts> {
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 10
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("pageSize", String(pageSize))
  if (filters.search) params.set("search", filters.search)
  if (filters.category) params.set("category", filters.category)
  if (filters.tag) params.set("tag", filters.tag)

  const [result, taxonomies] = await Promise.all([
    request<PagedPostsResponse | PublicPostResponse[]>(`/posts?${params}`),
    getBlogTaxonomies(),
  ])
  const normalizedResult = normalizePagedPosts(result, page, pageSize)

  return {
    ...normalizedResult,
    items: normalizedResult.items.map((post) =>
      hydratePost(post, taxonomies.categories, taxonomies.tags),
    ),
  }
}

export async function getPublishedPost(slug: string): Promise<BlogPost> {
  const [post, taxonomies] = await Promise.all([
    request<PublicPostResponse>(`/posts/${encodeURIComponent(slug)}`),
    getBlogTaxonomies(),
  ])

  return hydratePost(post, taxonomies.categories, taxonomies.tags)
}

export async function getRelatedPosts(slug: string, limit = 4) {
  const [posts, taxonomies] = await Promise.all([
    request<PublicPostResponse[]>(
      `/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    ),
    getBlogTaxonomies(),
  ])

  return posts.map((post) =>
    hydratePost(post, taxonomies.categories, taxonomies.tags),
  )
}
