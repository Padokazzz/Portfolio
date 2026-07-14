import { PageShell } from "@/components/layout/page-shell"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Trajetória",
  "Marcos da carreira, estudos e projetos de Leonardo Padilha ao longo de sua evolução profissional.",
  "/timeline",
)

export default function TimelinePage() {
  return (
    <PageShell
      eyebrow="Timeline"
      title="Marcos de carreira, estudos e projetos ao longo do tempo."
      description="A timeline vai organizar eventos importantes com clareza, ritmo e foco na evolucao profissional."
    />
  )
}
