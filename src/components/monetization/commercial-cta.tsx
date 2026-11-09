"use client"

import Link from "next/link"

import { trackEvent } from "@/lib/analytics/analytics"

type CommercialCtaProps = {
  className?: string
}

/**
 * Chamada comercial discreta, exibida ao final dos artigos. Sem pop-ups,
 * sem promessas: apenas dois caminhos (projetos e contato), com clique
 * medido por evento quando o analytics está ativo (sem dados pessoais).
 */
export function CommercialCta({ className }: CommercialCtaProps) {
  return (
    <section
      aria-label="Chamada comercial"
      className={`rounded-xl border border-white/10 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent p-5 ${className ?? ""}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Projetos
      </p>
      <h2 className="mt-2 text-base font-semibold leading-snug text-foreground">
        Precisa desenvolver ou melhorar uma aplicação?
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Conheça meus projetos ou entre em contato para conversar sobre sua
        necessidade.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/projetos"
          onClick={() => trackEvent("contact_click", { cta: "projetos" })}
          className="rounded-lg bg-yellow-300 px-4 py-2 text-xs font-semibold text-[#191713] transition hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ver projetos
        </Link>
        <Link
          href="/contato"
          onClick={() => trackEvent("contact_click", { cta: "contato" })}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Falar comigo
        </Link>
      </div>
    </section>
  )
}
