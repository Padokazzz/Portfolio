import { chromium } from "@playwright/test"

const OUT = process.env.OUT_DIR || "public/images/projects"

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})

try {
  await page.goto("https://ludare.com.br/", {
    waitUntil: "load",
    timeout: 45000,
  })
} catch {
  console.log("warn: goto timeout")
}

const wait = (ms) => page.waitForTimeout(ms)

// espera o slider de titulo parar de se mover (compara o texto do H1)
let stable = 0
let last = ""
for (let i = 0; i < 20 && stable < 3; i++) {
  await wait(700)
  let txt = ""
  try {
    txt = await page.evaluate(() => document.body.innerText.slice(0, 400))
  } catch {
    console.log("warn: evaluate falhou (navegacao), ignorando")
    continue
  }
  if (txt && txt === last) stable++
  else {
    stable = 0
    last = txt
  }
}

// aceita cookies se o banner existir
try {
  const accept = page.getByRole("button", { name: /accept all/i }).first()
  if (await accept.isVisible({ timeout: 3000 })) {
    await accept.click()
    console.log("cookies aceitos")
    await wait(1500)
  }
} catch {
  console.log("sem banner de cookies")
}

// garante que o slider parou de sobrepor os textos
await wait(1500)

try {
  await page.screenshot({ path: `${OUT}/ludare-consultoria.png` })
  console.log(`ok: ${OUT}/ludare-consultoria.png`)
} catch (e) {
  console.log(`erro ao capturar: ${e.message}`)
}

await browser.close()
