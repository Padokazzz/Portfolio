import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { CONTACT_LINKS } from "@/constants/contact"
import { NAV_LINKS } from "@/constants/routes"

export function Footer() {
  const year = new Date().getFullYear()
  const directLinks = CONTACT_LINKS.filter((link) => link.action === "link")
  const externalLinks = directLinks.filter((link) =>
    link.href.startsWith("http"),
  )
  const resumeLink = CONTACT_LINKS.find((link) => link.label === "Curriculo")

  return (
    <footer className="border-t border-white/10 bg-[#0e0d0c]/72">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.35fr_0.65fr_0.8fr] md:gap-8">
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="size-1.5 rounded-full bg-[#e7c78f] transition-transform group-hover:scale-125" />
              Padoka.dev
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Desenvolvimento full stack e mobile com foco em produtos digitais,
              interfaces bem construídas e soluções que chegam à produção.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contato"
                className="group inline-flex items-center gap-2 rounded-md bg-[#e7c78f] px-3.5 py-2 text-xs font-medium text-[#17130d] transition-colors hover:bg-[#f0dfbd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Vamos conversar
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              {resumeLink ? (
                <Link
                  href={resumeLink.href}
                  target={resumeLink.external ? "_blank" : undefined}
                  rel={resumeLink.external ? "noreferrer" : undefined}
                  className="rounded-md border border-white/10 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Ver currículo
                </Link>
              ) : null}
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links profissionais">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Presença online
            </p>
            <ul className="mt-4 space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Leonardo Padilha. Todos os direitos reservados.</p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground/75">
            Next.js · TypeScript · São Paulo, BR
          </p>
        </div>
      </Container>
    </footer>
  )
}
