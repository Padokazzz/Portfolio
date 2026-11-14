"use client"

import { useEffect } from "react"

import { useConsent } from "@/lib/consent/consent-manager"
import {
  isAdSenseClientIdValid,
  loadAdSenseScript,
} from "@/lib/monetization/adsense"

// Injetado em build: sem ID real da conta o componente não faz nada.
const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

/**
 * Carregamento único do script oficial do AdSense para anúncios
 * automáticos. Só injeta a tag com consentimento da categoria
 * "Publicidade" e ID válido da conta — mesma regra do GoogleAnalytics.
 * O script é inserido no máximo uma vez (loadAdSenseScript).
 */
export function AdSenseLoader() {
  const consent = useConsent()
  const advertisingGranted = consent?.advertising === true

  useEffect(() => {
    if (!isAdSenseClientIdValid(clientId)) return
    if (advertisingGranted) loadAdSenseScript(clientId)
  }, [advertisingGranted])

  return null
}
