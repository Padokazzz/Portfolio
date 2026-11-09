"use client"

import { useSyncExternalStore } from "react"

import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  type ConsentPreferences,
  type OptionalConsentCategory,
} from "./consent-types"
import { parseConsent, readStoredConsent, writeStoredConsent } from "./consent-storage"

/** Evento disparado (janela) quando o consentimento muda. */
export const CONSENT_CHANGE_EVENT = "portfolio-consent-change"

/** Evento (janela) pedido pelo rodapé para reabrir as preferências. */
export const OPEN_PREFERENCES_EVENT = "portfolio-open-cookie-preferences"

let snapshot: ConsentPreferences | null | undefined
const listeners = new Set<() => void>()

function refreshSnapshot() {
  snapshot = readStoredConsent()
}

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  if (typeof window !== "undefined" && snapshot === undefined) refreshSnapshot()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): ConsentPreferences | null {
  if (snapshot === undefined) refreshSnapshot()
  return snapshot ?? null
}

function getServerSnapshot(): ConsentPreferences | null {
  return null
}

// Sincroniza a preferência entre abas do mesmo navegador.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== CONSENT_STORAGE_KEY) return
    snapshot = parseConsent(event.newValue)
    emit()
  })
}

/**
 * Hook central de consentimento. Retorna `null` enquanto não houver escolha
 * registrada (também no servidor, para evitar flash de conteúdo condicional).
 */
export function useConsent(): ConsentPreferences | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function getConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null
  return getSnapshot()
}

export function hasConsent(category: OptionalConsentCategory): boolean {
  return getConsent()?.[category] === true
}

/**
 * Persiste a escolha do visitante. Não coleta dados pessoais: apenas as
 * categorias, a versão da política e o horário da decisão.
 */
export function saveConsent(input: {
  analytics: boolean
  advertising: boolean
}): ConsentPreferences {
  const consent: ConsentPreferences = {
    necessary: true,
    analytics: input.analytics,
    advertising: input.advertising,
    policyVersion: CONSENT_POLICY_VERSION,
    updatedAt: new Date().toISOString(),
  }

  writeStoredConsent(consent)
  snapshot = consent
  emit()

  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }),
  )

  return consent
}
