import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { isSameOriginRequest } from "@/lib/auth/request.server"
import { clearSessionCookies } from "@/lib/auth/session-cookies.server"
import { ADMIN_REFRESH_COOKIE } from "@/types/admin"

async function clearSession(request: Request) {
  const refreshToken = (await cookies()).get(ADMIN_REFRESH_COOKIE)?.value

  if (refreshToken) {
    try {
      await fetch(`${getApiBaseUrl()}/api/v1/auth/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      })
    } catch {
      // Local credentials are still removed if the backend is unavailable.
    }
  }

  const response = NextResponse.redirect(new URL("/_control/login", request.url), 303)
  response.headers.set("Cache-Control", "private, no-store")
  clearSessionCookies(response)
  return response
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    const response = NextResponse.json(
      { message: "Requisição inválida." },
      { status: 403 },
    )
    response.headers.set("Cache-Control", "private, no-store")
    return response
  }
  return clearSession(request)
}
