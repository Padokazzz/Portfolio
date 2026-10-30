import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/"
const out = process.env.SHOT_OUT || "/tmp/sec"

const sections = (process.env.SHOT_IDS || "stack,experiencia").split(",")

const browser = await chromium.launch()

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
]

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  })
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
  await page.waitForTimeout(2200)

  for (const id of sections) {
    const el = page.locator(`#${id}`)
    if ((await el.count()) === 0) {
      console.log(`skip: #${id}`)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1700)
    const path = `${out}-${id}-${vp.name}.png`
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
