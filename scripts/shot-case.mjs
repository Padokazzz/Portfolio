import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/projetos/leilao-online"
const out = process.env.SHOT_OUT || "/tmp/case"
const waitReveal = 1600

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

  // rola a pagina inteira deixa de trás pra frente para acionar todos os reveals
  const h = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < h; y += Math.floor(vp.height * 0.7)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(350)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(waitReveal)

  await page.screenshot({ path: `${out}-top-${vp.name}.png` })
  console.log(`ok: ${out}-top-${vp.name}.png`)

  await page.screenshot({ path: `${out}-full-${vp.name}.png`, fullPage: true })
  console.log(`ok: ${out}-full-${vp.name}.png`)

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
