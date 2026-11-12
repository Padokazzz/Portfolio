/**
 * Chaves e regras do rascunho local do formulário de post.
 *
 * O PostForm grava no localStorage o que está sendo escrito, para não
 * perder trabalho se a aba fechar. O rascunho de um post que ainda não
 * existe usa a chave fixa "new" — e é justamente ele que precisa ser
 * descartado quando um post é publicado. Se não for, o próximo "Novo post"
 * reabre o artigo que acabou de ser publicado.
 */
export const NEW_POST_DRAFT_KEY = "portfolio-post-draft:new"

/** Chave do rascunho de um post. Sem id, é a chave do post novo. */
export function postDraftKey(postId?: string) {
  return `portfolio-post-draft:${postId ?? "new"}`
}

/** Só o que o teste precisa poder ler e apagar do armazenamento. */
export type DraftStorage = Pick<Storage, "getItem" | "removeItem">

/**
 * Descarta o rascunho do post novo quando ele é o mesmo que acabou de ser
 * publicado.
 *
 * A comparação é por slug, e não por data: o rascunho é gravado no navegador
 * e o sinal de publicação vem do servidor, então qualquer relógio seria
 * frágil — e uma aba escrevendo um artigo enquanto outra publica não pode
 * perder o trabalho dela. Um rascunho corrompido ou sem slug é descartado,
 * porque não há como identificá-lo.
 *
 * @returns `true` se um rascunho foi descartado.
 */
export function descartaRascunhoPublicado(storage: DraftStorage, slugPublicado: string): boolean {
  if (!slugPublicado) return false

  const stored = storage.getItem(NEW_POST_DRAFT_KEY)
  if (!stored) return false

  try {
    const draft = JSON.parse(stored) as { slug?: unknown }
    if (typeof draft.slug === "string" && draft.slug && draft.slug !== slugPublicado) {
      return false
    }
  } catch {
    // Rascunho ilegível: não dá para saber de quem é, então descarta.
  }

  storage.removeItem(NEW_POST_DRAFT_KEY)
  return true
}
