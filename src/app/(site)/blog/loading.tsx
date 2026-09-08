import { Container } from "@/components/layout/container"

export default function BlogLoading() {
  return (
    <main className="blog-public-shell flex-1" aria-busy="true" aria-label="Carregando artigos">
      <Container className="py-20 sm:py-28">
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          <div className="h-12 max-w-2xl animate-pulse rounded bg-white/10" />
          <div className="h-6 max-w-xl animate-pulse rounded bg-white/[0.07]" />
        </div>
        <div className="mt-10 h-14 max-w-2xl animate-pulse rounded-lg bg-white/[0.07]" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className={`h-80 animate-pulse rounded-xl border ${index % 3 === 0 ? "border-blue-300/15 bg-blue-400/[.04]" : index % 3 === 1 ? "border-cyan-300/15 bg-cyan-400/[.04]" : "border-sky-300/15 bg-sky-400/[.04]"}`}
            />
          ))}
        </div>
      </Container>
    </main>
  )
}
