"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const REFRESH_INTERVAL_MS = 10 * 60 * 1000

export function SessionRefresh({ immediate = false }: { immediate?: boolean }) {
  const router = useRouter()

  useEffect(() => {
    async function refresh() {
      const response = await fetch("/api/admin-session/refresh", {
        method: "POST",
      })
      if (!response.ok) {
        window.location.assign("/_control/login?motivo=sessao")
        return
      }
      if (immediate) router.replace("/_control/painel")
    }

    if (immediate) void refresh()
    const interval = window.setInterval(() => void refresh(), REFRESH_INTERVAL_MS)
    return () => window.clearInterval(interval)
  }, [immediate, router])

  return immediate ? (
    <p className="text-sm text-muted-foreground">Renovando sessão…</p>
  ) : null
}
