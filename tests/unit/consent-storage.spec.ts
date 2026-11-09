import { expect, test } from "@playwright/test"

import {
  parseConsent,
  readStoredConsent,
  writeStoredConsent,
  type ConsentStorage,
} from "../../src/lib/consent/consent-storage"
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
} from "../../src/lib/consent/consent-types"

function fakeStorage(initial: Record<string, string> = {}) {
  const map = new Map(Object.entries(initial))
  const storage: ConsentStorage & { dump(): Record<string, string> } = {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value)
    },
    dump: () => Object.fromEntries(map),
  }
  return storage
}

const validRecord = {
  necessary: true,
  analytics: true,
  advertising: false,
  policyVersion: CONSENT_POLICY_VERSION,
  updatedAt: "2026-11-09T12:00:00.000Z",
}

test("parseConsent aceita um registro válido", () => {
  expect(parseConsent(JSON.stringify(validRecord))).toEqual(validRecord)
})

test("parseConsent rejeita JSON inválido ou ausente", () => {
  expect(parseConsent(null)).toBeNull()
  expect(parseConsent("")).toBeNull()
  expect(parseConsent("{quebrado")).toBeNull()
  expect(parseConsent("null")).toBeNull()
  expect(parseConsent('"string"')).toBeNull()
  expect(parseConsent("42")).toBeNull()
})

test("parseConsent rejeita versão de política diferente (padrão seguro)", () => {
  expect(
    parseConsent(JSON.stringify({ ...validRecord, policyVersion: "0.0.0" })),
  ).toBeNull()
})

test("parseConsent rejeita tipos inválidos e data inválida", () => {
  expect(parseConsent(JSON.stringify({ ...validRecord, analytics: "sim" }))).toBeNull()
  expect(parseConsent(JSON.stringify({ ...validRecord, advertising: 1 }))).toBeNull()
  expect(
    parseConsent(JSON.stringify({ ...validRecord, updatedAt: "data-invalida" })),
  ).toBeNull()
  expect(parseConsent(JSON.stringify({ ...validRecord, updatedAt: 7 }))).toBeNull()
})

test("writeStoredConsent persiste e readStoredConsent relê", () => {
  const storage = fakeStorage()

  const written = writeStoredConsent(
    {
      necessary: true,
      analytics: false,
      advertising: true,
      policyVersion: CONSENT_POLICY_VERSION,
      updatedAt: "2026-11-09T12:00:00.000Z",
    },
    storage,
  )

  expect(written).toBe(true)
  expect(storage.dump()[CONSENT_STORAGE_KEY]).toContain("advertising")
  expect(readStoredConsent(storage)).toMatchObject({
    analytics: false,
    advertising: true,
  })
})

test("readStoredConsent retorna null para registro corrompido, alheio ou ausente", () => {
  expect(readStoredConsent(fakeStorage())).toBeNull()
  expect(
    readStoredConsent(fakeStorage({ [CONSENT_STORAGE_KEY]: "{corrompido" })),
  ).toBeNull()
  expect(
    readStoredConsent(
      fakeStorage({
        [CONSENT_STORAGE_KEY]: JSON.stringify({
          ...validRecord,
          policyVersion: "antiga",
        }),
      }),
    ),
  ).toBeNull()
})
