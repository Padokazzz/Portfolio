import { PageShell } from "@/components/layout/page-shell"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Projetos",
  "Projetos de frontend, backend e arquitetura de software com contexto, decisões técnicas, trade-offs e resultados.",
  "/projetos",
)

export default function ProjetosPage() {
  return (
    <PageShell
      eyebrow="Projetos"
      title="Estudos de caso com contexto, decisoes tecnicas e resultado."
      description="Aqui ficarao os projetos selecionados, com foco em problema, arquitetura, trade-offs, implementacao e impacto."
    />
  )
}
