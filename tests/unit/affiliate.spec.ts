import { expect, test } from "@playwright/test"

import {
  annotateAffiliateLinks,
  containsAffiliateLinks,
  isAffiliateHost,
} from "../../src/lib/monetization/affiliate"

const HOSTS = ["amazon.com.br"]

test("annotateAffiliateLinks adiciona rel sponsored aos links de afiliado", () => {
  const html =
    '<p><a href="https://www.amazon.com.br/produto">comprar</a></p>'
  const result = annotateAffiliateLinks(html, HOSTS)

  expect(result).toContain('rel="sponsored nofollow"')
  expect(result).toContain('href="https://www.amazon.com.br/produto"')
})

test("annotateAffiliateLinks preserva rel existente sem duplicar sponsored", () => {
  const withRel = '<a href="https://amazon.com.br/x" rel="noopener">x</a>'
  const annotated = annotateAffiliateLinks(withRel, HOSTS)
  expect(annotated).toContain('rel="noopener sponsored nofollow"')

  const alreadySponsored = '<a href="https://amazon.com.br/x" rel="sponsored">x</a>'
  expect(annotateAffiliateLinks(alreadySponsored, HOSTS)).toBe(alreadySponsored)
})

test("annotateAffiliateLinks não altera links editoriais comuns", () => {
  const html = '<a href="https://leonardopadilha.com/blog">blog</a>'
  expect(annotateAffiliateLinks(html, HOSTS)).toBe(html)
})

test("annotateAffiliateLinks sem hosts configurados devolve o HTML intacto", () => {
  const html = '<a href="https://amazon.com.br/x">x</a>'
  expect(annotateAffiliateLinks(html, [])).toBe(html)
})

test("annotateAffiliateLinks ignora hrefs relativos e inválidos", () => {
  const html = '<a href="/contato">contato</a><a href="javascript:alert(1)">x</a>'
  expect(annotateAffiliateLinks(html, HOSTS)).toBe(html)
})

test("containsAffiliateLinks detecta por host configurado", () => {
  expect(
    containsAffiliateLinks('<a href="https://smile.amazon.com.br/p">p</a>', HOSTS),
  ).toBe(true)
  expect(
    containsAffiliateLinks('<a href="https://exemplo.com/p">p</a>', HOSTS),
  ).toBe(false)
})

test("containsAffiliateLinks detecta rel sponsored mesmo sem hosts", () => {
  expect(
    containsAffiliateLinks('<a href="https://x.com/p" rel="sponsored">p</a>', []),
  ).toBe(true)
  expect(containsAffiliateLinks('<a href="https://x.com/p">p</a>', [])).toBe(false)
})

test("isAffiliateHost trata www e subdomínios, sem falso positivo por sufixo", () => {
  expect(isAffiliateHost("www.amazon.com.br", HOSTS)).toBe(true)
  expect(isAffiliateHost("smile.amazon.com.br", HOSTS)).toBe(true)
  expect(isAffiliateHost("naoamazon.com.br", HOSTS)).toBe(false)
  expect(isAffiliateHost("", HOSTS)).toBe(false)
})
