import type { BrowserContext, Page } from "@playwright/test"
import { expect, test } from "@playwright/test"

import { ADMIN_ACCESS_COOKIE } from "../../src/types/admin"
import { NEW_POST_DRAFT_KEY } from "../../src/lib/post-draft"

/**
 * Regressão do bug: "publico um artigo novo e o próximo 'Novo post' abre o
 * artigo anterior".
 *
 * Causa: o PostForm grava o rascunho no localStorage e só o apagava ao
 * abrir um post existente. A criação termina em `redirect()`, que lança
 * exceção — o cliente nunca via um sucesso com o qual limpasse a chave
 * "new" —, então o formulário de um artigo recém-publicado ficava guardado
 * e era restaurado na visita seguinte.
 *
 * Rode com: `npm run test:admin` (usa a API falsa de tests/admin/mock-api.mjs).
 */

async function entrarNoPainel(context: BrowserContext) {
  await context.addCookies([
    { name: ADMIN_ACCESS_COOKIE, value: "token-de-teste", domain: "127.0.0.1", path: "/" },
  ])
}

async function escreverArtigo(page: Page) {
  await page.goto("/_control/painel/posts/novo")
  await page.getByPlaceholder("Título da publicação").fill("Artigo de teste de rascunho")
  await page.getByPlaceholder("Uma frase curta para apresentar o artigo").fill(
    "Resumo do artigo de teste.",
  )
  await page.locator('[contenteditable="true"]').click()
  await page.keyboard.type("Corpo do artigo de teste.")
  // Categorias ficam dentro de um <details> fechado por padrão.
  await page.locator("summary", { hasText: "Categorias e tags" }).click()
  await page.locator("label", { hasText: "Programação" }).click()
}

test("publicar descarta o rascunho local do post novo", async ({ page, context }) => {
  await entrarNoPainel(context)

  await escreverArtigo(page)
  await expect(
    page.getByRole("button", { name: "Publicar", exact: true }),
    "formulário completo: habilita a publicação",
  ).toBeEnabled()

  await page.getByRole("button", { name: "Publicar", exact: true }).click()
  await expect(page).toHaveURL(/\/_control\/painel\/posts(\?|$)/)

  // O rascunho do post criado não pode sobreviver à publicação.
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), NEW_POST_DRAFT_KEY))
    .toBeNull()

  // E o próximo "Novo post" precisa abrir em branco.
  await page.goto("/_control/painel/posts/novo")
  await expect(page.getByPlaceholder("Título da publicação")).toHaveValue("")
  await expect(page.getByPlaceholder("Uma frase curta para apresentar o artigo")).toHaveValue("")
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), NEW_POST_DRAFT_KEY))
    .toBeNull()
})

test("rascunho inacabado continua sendo recuperado (rede de segurança)", async ({
  page,
  context,
}) => {
  await entrarNoPainel(context)

  // Usuário escreveu um pouco, saiu sem salvar e voltou depois.
  await page.goto("/_control/painel/posts/novo")
  await page.evaluate(
    (key) =>
      window.localStorage.setItem(
        key,
        JSON.stringify({
          title: "Rascunho em andamento",
          slug: "rascunho-em-andamento",
          excerpt: "Resumo guardado localmente.",
          contentHtml: "<p>Conteúdo guardado localmente.</p>",
          categoryIds: [],
          tagIds: [],
        }),
      ),
    NEW_POST_DRAFT_KEY,
  )
  await page.goto("/_control/painel/posts")
  await page.goto("/_control/painel/posts/novo")

  await expect(page.getByPlaceholder("Título da publicação")).toHaveValue("Rascunho em andamento")
  await expect(page.getByPlaceholder("Uma frase curta para apresentar o artigo")).toHaveValue(
    "Resumo guardado localmente.",
  )
})

test("um rascunho escrito depois da publicação não é apagado por um Back", async ({
  page,
  context,
}) => {
  await entrarNoPainel(context)

  await escreverArtigo(page)
  await page.getByRole("button", { name: "Publicar", exact: true }).click()
  await expect(page).toHaveURL(/\/_control\/painel\/posts(\?|$)/)

  // Começa outro artigo e volta com o botão voltar do navegador.
  await page.goto("/_control/painel/posts/novo")
  await page.getByPlaceholder("Título da publicação").fill("Segundo artigo")
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), NEW_POST_DRAFT_KEY))
    .not.toBeNull()

  await page.goBack()
  await expect(page).toHaveURL(/\/_control\/painel\/posts/)
  await page.goForward()
  await expect(page.getByPlaceholder("Título da publicação")).toHaveValue("Segundo artigo")
})
