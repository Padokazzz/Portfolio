import { ArrowUpRight, Globe, MousePointerClick, Settings2 } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { buildCodefyUrl, CODEFY_LINK_PROPS } from "@/lib/the-codefy"

/**
 * Serviços do estúdio exibidos ao lado do texto do bloco: preenchem a
 * coluna direita do card em telas largas e explicam a oferta em uma leitura.
 */
const SERVICES = [
  {
    icon: Globe,
    title: "Sites institucionais",
    detail: "Presença no ar com a cara da empresa e foco em gerar contato.",
  },
  {
    icon: MousePointerClick,
    title: "Landing pages",
    detail: "Páginas de conversão para campanhas, lançamentos e anúncios.",
  },
  {
    icon: Settings2,
    title: "Sistemas sob medida",
    detail: "Ferramentas e integrações para o dia a dia da operação.",
  },
] as const

/**
 * Gancho comercial entre Projetos e Blog: apresenta a The Codefy a donos
 * de empresa sem competir com a navegação principal. O card ocupa a largura
 * da seção com texto + CTAs à esquerda e os serviços do estúdio à direita.
 * Os dois CTAs abrem em nova aba e carregam UTM da posição `bloco-home`.
 */
export function CodefyCta() {
  return (
    <section id="the-codefy" className="scroll-mt-20 border-t border-white/10">
      <div className="section-shell flex flex-col justify-center">
        <Reveal>
          <div className="surface card-highlight rounded-lg border p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
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

              <div className="rounded-md border border-white/10 bg-[#080b12]/45 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  O que a The Codefy entrega
                </p>
                <ul className="mt-3 grid gap-3">
                  {SERVICES.map((service) => {
                    const Icon = service.icon

                    return (
                      <li key={service.title} className="flex gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#8b5cf6]/10 text-[#a78bfa]">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium">
                            {service.title}
                          </span>
                          <span className="block text-xs leading-5 text-muted-foreground">
                            {service.detail}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
