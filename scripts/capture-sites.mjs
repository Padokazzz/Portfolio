import { chromium } from "@playwright/test"

const OUT = process.env.OUT_DIR || "public/images/projects"

const browser = await chromium.launch()

async function settle(page, ms) {
  await page.waitForTimeout(ms)
}

// --- Leilao: espera os lotes renderizarem ---
{
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
    console.log("warn: leilao goto timeout")
  }
  try {
    await page.waitForFunction(
      () => !document.body.innerText.includes("Carregando lotes"),
      { timeout: 30000 }
    )
    console.log("leilao: lotes carregados")
  } catch {
    console.log("warn: leilao lotes nao carregaram")
  }
  await settle(page, 2500)
  await page.screenshot({ path: `${OUT}/leilao-online.png` })
  console.log(`ok: ${OUT}/leilao-online.png`)
  await page.close()
}

// --- Ludare: espera o slider de titulo assentar (sem sobreposicao) ---
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  try {
    await page.goto("https://ludare.com.br/", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    })
  } catch {
    console.log("warn: ludare goto timeout")
  }
  await settle(page, 6000)

  // tenta detectar sobreposicao de linhas do H1: espera ate o texto estabilizar
  let last = ""
  for (let i = 0; i < 12; i++) {
    const txt = await page.evaluate(
      () => document.querySelector("h1")?.innerText || ""
    )
    if (txt && txt === last) break
    last = txt
    await settle(page, 1000)
  }
  console.log(`ludare h1: ${JSON.stringify(last)}`)

  await settle(page, 800)
  await page.screenshot({ path: `${OUT}/ludare-consultoria.png` })
  console.log(`ok: ${OUT}/ludare-consultoria.png`)
  await page.close()
}

await browser.close()
