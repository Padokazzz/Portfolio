import { PageShell } from "@/components/layout/page-shell"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Experimentos",
  "Protótipos e explorações de Leonardo Padilha envolvendo interfaces, arte, música e tecnologia.",
  "/experimentos",
)

export default function ExperimentosPage() {
  return (
    <PageShell
      eyebrow="Experimentos"
      title="Pequenas exploracoes de interface, musica, arte e tecnologia."
      description="Uma area para prototipos controlados, sem comprometer a clareza e a performance do portfolio principal."
    />
  )
}
