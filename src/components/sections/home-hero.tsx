import { ArrowRight, Mail, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { AnimatedHeading } from "@/components/motion/animated-heading"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section
      id="home"
      className="section-shell relative grid min-h-[calc(100svh-3.75rem)] items-center gap-8 md:grid-cols-[0.94fr_1.06fr] lg:gap-14"
    >
      {/* Camada geométrica sutil: glows violeta/azul + linhas de referencia */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 size-[30rem] rounded-full bg-[#8b5cf6]/12 blur-[130px]" />
        <div className="absolute top-1/3 -right-28 size-[26rem] rounded-full bg-[#38bdf8]/10 blur-[120px]" />
        <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#273248]/70 to-transparent" />
        <div className="absolute top-16 right-16 h-24 w-24 border-t border-r border-[#273248]/80" />
        <div className="absolute bottom-16 left-16 h-24 w-24 border-b border-l border-[#273248]/80" />
      </div>

      <Reveal delay={0.05} className="order-2 max-w-2xl space-y-6 md:order-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#273248] bg-[#111827]/70 px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5 text-[#a78bfa]" />
            Desenvolvedor full stack mobile
          </span>
          <span className="hidden h-px w-24 bg-[#273248] sm:block" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            LPK / 2026
          </span>
        </div>

        <div className="space-y-4">
          <AnimatedHeading
            text="Engenharia de produto com ritmo, clareza e cuidado visual."
            delay={0.62}
            className="max-w-2xl text-4xl font-semibold leading-[1.02] text-balance sm:text-5xl lg:text-[3.45rem]"
          />

          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Desenvolvedor Full Stack com foco em soluções digitais que unem
            tecnologia, design e experiência do usuário.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-md bg-[#8b5cf6] px-4 text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa]"
          >
            <Link href="/#projetos">
              Ver projetos
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-md border-[#273248] bg-[#111827]/60 px-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/40 hover:bg-[#151c2b]"
          >
            <Link href="/contato">
              Contato
              <Mail aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <dl className="grid max-w-xl grid-cols-3 gap-3 border-y border-[#273248] py-4">
          {[
            ["Stack atual", "Flutter + .NET"],
            ["Direcao", "Full stack"],
            ["Especialidades", "React, TS, Python, .NET"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.12} className="order-1 md:order-2 md:self-center">
        <div className="relative mx-auto w-full max-w-[34rem] md:mr-0">
          {/* Chrome de janela: detalhe inspirado em interface de desenvolvimento */}
          <div className="mb-2 flex items-center gap-2 px-1">
            <span className="size-2.5 rounded-full bg-[#8b5cf6]/70" />
            <span className="size-2.5 rounded-full bg-[#38bdf8]/60" />
            <span className="size-2.5 rounded-full bg-[#273248]" />
            <span className="ml-2 font-mono text-[0.68rem] text-[#68758b]">
              leonardo.tsx
            </span>
          </div>

          <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#273248] bg-[#111827] shadow-[var(--shadow-elevated)]">
            <Image
              src="/images/profile.jpg"
              alt="Retrato profissional"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 90vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.015]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(8_11_18/0.45))]" />
            {/* Cantos de referencia (estetica de selecao tecnica) */}
            <div className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t border-l border-[#a78bfa]/60" />
            <div className="pointer-events-none absolute right-2 bottom-2 h-4 w-4 border-r border-b border-[#38bdf8]/60" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
