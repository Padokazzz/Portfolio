import { expect, test } from "@playwright/test"

import {
  descartaRascunhoPublicado,
  NEW_POST_DRAFT_KEY,
  postDraftKey,
  type DraftStorage,
} from "../../src/lib/post-draft"

/** Armazenamento falso que registra o que foi lido e o que foi apagado. */
function fakeStorage(initial?: string): DraftStorage & { removed: string[]; writes: Map<string, string> } {
  const writes = new Map<string, string>()
  const removed: string[] = []
  if (initial !== undefined) writes.set(NEW_POST_DRAFT_KEY, initial)
  return {
    removed,
    writes,
    getItem: (key) => writes.get(key) ?? null,
    removeItem: (key) => {
      removed.push(key)
      writes.delete(key)
    },
  }
}

test("a chave do post novo é a mesma que o formulário grava", () => {
  expect(postDraftKey()).toBe(NEW_POST_DRAFT_KEY)
  expect(postDraftKey(undefined)).toBe(NEW_POST_DRAFT_KEY)
  expect(postDraftKey("abc-123")).toBe("portfolio-post-draft:abc-123")
})

test("descarta o rascunho que virou o artigo publicado", () => {
  const storage = fakeStorage(JSON.stringify({ title: "Meu artigo", slug: "meu-artigo" }))

  expect(descartaRascunhoPublicado(storage, "meu-artigo")).toBe(true)
  expect(storage.removed).toEqual([NEW_POST_DRAFT_KEY])
  expect(storage.getItem(NEW_POST_DRAFT_KEY)).toBeNull()
})

test("preserva um rascunho de outro artigo (outra aba, ou um Back ao painel)", () => {
  const storage = fakeStorage(JSON.stringify({ title: "Rascunho novo", slug: "rascunho-novo" }))

  expect(descartaRascunhoPublicado(storage, "artigo-publicado-antes")).toBe(false)
  expect(storage.removed).toEqual([])
  expect(storage.getItem(NEW_POST_DRAFT_KEY)).not.toBeNull()
})

test("descarta um rascunho corrompido, que não dá para identificar", () => {
  const storage = fakeStorage("{isso nao e json")

  expect(descartaRascunhoPublicado(storage, "qualquer-slug")).toBe(true)
  expect(storage.removed).toEqual([NEW_POST_DRAFT_KEY])
})

test("descarta um rascunho sem slug, que também não dá para identificar", () => {
  const storage = fakeStorage(JSON.stringify({ title: "Sem slug" }))

  expect(descartaRascunhoPublicado(storage, "qualquer-slug")).toBe(true)
  expect(storage.removed).toEqual([NEW_POST_DRAFT_KEY])
})

test("não faz nada quando não há rascunho ou não há slug publicado", () => {
  const semRascunho = fakeStorage()
  expect(descartaRascunhoPublicado(semRascunho, "meu-artigo")).toBe(false)
  expect(semRascunho.removed).toEqual([])

  const comRascunho = fakeStorage(JSON.stringify({ slug: "meu-artigo" }))
  expect(descartaRascunhoPublicado(comRascunho, "")).toBe(false)
  expect(comRascunho.removed).toEqual([])
})
