import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { ADMIN_ACCESS_COOKIE, ADMIN_REFRESH_COOKIE } from "@/types/admin"

export function proxy(request: NextRequest) {
  if (!request.cookies.has(ADMIN_ACCESS_COOKIE)) {
    if (request.cookies.has(ADMIN_REFRESH_COOKIE)) {
      return NextResponse.redirect(new URL("/_control/renovar", request.url))
    }
    return NextResponse.redirect(new URL("/_control/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/_control/painel/:path*"],
}
