import Link from "next/link"

import { SessionRefresh } from "@/components/admin/session-refresh"
import { requireAdmin } from "@/lib/auth/session.server"

const navigation = [
  ["Posts", "/_control/painel/posts"],
  ["Categorias", "/_control/painel/categorias"],
  ["Tags", "/_control/painel/tags"],
  ["Imagens", "/_control/painel/imagens"],
] as const

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return <div className="admin-shell min-h-screen">
    <SessionRefresh />
    <header className="border-b border-blue-200/10 bg-[#0d1118]/90 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-2.5 sm:px-6">
        <Link href="/_control/painel" className="mr-auto flex items-center gap-2 text-sm font-semibold"><span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.5)]" />Editorial</Link>
        <nav aria-label="Navegação administrativa" className="order-3 flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto">
          {navigation.map(([label, href]) => <Link key={href} href={href} className="shrink-0 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-blue-400/[.07] hover:text-sky-100">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-3 text-xs"><span className="hidden text-muted-foreground md:inline">{user.displayName}</span><Link href="/blog" target="_blank" className="text-sky-300 hover:text-sky-200">Ver Blog</Link><form action="/api/admin-session/logout" method="post"><button type="submit" className="text-muted-foreground transition hover:text-foreground">Sair</button></form></div>
      </div>
    </header>
    {children}
  </div>
}
