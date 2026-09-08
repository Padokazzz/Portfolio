import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { isSameOriginRequest } from "@/lib/auth/request.server"
import {
  clearSessionCookies,
  setSessionCookies,
} from "@/lib/auth/session-cookies.server"
import {
  ADMIN_REFRESH_COOKIE,
  ADMIN_ROLE,
  type LoginResponse,
} from "@/types/admin"

function failure(status: number, clearCredentials = true) {
  const response = NextResponse.json(
    { message: "Não foi possível renovar a sessão." },
    { status },
  )
  response.headers.set("Cache-Control", "private, no-store")
  if (clearCredentials) clearSessionCookies(response)
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
  const refreshToken = (await cookies()).get(ADMIN_REFRESH_COOKIE)?.value
  if (!refreshToken) return failure(401)

  let response: Response
  try {
    response = await fetch(`${getApiBaseUrl()}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    })
  } catch {
    return failure(503, false)
  }
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return failure(response.status)
    }
    return failure(response.status === 429 ? 429 : 502, false)
  }

  let session: LoginResponse
  try {
    session = (await response.json()) as LoginResponse
  } catch {
    return failure(502, false)
  }
  if (
    !session.accessToken ||
    !session.refreshToken ||
    !session.expiresAtUtc ||
    !session.refreshTokenExpiresAtUtc ||
    session.user?.role !== ADMIN_ROLE
  ) {
    return failure(403)
  }

  const result = NextResponse.json({ user: session.user })
  result.headers.set("Cache-Control", "private, no-store")
  setSessionCookies(result, session)
  return result
}
