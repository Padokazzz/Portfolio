"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { Container } from "@/components/layout/container"
import { BLOG_NAV_LINKS, NAV_LINKS } from "@/constants/routes"

function BlogMenuSearch() {
  const searchParams = useSearchParams()
  return <form action="/blog" method="get" role="search" className="relative">
    <label htmlFor="blog-menu-search" className="sr-only">Pesquisar artigos</label>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
    <input key={searchParams.get("busca") ?? ""} id="blog-menu-search" name="busca" type="search" defaultValue={searchParams.get("busca") ?? ""} placeholder="Pesquisar" className="h-9 w-28 rounded-md border border-white/10 bg-white/[0.03] pl-8 pr-2 text-xs outline-none transition placeholder:text-muted-foreground focus:border-sky-300/30 focus:bg-sky-400/[0.04] sm:w-44" />
    <button type="submit" className="sr-only">Buscar</button>
  </form>
}

export function Navbar() {
  const pathname = usePathname()
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/")
  const links = isBlog ? BLOG_NAV_LINKS : NAV_LINKS
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#11100f]/82 backdrop-blur-xl">
      <Container className="flex h-[3.75rem] items-center justify-between">
        <Link
          href={isBlog ? "/blog" : "/"}
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="size-1.5 rounded-full bg-[#e7c78f] transition-transform group-hover:scale-125" />
          {isBlog ? <><span className="sm:hidden">Blog</span><span className="hidden sm:inline">Leonardo · Blog</span></> : "Leonardo Padilha"}
        </Link>

        <nav aria-label={isBlog ? "Navegação do blog" : "Navegação principal"} className="min-w-0">
          <ul className="flex items-center gap-1">
            {links.map((item, index) => (
              <li key={item.href} className={isBlog ? "hidden md:block" : index > 0 ? "hidden sm:block" : undefined}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-white/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isBlog && <li>
              <Link href="/" className="rounded-md border border-sky-300/20 bg-sky-400/[0.06] px-3 py-2 text-sm text-sky-100 transition hover:border-sky-300/35 hover:bg-sky-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Portfólio
              </Link>
            </li>}
            {isBlog && <li className="ml-1 hidden sm:block">
              <Suspense fallback={<div className="h-9 w-28 rounded-md border border-white/10 bg-white/[0.03] sm:w-44" />}><BlogMenuSearch /></Suspense>
            </li>}
            <li className="sm:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex size-9 items-center justify-center rounded-md transition hover:bg-white/[0.06]"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
              >
                <span className="sr-only">{mobileOpen ? "Fechar" : "Menu"}</span>
                <span className="flex flex-col gap-1.5">
                  <span className={`block h-0.5 w-4 rounded bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
                  <span className={`block h-0.5 w-4 rounded bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 w-4 rounded bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#11100f]/95 backdrop-blur-xl">
          <Container className="py-4">
            <nav aria-label="Menu mobile">
              <ul className="flex flex-col gap-1">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {isBlog && (
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md border border-sky-300/20 bg-sky-400/[0.06] px-3 py-2.5 text-sm text-sky-100 transition hover:border-sky-300/35 hover:bg-sky-400/10"
                    >
                      Portfólio
                    </Link>
                  </li>
                )}
              </ul>
              {isBlog && (
                <div className="mt-3">
                  <Suspense fallback={<div className="h-9 rounded-md border border-white/10 bg-white/[0.03]" />}>
                    <BlogMenuSearch />
                  </Suspense>
                </div>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
