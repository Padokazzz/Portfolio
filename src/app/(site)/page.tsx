import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-5xl flex-col justify-center px-6 py-24">
      <section className="max-w-3xl space-y-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Portfolio profissional
        </p>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold leading-tight text-balance sm:text-6xl">
            Software, arquitetura e experiencias digitais com cuidado de produto.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Um portfolio em construcao para apresentar projetos, escrita tecnica,
            interesses criativos e a forma como penso sobre sistemas.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/projetos">
              Ver projetos
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contato">Entrar em contato</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
