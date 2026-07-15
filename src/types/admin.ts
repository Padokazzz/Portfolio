import type { BlogCategory, BlogImage, BlogTag } from "@/types/blog"

export const ADMIN_SESSION_COOKIE = "portfolio-admin-session"

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
  user: AuthenticatedAdmin
}

export type AdminPostStatus = 1 | 2 | 3

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

export type AdminDashboardData = {
  posts: AdminPost[]
  categories: BlogCategory[]
  tags: BlogTag[]
  images: BlogImage[]
}
