import { ImageResponse } from "next/og"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-metadata"

export const alt = "Leonardo Padilha — Desenvolvedor Full Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#17130f",
        color: "#fffaf2",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid #5f4b36",
          borderRadius: "28px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div style={{ color: "#e7c78f", display: "flex", fontSize: 28, letterSpacing: 8 }}>
          PORTFÓLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>{SITE_NAME}</div>
          <div style={{ color: "#d8d0c4", display: "flex", fontSize: 32, lineHeight: 1.4 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
        <div style={{ color: "#e7c78f", display: "flex", fontSize: 24 }}>
          {new URL(SITE_URL).host}
        </div>
      </div>
    </div>,
    size,
  )
}
