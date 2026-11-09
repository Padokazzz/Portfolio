import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  type ConsentPreferences,
} from "./consent-types"

/**
 * Abstração mínima de storage para permitir testes unitários e evitar
 * dependência direta do localStorage em funções puras.
 */
export type ConsentStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

/**
 * Valida um registro persistido. Qualquer coisa ausente, inválida ou de
 * versão antiga da política é tratada como ausência de consentimento
 * (padrão seguro: categorias opcionais ficam desativadas).
 */
export function parseConsent(raw: string | null): ConsentPreferences | null {
  if (!raw) return null

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }

  if (!isRecord(data)) return null
  if (data.policyVersion !== CONSENT_POLICY_VERSION) return null
  if (typeof data.analytics !== "boolean") return null
  if (typeof data.advertising !== "boolean") return null
  if (typeof data.updatedAt !== "string" || Number.isNaN(Date.parse(data.updatedAt))) {
    return null
  }

  return {
    necessary: true,
    analytics: data.analytics,
    advertising: data.advertising,
    policyVersion: CONSENT_POLICY_VERSION,
    updatedAt: data.updatedAt,
  }
}

function defaultStorage(): ConsentStorage | undefined {
  if (typeof window === "undefined") return undefined
  try {
    return window.localStorage
  } catch {
    // Storage bloqueado (ex.: modo restrito): tratar como ausência.
    return undefined
  }
}

export function readStoredConsent(
  storage: ConsentStorage | undefined = defaultStorage(),
): ConsentPreferences | null {
  if (!storage) return null
  try {
    return parseConsent(storage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStoredConsent(
  consent: ConsentPreferences,
  storage: ConsentStorage | undefined = defaultStorage(),
): boolean {
  if (!storage) return false
  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
    return true
  } catch {
    return false
  }
}
