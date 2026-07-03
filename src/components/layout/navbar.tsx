import Link from "next/link"

import { Container } from "@/components/layout/container"
import { NAV_LINKS } from "@/constants/routes"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Portfolio
        </Link>
        <nav aria-label="Navegacao principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
