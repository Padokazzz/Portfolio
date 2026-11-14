/**
 * URLs da The Codefy com UTM centralizadas.
 *
 * Todo link do portfólio para o site do estúdio passa por aqui: a origem do
 * tráfego fica fixa (`utm_source=portfolio`, `utm_medium=referral`) e a
 * posição do link vira o `utm_campaign`, para o analytics separar bloco da
 * home, menu, rodapé, experiência e projetos sem repetir string em cada
 * componente.
 */

/** Domínio canônico do estúdio. */
export const THE_CODEFY_BASE_URL = "https://www.thecodefy.com"

/** Posição do link no portfólio — vira o `utm_campaign` da URL. */
export type CodefyCampaign =
  | "bloco-home"
  | "header"
  | "footer"
  | "experiencia"
  | "projetos"

/**
 * Monta a URL da The Codefy aplicando os parâmetros UTM.
 *
 * @param campaign posição do link no portfólio (`utm_campaign`).
 * @param path caminho do estúdio (`/contato`) ou URL já absoluta do próprio
 *   estúdio — normalizada para o domínio canônico.
 */
export function buildCodefyUrl(
  campaign: CodefyCampaign,
  path: string = "/",
): string {
  const url = new URL(path, THE_CODEFY_BASE_URL)

  // Normaliza protocolo e host para o domínio canônico: todas as posições
  // aparecem com o mesmo host no relatório, mesmo que o link original use
  // a variante sem "www".
  url.protocol = "https:"
  url.hostname = "www.thecodefy.com"

  url.searchParams.set("utm_source", "portfolio")
  url.searchParams.set("utm_medium", "referral")
  url.searchParams.set("utm_campaign", campaign)

  return url.toString()
}

/**
 * Atributos de navegação dos links para a The Codefy: abrem em nova aba e,
 * por serem domínio próprio, usam apenas `noopener noreferrer` (sem
 * `nofollow`, `sponsored` ou `noreferrer` de terceiros).
 */
export const CODEFY_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const
