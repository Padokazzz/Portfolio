import Link from "next/link"

import { Container } from "@/components/layout/container"

const STACKS = [
  {
    label: "Frontend",
    technologies: "Next.js · React · TypeScript · Tailwind CSS",
  },
  {
    label: "Backend",
    technologies: ".NET 10 · ASP.NET Core · FluentValidation · MailKit",
  },
] as const

const FOOTER_LINKS = [
  { href: "/projetos", label: "Projetos" },
  { href: "/timeline", label: "Trajetória" },
  { href: "/uses", label: "Uses" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
  { href: "/rss.xml", label: "RSS" },
] as const

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-white/10 bg-[#0d111b]/60"
    >
      <Container className="flex flex-col gap-5 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
        <div className="flex shrink-0 flex-col gap-3">
          <p>
            &copy; {new Date().getFullYear()} Leonardo Padilha. Todos os
            direitos reservados.
          </p>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap gap-x-4 gap-y-2"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1 lg:justify-end">
          {STACKS.map((stack) => (
            <p key={stack.label}>
              <span className="font-medium text-foreground/80">
                {stack.label}
              </span>
              <span aria-hidden="true"> — </span>
              {stack.technologies}
            </p>
          ))}
        </div>
      </Container>
    </footer>
  )
}
