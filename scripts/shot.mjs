import { chromium } from "@playwright/test"

const url = process.env.SHOT_URL || "http://localhost:3000/"
const out = process.env.SHOT_OUT || "/tmp/shot"

const browser = await chromium.launch()

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]

const sections = [
  { id: "home", slug: "hero" },
  { id: "stack", slug: "stack" },
  { id: "experiencia", slug: "experiencia" },
  { id: "projetos", slug: "projetos" },
  { id: "contato", slug: "contato" },
]

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  })
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
  await page.waitForTimeout(1500)

  for (const s of sections) {
    const el = page.locator(`#${s.id}`)
    if ((await el.count()) === 0) {
      console.log(`skip: #${s.id} nao encontrado`)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1600) // espera o reveal assentar
    await page.screenshot({
      path: `${out}-${s.slug}-${vp.name}.png`,
    })
    console.log(`ok: ${out}-${s.slug}-${vp.name}.png`)
  }

  await page.close()
}

await browser.close()
