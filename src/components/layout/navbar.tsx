import Link from "next/link"

import { Container } from "@/components/layout/container"
import { NAV_LINKS } from "@/constants/routes"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#11100f]/82 backdrop-blur-xl">
      <Container className="flex h-[3.75rem] items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="size-1.5 rounded-full bg-[#e7c78f] transition-transform group-hover:scale-125" />
          Leonardo Padilha
        </Link>
        <nav aria-label="Navegacao principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-white/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
