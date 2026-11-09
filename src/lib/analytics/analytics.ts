import { hasConsent } from "@/lib/consent/consent-manager"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

const GA_SCRIPT_ID = "google-analytics-script"

let activeMeasurementId: string | null = null

function isMeasurementIdValid(id: string | null | undefined): id is string {
  return typeof id === "string" && /^G-[A-Z0-9]+$/.test(id)
}

/**
 * Carrega o Google Analytics (modo básico de consentimento): a tag só é
 * injetada depois que o visitante aceitou a categoria "Análise".
 * `send_page_view` fica desligado porque as navegações do App Router são
 * medidas manualmente por trackPageView.
 */
export function loadGoogleAnalytics(measurementId: string): boolean {
  if (!isMeasurementIdValid(measurementId)) return false
  if (typeof window === "undefined") return false

  window[`ga-disable-${measurementId}`] = false

  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? []
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args)
    }
    window.gtag("js", new Date())
    window.gtag("config", measurementId, { send_page_view: false })
  }

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script")
    script.id = GA_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  activeMeasurementId = measurementId
  return true
}

/**
 * Bloqueia a tag após revogação do consentimento: a flag oficial
 * `ga-disable-*` impede novas requisições e o script é removido da página.
 */
export function disableGoogleAnalytics(measurementId: string): boolean {
  if (!isMeasurementIdValid(measurementId)) return false
  if (typeof window === "undefined") return false

  window[`ga-disable-${measurementId}`] = true
  document.getElementById(GA_SCRIPT_ID)?.remove()
  if (activeMeasurementId === measurementId) activeMeasurementId = null
  return true
}

export function trackPageView(pathname: string): void {
  if (!activeMeasurementId || !hasConsent("analytics")) return
  window.gtag?.("event", "page_view", {
    page_location: window.location.origin + pathname,
    page_path: pathname,
    page_title: document.title,
  })
}

/** Eventos mínimos úteis — nenhum parâmetro pessoal é enviado. */
export type TrackedEvent = "select_content" | "click_affiliate" | "contact_click"

export function trackEvent(
  name: TrackedEvent,
  params: Record<string, string | number | boolean> = {},
): void {
  if (!activeMeasurementId || !hasConsent("analytics")) return
  window.gtag?.("event", name, params)
}
