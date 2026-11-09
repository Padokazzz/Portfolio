/**
 * Utilitários de links de afiliado (lado servidor e cliente).
 *
 * AFFILIATE_HOSTS é preenchido pelo proprietário do site no momento em que
 * ele aderir a programas de afiliado (ex.: "amazon.com.br"). Mantido vazio
 * enquanto não houver nenhum programa ativo — sem programas, nenhuma
 * divulgação é exibida e nenhum link é reescrito.
 *
 * As funções aceitam `hosts` explícito apenas para facilitar testes; no
 * código do site usa-se o padrão (AFFILIATE_HOSTS).
 */
export const AFFILIATE_HOSTS: readonly string[] = []

export function isAffiliateHost(
  hostname: string,
  hosts: readonly string[] = AFFILIATE_HOSTS,
): boolean {
  const normalized = hostname.toLowerCase().replace(/^www\./, "")
  return hosts.some((candidate) => {
    const host = candidate.toLowerCase().replace(/^www\./, "")
    return normalized === host || normalized.endsWith(`.${host}`)
  })
}

const ANCHOR_TAG_PATTERN = /<a\b([^>]*)>/gi
const HREF_PATTERN = /href\s*=\s*"([^"]*)"/i
const REL_PATTERN = /rel\s*=\s*"([^"]*)"/i

/**
 * Reescreve âncoras cujo destino pertence a `hosts` adicionando
 * `rel="sponsored nofollow"`, exigência editorial e de SEO para links
 * comerciais. Deve ser aplicado depois da sanitização do HTML.
 */
export function annotateAffiliateLinks(
  html: string,
  hosts: readonly string[] = AFFILIATE_HOSTS,
): string {
  if (hosts.length === 0) return html

  return html.replace(ANCHOR_TAG_PATTERN, (tag, attrs: string) => {
    const hrefMatch = HREF_PATTERN.exec(attrs)
    if (!hrefMatch) return tag

    let host: string
    try {
      host = new URL(hrefMatch[1]).host
    } catch {
      return tag
    }
    if (!isAffiliateHost(host, hosts)) return tag

    const relMatch = REL_PATTERN.exec(attrs)
    if (relMatch) {
      if (/\bsponsored\b/i.test(relMatch[1])) return tag
      return `<a${attrs.replace(REL_PATTERN, `rel="${relMatch[1]} sponsored nofollow"`)}>`
    }
    return `<a${attrs} rel="sponsored nofollow">`
  })
}

/**
 * Detecta se um HTML contém links de afiliado: por atributo `rel="sponsored"`
 * já presente ou por destino pertencer a `hosts`.
 */
export function containsAffiliateLinks(
  html: string,
  hosts: readonly string[] = AFFILIATE_HOSTS,
): boolean {
  if (/\brel\s*=\s*"[^"]*\bsponsored\b/i.test(html)) return true
  if (hosts.length === 0) return false

  for (const match of html.matchAll(/href\s*=\s*"([^"]*)"/gi)) {
    try {
      if (isAffiliateHost(new URL(match[1]).host, hosts)) return true
    } catch {
      // href relativo ou inválido: ignora.
    }
  }
  return false
}
