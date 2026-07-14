import { PageShell } from "@/components/layout/page-shell"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Blog",
  "Artigos e reflexões de Leonardo Padilha sobre desenvolvimento web, engenharia e arquitetura de software.",
  "/blog",
)

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Escrita tecnica e reflexoes sobre desenvolvimento de software."
      description="A area de artigos sera baseada em MDX, com posts versionados no repositorio e componentes proprios para leitura confortavel."
    />
  )
}
