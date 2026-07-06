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
      className="mx-auto grid min-h-[calc(100svh-3.75rem)] w-full max-w-7xl items-center gap-8 px-6 py-7 md:grid-cols-[0.94fr_1.06fr] lg:gap-14"
    >
      <Reveal delay={0.05} className="order-2 max-w-2xl space-y-6 md:order-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5 text-[#e7c78f]" />
            Desenvolvedor full stack mobile
          </span>
          <span className="hidden h-px w-24 bg-white/15 sm:block" />
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
            Trabalho com Flutter e .NET, tenho forte afinidade com React e
            TypeScript, e gosto de construir experiencias completas: da
            interface que conduz o usuario a API que sustenta o produto.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-md bg-[#f0dfbd] px-4 text-[#15110c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffe9bf]"
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
            className="h-11 rounded-md border-white/12 bg-white/[0.035] px-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <Link href="/contato">
              Contato
              <Mail aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <dl className="grid max-w-xl grid-cols-3 gap-3 border-y border-white/10 py-4">
          {[
            ["Stack atual", "Flutter + .NET"],
            ["Direcao", "Full stack"],
            ["Assinatura", "React + TS"],
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
          <div className="group relative aspect-[4/3] overflow-hidden bg-[#141210] shadow-[0_24px_90px_rgb(0_0_0/0.35)]">
            <Image
              src="/images/profile.jpg"
              alt="Retrato profissional"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 90vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.015]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(17_16_15/0.38))]" />
          </div>

        </div>
      </Reveal>
    </section>
  )
}
