import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { isSameOriginRequest } from "@/lib/auth/request.server"
import {
  ADMIN_ROLE,
  ADMIN_SESSION_COOKIE,
  type LoginResponse,
} from "@/types/admin"

function privateJson(body: object, init?: ResponseInit) {
  const response = NextResponse.json(body, init)
  response.headers.set("Cache-Control", "private, no-store")
  return response
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return privateJson({ message: "Requisição inválida." }, { status: 403 })
  }

  let credentials: { email?: unknown; password?: unknown }
  try {
    credentials = await request.json()
  } catch {
    return privateJson({ message: "Credenciais inválidas." }, { status: 400 })
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return privateJson({ message: "Credenciais inválidas." }, { status: 400 })
  }

  let response: Response
  try {
    response = await fetch(`${getApiBaseUrl()}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
      cache: "no-store",
    })
  } catch {
    return privateJson({ message: "Serviço temporariamente indisponível." }, { status: 503 })
  }

  if (!response.ok) {
    return privateJson(
      { message: "E-mail ou senha inválidos." },
      { status: response.status === 429 ? 429 : 401 },
    )
  }

  let login: LoginResponse
  try {
    login = (await response.json()) as LoginResponse
  } catch {
    return privateJson({ message: "Serviço temporariamente indisponível." }, { status: 502 })
  }
  if (
    !login.accessToken ||
    !login.expiresAtUtc ||
    !login.user ||
    login.user.role !== ADMIN_ROLE
  ) {
    return privateJson({ message: "Acesso não autorizado." }, { status: 403 })
  }

  const result = privateJson({ user: login.user })
  result.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: login.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(login.expiresAtUtc),
  })
  return result
}
