import { NextResponse } from "next/server"

import { isSameOriginRequest } from "@/lib/auth/request.server"
import { ADMIN_SESSION_COOKIE } from "@/types/admin"

function clearSession(request: Request) {
  const response = NextResponse.redirect(new URL("/_control/login", request.url), 303)
  response.headers.set("Cache-Control", "private, no-store")
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
  return response
}

export function GET(request: Request) {
  return clearSession(request)
}

export function POST(request: Request) {
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
