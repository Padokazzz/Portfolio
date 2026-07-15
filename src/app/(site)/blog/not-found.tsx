import Link from "next/link"

import { Container } from "@/components/layout/container"

export default function BlogNotFound() {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <section className="surface max-w-2xl rounded-lg border p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">404</p>
          <h1 className="mt-3 text-2xl font-semibold">Conteúdo não encontrado</h1>
          <p className="mt-3 text-muted-foreground">O artigo, categoria ou tag não existe ou ainda não está publicado.</p>
          <Link href="/blog" className="mt-6 inline-flex rounded-md bg-[#f0dfbd] px-4 py-2 text-sm font-medium text-[#15110c]">Voltar ao blog</Link>
        </section>
      </Container>
    </main>
  )
}
