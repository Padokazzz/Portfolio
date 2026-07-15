import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { ADMIN_SESSION_COOKIE } from "@/types/admin"

export function proxy(request: NextRequest) {
  if (!request.cookies.has(ADMIN_SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/_control/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/_control/painel/:path*"],
}
