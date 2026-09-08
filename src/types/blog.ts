export type BlogTaxonomy = {
  id: string
  name: string
  slug: string
  postCount: number
}

export type BlogCategory = BlogTaxonomy & {
  description: string | null
}

export type BlogTag = BlogTaxonomy

export type BlogImage = {
  id: string
  publicUrl: string
  altText: string | null
  mimeType: string
  sizeBytes: number
  width: number
  height: number
  createdAtUtc: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  contentHtml: string | null
  coverImageUrl: string | null
  seoTitle: string | null
  seoDescription: string | null
  canonicalUrl: string | null
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  categories: BlogCategory[]
  tags: BlogTag[]
}

export type PaginatedBlogPosts = {
  items: BlogPost[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type BlogPostFilters = {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  tag?: string
}
