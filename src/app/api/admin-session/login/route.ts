import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config.server"
import { ADMIN_SESSION_COOKIE, type LoginResponse } from "@/types/admin"

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ message: "Requisição inválida." }, { status: 403 })
  }

  let credentials: { email?: unknown; password?: unknown }
  try {
    credentials = await request.json()
  } catch {
    return NextResponse.json({ message: "Credenciais inválidas." }, { status: 400 })
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return NextResponse.json({ message: "Credenciais inválidas." }, { status: 400 })
  }

  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    return NextResponse.json(
      { message: "E-mail ou senha inválidos." },
      { status: response.status === 429 ? 429 : 401 },
    )
  }

  const login = (await response.json()) as LoginResponse
  if (login.user.role !== "Admin") {
    return NextResponse.json({ message: "Acesso não autorizado." }, { status: 403 })
  }

  const result = NextResponse.json({ user: login.user })
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
