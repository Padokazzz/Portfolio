import "server-only"

import { redirect } from "next/navigation"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { getSessionToken, requireAdmin } from "@/lib/auth/session.server"
import type { BlogCategory, BlogImage, BlogTag } from "@/types/blog"
import type { AdminDashboardData, AdminPost } from "@/types/admin"

async function adminRequest<T>(path: string): Promise<T> {
  await requireAdmin()
  const token = await getSessionToken()
  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })

  if (response.status === 401) redirect("/_control/renovar")
  if (response.status === 403) {
    redirect("/api/admin-session/logout?motivo=permissao")
  }
  if (!response.ok) throw new Error("Não foi possível carregar os dados administrativos.")
  return response.json() as Promise<T>
}

export function getAdminPosts() {
  return adminRequest<AdminPost[]>("/posts")
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const [posts, categories, tags, images] = await Promise.all([
    getAdminPosts(),
    adminRequest<BlogCategory[]>("/categories"),
    adminRequest<BlogTag[]>("/tags"),
    adminRequest<BlogImage[]>("/images"),
  ])
  return { posts, categories, tags, images }
}
