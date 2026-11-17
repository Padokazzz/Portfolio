import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { buildCodefyUrl, CODEFY_LINK_PROPS } from "@/lib/the-codefy"

type TheCodefyCardProps = {
  className?: string
}

/**
 * Divulgação discreta da The Codefy na barra lateral dos artigos: aparece
 * logo abaixo dos posts sugeridos, com o mesmo padrão visual dos cards da
 * sidebar e o link comercial passando pela centralização de UTM do portfólio.
 */
export function TheCodefyCard({ className = "" }: TheCodefyCardProps) {
  return (
    <section
      aria-labelledby="thecodefy-card-heading"
      className={`rounded-xl border border-blue-300/15 bg-[#080b12]/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sky-300">
        The Codefy
      </p>

      <h2
        id="thecodefy-card-heading"
        className="mt-2 text-base font-semibold leading-tight text-balance"
      >
        Sua ideia merece sair do papel.
      </h2>

      <p className="mt-2 text-[12.5px] leading-5 text-muted-foreground">
        A The Codefy transforma necessidades e ideias em soluções digitais.
        Desenvolvemos sites, aplicações e integrações para negócios que querem
        aproveitar melhor a tecnologia.
      </p>

      <div className="mt-4 border-t border-blue-200/10 pt-3">
        <p className="text-[13px] font-semibold">Tem um projeto em mente?</p>
        <p className="mt-0.5 text-[12px] leading-4 text-muted-foreground">
          Vamos conversar sobre como podemos ajudar.
        </p>
      </div>

      <Link
        href={buildCodefyUrl("blog-sidebar")}
        {...CODEFY_LINK_PROPS}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/20 bg-cyan-300/[.045] px-3 py-2 text-xs font-medium text-sky-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/[.08] hover:text-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        Conheça a The Codefy
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
        <span className="sr-only"> (abre em nova aba)</span>
      </Link>
    </section>
  )
}
