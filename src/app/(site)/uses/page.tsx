import { PageShell } from "@/components/layout/page-shell"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Ferramentas e setup",
  "Ferramentas, equipamentos, softwares e fluxos de desenvolvimento usados por Leonardo Padilha no trabalho diário.",
  "/uses",
)

export default function UsesPage() {
  return (
    <PageShell
      eyebrow="Uses"
      title="Ferramentas, setup e escolhas que sustentam o trabalho diario."
      description="Um espaco para documentar equipamentos, softwares, fluxos de estudo e preferencias de desenvolvimento."
    />
  )
}
