"use client"

import { OPEN_PREFERENCES_EVENT } from "@/lib/consent/consent-manager"

/** Botão do rodapé que reabre as preferências de cookies a qualquer momento. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT))}
      className="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Preferências de cookies
    </button>
  )
}
