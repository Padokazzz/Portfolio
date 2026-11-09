/**
 * Versão do registro de consentimento. Deve ser atualizada sempre que a
 * política de cookies mudar de forma relevante: registros gravados com uma
 * versão antiga são tratados como ausência de consentimento.
 */
export const CONSENT_POLICY_VERSION = "2026-11-09"

export const CONSENT_STORAGE_KEY = "leonardopadilha-cookie-consent"

/** Categorias opcionais: só existem com escolha explícita do visitante. */
export type OptionalConsentCategory = "analytics" | "advertising"

export type ConsentPreferences = {
  necessary: true
  analytics: boolean
  advertising: boolean
  policyVersion: string
  updatedAt: string
}
