"use client"

import { useEffect } from "react"

import { descartaRascunhoPublicado } from "@/lib/post-draft"

/**
 * Descarta o rascunho local do post novo depois de uma criação publicada.
 *
 * O PostForm só apagava essa chave ao abrir um post existente, e a criação
 * termina em `redirect()` — que lança exceção, de modo que o cliente nunca
 * recebe um sucesso com o qual pudesse limpar o armazenamento. Sem este
 * componente, o próximo "Novo post" recuperava o artigo recém-publicado
 * (título, slug, resumo e conteúdo).
 *
 * O sinal vem na URL (`?criado=<slug>`) e só apaga o rascunho cujo slug
 * confere com o publicado: um rascunho escrito depois — em outra aba ou
 * antes de um Back ao painel — tem outro slug e continua valendo.
 */
export function ClearNewPostDraft({ publishedSlug }: { publishedSlug: string | null }) {
  useEffect(() => {
    if (!publishedSlug) return
    descartaRascunhoPublicado(window.localStorage, publishedSlug)
  }, [publishedSlug])

  return null
}
