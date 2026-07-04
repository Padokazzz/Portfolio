import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { CONTACT_LINKS } from "@/constants/contact"

type ContactCtaProps = {
  variant?: "home" | "page"
}

export function ContactCta({ variant = "home" }: ContactCtaProps) {
  const isPage = variant === "page"

  return (
    <section
      id="contato"
      className={isPage ? "flex-1" : "border-t border-white/10"}
    >
      <div
        className={
          isPage
            ? "mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[0.92fr_1.08fr]"
            : "mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
        }
      >
        <div className="max-w-2xl">
          <div className="border-l border-white/10 pl-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contato
            </p>

            <h2 className="mt-4 text-2xl font-semibold leading-tight text-balance sm:text-3xl">
              Vamos conversar sobre produto, desenvolvimento ou oportunidades.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              Estou aberto a conversas sobre desenvolvimento full stack, mobile,
              frontend, backend e produtos digitais com foco em entrega real.
            </p>
          </div>

          <div className="mt-8 max-w-md rounded-md border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-4">
              <span>status</span>
              <span className="text-foreground">disponivel</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-3">
              <span>resposta</span>
              <span className="text-foreground">ate 24h</span>
            </div>
          </div>
        </div>

        <div className="border-y border-white/10">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-5 border-b border-white/10 py-4 transition-colors last:border-b-0 hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex min-w-0 items-center gap-4 px-1">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/[0.035] text-muted-foreground">
                    <Icon aria-hidden="true" className="size-3.5" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {link.label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-muted-foreground">
                      {link.value}
                    </span>
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-3 px-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Abrir
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-muted-foreground/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
