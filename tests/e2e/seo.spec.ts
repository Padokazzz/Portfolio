import { expect, test } from "@playwright/test"

/**
 * Rede de segurança para a indexação no Search Console.
 *
 * Os dois status que aparecem no relatório do Google ("Página com
 * redirecionamento" e "Rastreada, mas não indexada") na maioria das vezes
 * nascem de regressão silenciosa: um canonical herdado do layout raiz, uma
 * página de blog inexistente respondendo 200 (soft-404) ou um redirect que
 * deixou de ser permanente. Estes testes falham antes do deploy se um
 * desses sinais voltar.
 */

const SITE = "https://leonardopadilha.com"

const paginasIndexaveis = [
  "/",
  "/projetos",
  "/projetos/leilao-online",
  "/blog",
  "/timeline",
  "/uses",
  "/contato",
  "/politica-de-privacidade",
  "/politica-de-cookies",
  "/aviso-de-afiliados",
]

const paginasDemo = ["/demo/fintrack", "/demo/ludare", "/demo/minecraft-panel"]

function canonicalEsperado(path: string) {
  return `${SITE}${path === "/" ? "" : path}`
}

for (const path of paginasIndexaveis) {
  test(`página ${path} é indexável, com canonical e h1 próprios`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status(), `${path} deve responder 200`).toBe(200)

    const robots = await page.locator('meta[name="robots"]').getAttribute("content")
    expect(robots, `${path} precisa de index, follow`).toContain("index")
    expect(robots, `${path} não pode ter noindex`).not.toContain("noindex")

    await expect(
      page.locator('link[rel="canonical"]'),
      `${path} precisa declarar o próprio canonical`,
    ).toHaveAttribute("href", canonicalEsperado(path))

    await expect(
      page.locator('link[rel="canonical"]'),
      `${path} não pode canonicalizar para outro endereço`,
    ).not.toHaveAttribute("href", `${SITE}/`)
    expect(await page.locator("h1").count(), `${path} deve ter exatamente um h1`).toBe(1)
    expect(await page.title()).not.toBe("")
  })
}

test("slug de blog inexistente responde 404 e não 200 (anti soft-404)", async ({ page }) => {
  for (const path of [
    "/blog/este-post-nao-existe-abc123",
    "/rota-que-nao-existe-abc123",
  ]) {
    const response = await page.goto(path)
    expect(response?.status(), `${path} deve responder 404`).toBe(404)
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  }
})

test("páginas de demo são noindex e não repetem o título da home", async ({ page }) => {
  await page.goto("/")
  const tituloHome = await page.title()

  for (const path of paginasDemo) {
    const response = await page.goto(path)
    expect(response?.status(), `${path} deve responder 200`).toBe(200)

    const robots = await page.locator('meta[name="robots"]').getAttribute("content")
    expect(robots, `${path} precisa ser noindex`).toContain("noindex")

    const titulo = await page.title()
    expect(titulo, `${path} não pode repetir o título da home`).not.toBe(tituloHome)
    expect(titulo.length).toBeGreaterThan(0)
  }
})

test("redirecionamentos internos são permanentes (308) e preservam o destino", async ({
  request,
}) => {
  const casos: Array<{ de: string; para: string }> = [
    { de: "/blog/", para: "/blog" },
    { de: "/sobre", para: "/#experiencia" },
    { de: "/experimentos", para: "/" },
    { de: "/experimentos/fintrack", para: "/demo/fintrack" },
  ]

  for (const { de, para } of casos) {
    const response = await request.get(de, { maxRedirects: 0 })
    expect(response.status(), `${de} deve redirecionar com 308`).toBe(308)
    expect(response.headers().location, `${de} deve apontar para ${para}`).toBe(para)
  }
})

test("domínio antigo redireciona tudo para o domínio oficial", async ({ request }) => {
  const response = await request.get("/contato", {
    maxRedirects: 0,
    headers: { host: "padilhadev.vercel.app" },
  })

  expect(response.status()).toBe(308)
  expect(response.headers().location).toBe(`${SITE}/contato`)
})

test("sitemap anuncia somente o domínio canônico", async ({ request }) => {
  const robotsTxt = await (await request.get("/robots.txt")).text()
  expect(robotsTxt).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  expect(robotsTxt).toContain("Allow: /")

  const sitemap = await (await request.get("/sitemap.xml")).text()
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

  expect(locs.length).toBeGreaterThan(0)
  for (const loc of locs) {
    expect(loc, `${loc} precisa ser https`).toMatch(/^https:\/\//)
    expect(loc, `${loc} não pode usar www`).not.toContain("://www.")
  }

  for (const path of paginasIndexaveis) {
    expect(sitemap, `${path} precisa estar no sitemap`).toContain(canonicalEsperado(path))
  }
})

test("artigos publicados são rastreáveis com canonical próprio", async ({ request, page }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text()
  const artigos = [...sitemap.matchAll(/<loc>(https:\/\/leonardopadilha\.com\/blog\/[^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .slice(0, 3)

  expect(artigos.length, "o sitemap deve anunciar ao menos um artigo").toBeGreaterThan(0)

  for (const url of artigos) {
    const path = new URL(url).pathname
    const response = await page.goto(path)
    expect(response?.status(), `${path} deve responder 200`).toBe(200)

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url)
    expect(await page.locator("h1").count()).toBe(1)
    expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("index")
  }
})
