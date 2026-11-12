import { ImageResponse } from "next/og"

import { OG_LOGO } from "@/lib/og-logo"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-metadata"

export const alt = "Leonardo Padilha — Desenvolvedor Full Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Card exibido ao compartilhar o link (LinkedIn, WhatsApp, X, Discord…).
 *
 * Usa a mesma paleta do site (tokens de `globals.css`): fundo `#080b12`,
 * borda `#273248`, texto `#f1f5f9`/`#a0aec0` e o roxo `#8b5cf6` do cabeçalho
 * — o card anterior era marrom quente e não tinha a logo.
 *
 * A logo vem como data URI: a rota é gerada em build e não pode buscar
 * arquivos na rede (ver `src/lib/og-logo.ts`).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#080b12",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "56px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid #273248",
          borderRadius: 32,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px 64px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 40 }}>
          <img
            src={OG_LOGO}
            alt=""
            width={160}
            height={160}
            style={{ border: "2px solid #273248", borderRadius: 24 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ color: "#8b5cf6", display: "flex", fontSize: 28, letterSpacing: 8 }}>
              PORTFÓLIO
            </div>
            <div style={{ color: "#f1f5f9", display: "flex", fontSize: 76, fontWeight: 700 }}>
              {SITE_NAME}
            </div>
          </div>
        </div>

        <div style={{ color: "#a0aec0", display: "flex", fontSize: 30, lineHeight: 1.45 }}>
          {SITE_DESCRIPTION}
        </div>

        <div style={{ alignItems: "center", color: "#8b5cf6", display: "flex", fontSize: 26, gap: 14 }}>
          <span
            style={{
              background: "#8b5cf6",
              borderRadius: 999,
              display: "flex",
              height: 12,
              width: 12,
            }}
          />
          {new URL(SITE_URL).host}
        </div>
      </div>
    </div>,
    size,
  )
}
