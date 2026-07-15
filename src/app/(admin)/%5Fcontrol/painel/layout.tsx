import Link from "next/link"

import { requireAdmin } from "@/lib/auth/session.server"

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-[#11100f]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/_control/painel" className="font-semibold">Painel editorial</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{user.displayName}</span>
            <form action="/api/admin-session/logout" method="post">
              <button type="submit" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Sair</button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
