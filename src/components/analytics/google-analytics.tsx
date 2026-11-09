"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import {
  disableGoogleAnalytics,
  loadGoogleAnalytics,
  trackPageView,
} from "@/lib/analytics/analytics"
import { useConsent } from "@/lib/consent/consent-manager"

// Injetado em build: fica vazio e o componente não faz nada sem configuração real.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Integração opcional do GA4. Só carrega a tag com consentimento de
 * "Análise" e ID real configurado; mede navegações do App Router.
 */
export function GoogleAnalytics() {
  const consent = useConsent()
  const pathname = usePathname()
  const analyticsGranted = consent?.analytics === true

  useEffect(() => {
    if (!measurementId) return
    if (analyticsGranted) loadGoogleAnalytics(measurementId)
    else disableGoogleAnalytics(measurementId)
  }, [analyticsGranted])

  useEffect(() => {
    if (!measurementId || !analyticsGranted) return
    trackPageView(pathname)
  }, [analyticsGranted, pathname])

  return null
}
