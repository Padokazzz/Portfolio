import { expect, test, type Page } from "@playwright/test"

const STORAGE_KEY = "leonardopadilha-cookie-consent"
const BANNER_NAME = "Preferências de cookies"

function banner(page: Page) {
  return page.getByRole("region", { name: BANNER_NAME })
}

async function readStoredConsent(page: Page) {
  const raw = await page.evaluate(
    (key) => window.localStorage.getItem(key),
    STORAGE_KEY,
  )
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
}

test("primeira visita exibe o banner com opções igualmente acessíveis", async ({ page }) => {
  await page.goto("/")
  await expect(banner(page)).toBeVisible()
  await expect(banner(page).getByRole("button", { name: "Personalizar" })).toBeVisible()
  await expect(banner(page).getByRole("button", { name: "Rejeitar não essenciais" })).toBeVisible()
  await expect(banner(page).getByRole("button", { name: "Aceitar todos" })).toBeVisible()
  await expect(banner(page).getByRole("link", { name: "Política de cookies" })).toBeVisible()
})

test("rejeitar registra a escolha e o banner não reaparece", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Rejeitar não essenciais" }).click()
  await expect(banner(page)).toBeHidden()

  const stored = await readStoredConsent(page)
  expect(stored).toMatchObject({
    necessary: true,
    analytics: false,
    advertising: false,
  })

  await page.reload()
  await expect(banner(page)).toBeHidden()
})

test("aceitar todos ativa opcionais e registra versão e data da política", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Aceitar todos" }).click()
  await expect(banner(page)).toBeHidden()

  const stored = await readStoredConsent(page)
  expect(stored).toMatchObject({ analytics: true, advertising: true })
  expect(stored?.policyVersion).toBe("2026-11-09")
  expect(Number.isNaN(Date.parse(String(stored?.updatedAt)))).toBe(false)
})

test("preferências reabrem pelo rodapé e permitem alterar a escolha", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Rejeitar não essenciais" }).click()

  await page
    .getByRole("navigation", { name: "Links legais" })
    .getByRole("button", { name: "Preferências de cookies" })
    .click()

  const dialog = page.getByRole("dialog", { name: BANNER_NAME })
  await expect(dialog).toBeVisible()

  const analytics = dialog.getByLabel("Análise")
  await expect(analytics).not.toBeChecked()
  await expect(dialog.getByLabel("Publicidade")).not.toBeChecked()
  await expect(dialog.getByLabel("Necessários")).toBeChecked()

  await analytics.check()
  await dialog.getByRole("button", { name: "Salvar preferências" }).click()
  await expect(dialog).toBeHidden()

  const stored = await readStoredConsent(page)
  expect(stored).toMatchObject({ analytics: true, advertising: false })
})

test("retirar consentimento é possível pelas preferências", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Aceitar todos" }).click()

  await page
    .getByRole("navigation", { name: "Links legais" })
    .getByRole("button", { name: "Preferências de cookies" })
    .click()

  const dialog = page.getByRole("dialog", { name: BANNER_NAME })
  await expect(dialog.getByLabel("Análise")).toBeChecked()
  await dialog.getByLabel("Análise").uncheck()
  await dialog.getByLabel("Publicidade").uncheck()
  await dialog.getByRole("button", { name: "Salvar preferências" }).click()

  const stored = await readStoredConsent(page)
  expect(stored).toMatchObject({ analytics: false, advertising: false })
})

test("versão antiga da política é tratada como ausência de consentimento", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, value),
    {
      key: STORAGE_KEY,
      value: JSON.stringify({
        necessary: true,
        analytics: true,
        advertising: true,
        policyVersion: "0.0.0",
        updatedAt: new Date().toISOString(),
      }),
    },
  )
  await page.reload()
  await expect(banner(page)).toBeVisible()
})

test("registro corrompido não quebra a página e volta ao padrão seguro", async ({ page }) => {
  const pageErrors: Error[] = []
  page.on("pageerror", (error) => pageErrors.push(error))

  await page.goto("/")
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: STORAGE_KEY, value: "{corrompido" },
  )
  await page.reload()

  await expect(banner(page)).toBeVisible()
  expect(pageErrors).toEqual([])
})

test("sem consentimento, nenhum script de analytics ou publicidade é requisitado", async ({ page }) => {
  const thirdPartyRequests: string[] = []
  page.on("request", (request) => {
    const url = request.url()
    if (/googlesyndication|google-analytics|googletagmanager/.test(url)) {
      thirdPartyRequests.push(url)
    }
  })

  await page.goto("/")
  await page.getByRole("button", { name: "Rejeitar não essenciais" }).click()
  await page.goto("/blog")
  await page.goto("/")

  expect(thirdPartyRequests).toEqual([])
})

test("páginas institucionais ficam acessíveis a partir do rodapé", async ({ page }) => {
  await page.goto("/")

  const legalNav = page.getByRole("navigation", { name: "Links legais" })
  await expect(legalNav.getByRole("link", { name: "Privacidade" })).toHaveAttribute(
    "href",
    "/politica-de-privacidade",
  )
  await expect(legalNav.getByRole("link", { name: "Cookies" })).toHaveAttribute(
    "href",
    "/politica-de-cookies",
  )
  await expect(legalNav.getByRole("link", { name: "Afiliados" })).toHaveAttribute(
    "href",
    "/aviso-de-afiliados",
  )

  await page.goto("/politica-de-privacidade")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Política de privacidade")
  await page.goto("/politica-de-cookies")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Política de cookies")
  await page.goto("/aviso-de-afiliados")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Aviso de afiliados")
})
