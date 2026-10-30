import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/"
const out = process.env.SHOT_OUT || "/tmp/shots/slides"

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
await page.waitForTimeout(2000)

const section = page.locator("#projetos")
await section.scrollIntoViewIfNeeded()
await page.waitForTimeout(1500)

const next = page.getByRole("button", { name: "Proximo projeto" })
const total = Number(
  (await page.locator('button[aria-label^="Ver "]').count()) || 6
)

for (let i = 0; i < total; i++) {
  await page.waitForTimeout(900)
  await section.screenshot({ path: `${out}-${i}.png` })
  console.log(`ok: ${out}-${i}.png`)
  if (i < total - 1) await next.click()
}

await browser.close()
