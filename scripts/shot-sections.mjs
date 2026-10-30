import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/projetos/leilao-online"
const out = process.env.SHOT_OUT || "/tmp/case"
const prefix = process.env.SHOT_PREFIX || "sec"

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
  await page.waitForTimeout(2000)

  const count = await page.locator("main > section").count()
  console.log(`${vp.name}: ${count} secoes`)

  for (let i = 0; i < count; i++) {
    const section = page.locator("main > section").nth(i)
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1700) // espera o reveal assentar
    const path = `${out}-${prefix}${i}-${vp.name}.png`
    await page.screenshot({ path })
    console.log(`ok: ${path}`)
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
