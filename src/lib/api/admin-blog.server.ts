import "server-only"

import { redirect } from "next/navigation"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { getSessionToken, requireAdmin } from "@/lib/auth/session.server"
import type { AdminCategoryInput, AdminDashboardData, AdminPost, AdminPostInput, AdminTagInput } from "@/types/admin"
import type { BlogCategory, BlogImage, BlogTag } from "@/types/blog"

type AdminRequestOptions = { method?: "GET" | "POST" | "PUT" | "DELETE"; body?: unknown }

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "AdminApiError"
  }
}

async function adminRequest<T>(path: string, options: AdminRequestOptions = {}): Promise<T> {
  await requireAdmin()
  const token = await getSessionToken()
  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  })

  if (response.status === 401) redirect("/_control/renovar")
  if (response.status === 403) redirect("/_control/login?motivo=permissao")
  if (!response.ok) {
    const problem = (await response.json().catch(() => null)) as
      | { title?: string; detail?: string; errors?: Record<string, string[]> }
      | null
    const validationMessage = problem?.errors ? Object.values(problem.errors).flat().join(" ") : null
    throw new AdminApiError(response.status, validationMessage ?? problem?.detail ?? problem?.title ?? "Não foi possível concluir a operação.")
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const getAdminPosts = () => adminRequest<AdminPost[]>("/posts")
export const getAdminPost = (id: string) => adminRequest<AdminPost>(`/posts/${encodeURIComponent(id)}`)
export const getAdminCategories = () => adminRequest<BlogCategory[]>("/categories")
export const getAdminTags = () => adminRequest<BlogTag[]>("/tags")
export const createAdminPost = (input: AdminPostInput) => adminRequest<AdminPost>("/posts", { method: "POST", body: input })
export const updateAdminPost = (id: string, input: AdminPostInput) => adminRequest<AdminPost>(`/posts/${encodeURIComponent(id)}`, { method: "PUT", body: input })
export const changeAdminPostStatus = (id: string, transition: "publish" | "unpublish" | "archive") => adminRequest<AdminPost>(`/posts/${encodeURIComponent(id)}/${transition}`, { method: "POST" })
export const deleteAdminPost = (id: string) => adminRequest<void>(`/posts/${encodeURIComponent(id)}`, { method: "DELETE" })
export const createAdminCategory = (input: AdminCategoryInput) => adminRequest<BlogCategory>("/categories", { method: "POST", body: input })
export const updateAdminCategory = (id: string, input: AdminCategoryInput) => adminRequest<BlogCategory>(`/categories/${encodeURIComponent(id)}`, { method: "PUT", body: input })
export const deleteAdminCategory = (id: string) => adminRequest<void>(`/categories/${encodeURIComponent(id)}`, { method: "DELETE" })
export const createAdminTag = (input: AdminTagInput) => adminRequest<BlogTag>("/tags", { method: "POST", body: input })
export const updateAdminTag = (id: string, input: AdminTagInput) => adminRequest<BlogTag>(`/tags/${encodeURIComponent(id)}`, { method: "PUT", body: input })
export const deleteAdminTag = (id: string) => adminRequest<void>(`/tags/${encodeURIComponent(id)}`, { method: "DELETE" })

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const [posts, categories, tags, images] = await Promise.all([
    getAdminPosts(), getAdminCategories(), getAdminTags(), adminRequest<BlogImage[]>("/images"),
  ])
  return { posts, categories, tags, images }
}
