import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { getApiBaseUrl } from "@/lib/api/config.server"
import {
  ADMIN_ROLE,
  ADMIN_SESSION_COOKIE,
  type AuthenticatedAdmin,
} from "@/types/admin"

export async function getSessionToken() {
  return (await cookies()).get(ADMIN_SESSION_COOKIE)?.value
}

export const requireAdmin = cache(async (): Promise<AuthenticatedAdmin> => {
  const token = await getSessionToken()
  if (!token) redirect("/_control/login")

  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })

  if (response.status === 401 || response.status === 403) {
    redirect("/api/admin-session/logout?motivo=sessao")
  }
  if (!response.ok) throw new Error("Não foi possível validar a sessão administrativa.")

  const user = (await response.json()) as AuthenticatedAdmin
  if (user.role !== ADMIN_ROLE) {
    redirect("/api/admin-session/logout?motivo=permissao")
  }
  return user
})
