import type { BlogCategory, BlogImage, BlogTag } from "@/types/blog"

export const ADMIN_ACCESS_COOKIE = "portfolio-admin-access"
export const ADMIN_REFRESH_COOKIE = "portfolio-admin-refresh"
export const ADMIN_ROLE = "Admin"
export const ADMIN_POST_STATUS = {
  draft: 1,
  published: 2,
  archived: 3,
} as const

export type AuthenticatedAdmin = {
  id: string
  email: string
  displayName: string
  role: string
}

export type LoginResponse = {
  accessToken: string
  tokenType: string
  expiresAtUtc: string
  refreshToken: string
  refreshTokenExpiresAtUtc: string
  user: AuthenticatedAdmin
}

export type AdminPostStatus =
  (typeof ADMIN_POST_STATUS)[keyof typeof ADMIN_POST_STATUS]

export type AdminPost = {
  id: string
  authorId: string
  title: string
  slug: string
  excerpt: string | null
  contentJson: string | null
  contentHtml: string | null
  status: AdminPostStatus
  coverImageUrl: string | null
  seoTitle: string | null
  seoDescription: string | null
  canonicalUrl: string | null
  publishedAtUtc: string | null
  createdAtUtc: string
  updatedAtUtc: string
  version: string
  categoryIds: string[]
  tagIds: string[]
}

export type AdminPostInput = {
  title: string
  slug: string
  excerpt: string | null
  contentJson: string | null
  contentHtml: string | null
  coverImageUrl: string | null
  seoTitle: string | null
  seoDescription: string | null
  canonicalUrl: string | null
  categoryIds: string[]
  tagIds: string[]
  version: string | null
}

export type AdminCategoryInput = { name: string; slug: string; description: string | null }
export type AdminTagInput = { name: string; slug: string }

export type AdminDashboardData = {
  posts: AdminPost[]
  categories: BlogCategory[]
  tags: BlogTag[]
  images: BlogImage[]
}
