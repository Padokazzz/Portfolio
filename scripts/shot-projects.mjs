import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/"
const out = process.env.SHOT_OUT || "/tmp/home"

const browser = await chromium.launch()

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  })
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
  await page.waitForTimeout(2500)

  const section = page.locator("#projetos")
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1800)

  // slide atual (0 = Ludare, 2 = Leilao com estudo de caso)
  await page.screenshot({ path: `${out}-projetos-0-${vp.name}.png` })
  console.log(`ok: ${out}-projetos-0-${vp.name}.png`)

  // avanca para o Leilao Online (slide 3)
  const next = page.getByRole("button", { name: "Proximo projeto" })
  if ((await next.count()) > 0) {
    await next.click()
    await page.waitForTimeout(700)
    await next.click()
    await page.waitForTimeout(1600)
    await page.screenshot({ path: `${out}-projetos-leilao-${vp.name}.png` })
    console.log(`ok: ${out}-projetos-leilao-${vp.name}.png`)
  }

  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }))
  console.log(
    `overflow ${vp.name}: ${m.sw - m.cw}${m.sw > m.cw ? "  <-- SCROLL HORIZONTAL" : "  ok"}`
  )

  await page.close()
}

await browser.close()
