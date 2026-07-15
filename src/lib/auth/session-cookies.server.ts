import "server-only"

import type { NextResponse } from "next/server"

import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
  type LoginResponse,
} from "@/types/admin"

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
}

export function setSessionCookies(response: NextResponse, session: LoginResponse) {
  response.cookies.set({
    ...cookieOptions,
    name: ADMIN_ACCESS_COOKIE,
    value: session.accessToken,
    expires: new Date(session.expiresAtUtc),
  })
  response.cookies.set({
    ...cookieOptions,
    name: ADMIN_REFRESH_COOKIE,
    value: session.refreshToken,
    expires: new Date(session.refreshTokenExpiresAtUtc),
  })
}

export function clearSessionCookies(response: NextResponse) {
  for (const name of [ADMIN_ACCESS_COOKIE, ADMIN_REFRESH_COOKIE]) {
    response.cookies.set({
      ...cookieOptions,
      name,
      value: "",
      maxAge: 0,
    })
  }
}
