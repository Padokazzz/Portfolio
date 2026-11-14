import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { buildCodefyUrl, CODEFY_LINK_PROPS } from "@/lib/the-codefy"

/**
 * Gancho comercial entre Projetos e Blog: apresenta a The Codefy a donos
 * de empresa sem competir com a navegação principal. Os dois CTAs abrem em
 * nova aba e carregam UTM da posição `bloco-home`.
 */
export function CodefyCta() {
  return (
    <section id="the-codefy" className="scroll-mt-20 border-t border-white/10">
      <div className="section-shell flex flex-col justify-center">
        <Reveal className="max-w-3xl">
          <div className="surface card-highlight rounded-lg border p-6 sm:p-8">
            <div className="h-1 w-20 rounded-full accent-line" />
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              The Codefy
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
              Tem uma empresa e precisa de um site?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              A The Codefy é o meu estúdio de sites institucionais e landing
              pages sob medida para pequenas empresas e prestadores de
              serviços. Do primeiro rascunho até a publicação, o foco é
              transformar visita em contato.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildCodefyUrl("bloco-home")}
                {...CODEFY_LINK_PROPS}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-4 py-2.5 text-sm font-medium text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Conhecer a The Codefy
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>

              <a
                href={buildCodefyUrl("bloco-home", "/contato")}
                {...CODEFY_LINK_PROPS}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Solicitar orçamento
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
