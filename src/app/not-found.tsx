import Link from "next/link"

import { SITE_NAME } from "@/lib/site-metadata"

// 404 do site inteiro (fora do grupo (site), que tem navbar e rodapé).
// A resposta já sai com status 404, então não há risco de indexação: o valor
// aqui é humano e de rastreamento — página em português com caminhos reais
// para o crawler e para quem caiu num link antigo, em vez do 404 genérico
// em inglês do Next.
const sugestoes = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
] as const

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Erro 404
      </p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl">
        Esta página não existe
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        O endereço pode ter mudado ou o conteúdo foi removido. Um dos links
        abaixo deve resolver.
      </p>
      <nav aria-label="Páginas recomendadas" className="mt-8 flex flex-wrap justify-center gap-3">
        {sugestoes.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground transition hover:bg-white/10"
          >
            {label}
          </Link>
        ))}
      </nav>
      <p className="mt-10 text-xs text-muted-foreground">
        {SITE_NAME} · Desenvolvedor Full Stack
      </p>
    </main>
  )
}
