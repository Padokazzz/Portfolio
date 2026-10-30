import { chromium } from "@playwright/test"

const OUT = process.env.OUT_DIR || "public/images/projects"

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})

try {
  await page.goto("https://leilao-online-eta.vercel.app/", {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  })
} catch {
  console.log("warn: goto timeout")
}

// espera o skeleton "Carregando lotes..." sumir (ou estourar)
try {
  await page.waitForFunction(
    () => !document.body.innerText.includes("Carregando lotes"),
    { timeout: 30000 }
  )
  console.log("lotes carregados")
} catch {
  console.log("warn: lotes nao carregaram em 30s")
}

await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/leilao-online.png` })
console.log(`ok: ${OUT}/leilao-online.png`)

await browser.close()
