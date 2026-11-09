"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"

import { CookiePreferences } from "@/components/consent/cookie-preferences"
import {
  OPEN_PREFERENCES_EVENT,
  saveConsent,
  useConsent,
} from "@/lib/consent/consent-manager"

// Gate de hidratação: false no servidor, true no cliente após a hidratação.
// Evita mismatch de SSR sem forçar re-render síncrono dentro de efeito.
function subscribeNoop() {
  return () => {}
}

/**
 * Banner de consentimento. Não bloqueia o conteúdo: fica fixo no rodapé
 * apenas na primeira visita (enquanto não houver escolha registrada).
 * As preferências podem ser reabertas pelo rodapé a qualquer momento.
 */
export function CookieConsent() {
  const consent = useConsent()
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true)
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
  }, [])

  const showBanner = mounted && consent === null

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label="Preferências de cookies"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d111b]/95 px-4 py-4 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              Este site usa cookies necessários para funcionar. Com o seu
              consentimento, também podemos usar cookies de{" "}
              <strong className="font-medium text-foreground">análise</strong> e
              de{" "}
              <strong className="font-medium text-foreground">publicidade</strong>
              . Nenhuma categoria opcional é ativada sem a sua escolha.{" "}
              <Link
                href="/politica-de-cookies"
                className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Política de cookies
              </Link>
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Personalizar
              </button>
              <button
                type="button"
                onClick={() => saveConsent({ analytics: false, advertising: false })}
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Rejeitar não essenciais
              </button>
              <button
                type="button"
                onClick={() => saveConsent({ analytics: true, advertising: true })}
                className="rounded-lg bg-yellow-300 px-4 py-2 text-xs font-semibold text-[#191713] transition hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      )}

      <CookiePreferences open={preferencesOpen} onOpenChange={setPreferencesOpen} />
    </>
  )
}
