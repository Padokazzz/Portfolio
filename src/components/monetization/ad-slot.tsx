"use client"

import { useEffect } from "react"

import { useConsent } from "@/lib/consent/consent-manager"
import {
  isAdSenseClientIdValid,
  loadAdSenseScript,
} from "@/lib/monetization/adsense"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type AdSlotProps = {
  /** ID do bloco (slot) criado no painel do AdSense. */
  slotId?: string
  className?: string
  /** Altura mínima reservada quando o anúncio está ativo (evita CLS). */
  minHeight?: number
}

// Identificador real da conta, injetado em build. Sem ele (aprovação ainda
// não obtida/ID não configurado), o componente não renderiza absolutamente nada.
const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

/**
 * Espaço publicitário reutilizável. Desativado por padrão: só renderiza
 * quando há ID real da conta, slot configurado E consentimento de
 * publicidade. O consentimento é consultado no estado centralizado — o
 * componente não decide por conta própria.
 */
export function AdSlot({ slotId, className, minHeight = 280 }: AdSlotProps) {
  const consent = useConsent()
  const enabled =
    isAdSenseClientIdValid(clientId) && Boolean(slotId) && consent?.advertising === true

  useEffect(() => {
    if (!enabled || !isAdSenseClientIdValid(clientId)) return
    if (!loadAdSenseScript(clientId)) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      // Falha de carregamento do AdSense não deve quebrar a página.
    }
  }, [enabled, slotId])

  if (!enabled || !slotId) return null

  return (
    <aside
      aria-label="Publicidade"
      className={`min-w-0 ${className ?? ""}`}
      data-testid="ad-slot"
    >
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Publicidade
      </p>
      <ins
        className="adsbygoogle block w-full overflow-hidden rounded-lg border border-white/10 bg-black/20"
        style={{ minHeight }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
