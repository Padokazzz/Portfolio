"use client"

import { useEffect } from "react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function BlogError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <section className="surface max-w-2xl rounded-lg border p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Blog indisponível
          </p>
          <h1 className="mt-3 text-2xl font-semibold">
            Não foi possível carregar os artigos.
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Isso pode ser temporário. Tente novamente em alguns instantes.
          </p>
          <Button onClick={unstable_retry} className="mt-6" size="lg">
            Tentar novamente
          </Button>
        </section>
      </Container>
    </main>
  )
}
