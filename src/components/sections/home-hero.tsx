import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-6xl items-center gap-8 px-6 py-8 md:grid-cols-[0.92fr_1.08fr] md:gap-12 md:py-10">
      <div className="order-2 max-w-2xl space-y-6 md:order-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
          Desenvolvedor de Software
        </p>

        <div className="space-y-4">
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]">
            Construo interfaces e sistemas com foco em clareza, arquitetura e
            experiencia.
          </h1>

          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Sou desenvolvedor com interesse em arquitetura de sistemas, produtos
            digitais e interfaces bem cuidadas. Gosto de transformar ideias em
            experiencias simples, rapidas e faceis de usar.
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
      </div>

      <div className="order-1 md:order-2 md:self-center">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-lg overflow-hidden bg-muted md:mr-0">
          <Image
            src="/images/profile.jpg"
            alt="Retrato profissional"
            fill
            priority
            quality={95}
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
