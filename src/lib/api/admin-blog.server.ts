import "server-only"

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

  if (response.status === 401) throw new Error("Sessão administrativa expirada.")
  if (response.status === 403) throw new Error("Acesso administrativo negado.")
  if (!response.ok) throw new Error("Não foi possível carregar os dados administrativos.")
  return response.json() as Promise<T>
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const [posts, categories, tags, images] = await Promise.all([
    adminRequest<AdminPost[]>("/posts"),
    adminRequest<BlogCategory[]>("/categories"),
    adminRequest<BlogTag[]>("/tags"),
    adminRequest<BlogImage[]>("/images"),
  ])
  return { posts, categories, tags, images }
}
