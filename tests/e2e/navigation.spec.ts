import { expect, test } from "@playwright/test"

test("portfolio oferece acesso ao blog", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: "Blog", exact: true })).toHaveAttribute("href", "/blog")
})

test("painel redireciona visitantes para o login", async ({ page }) => {
  await page.goto("/_control/painel")
  await expect(page).toHaveURL(/\/_control\/login/)
})

test("busca do menu usa o mesmo parametro da busca principal", async ({ page }) => {
  await page.goto("/blog")
  const search = page.getByRole("search").first().getByRole("searchbox")
  await search.fill("arquitetura")
  await search.press("Enter")
  await expect(page).toHaveURL(/\/blog\?busca=arquitetura/)
})
