import { NextResponse } from "next/server"

import { ADMIN_SESSION_COOKIE } from "@/types/admin"

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ message: "Requisição inválida." }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ message: "Requisição inválida." }, { status: 403 })
    }
  }

  const response = NextResponse.redirect(new URL("/_control/login", request.url), 303)
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
