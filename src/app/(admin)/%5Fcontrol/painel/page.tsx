import Link from "next/link"

import { getAdminDashboard } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"

const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" })

export default async function AdminDashboardPage() {
  await requireAdmin()
  const data = await getAdminDashboard()
  const published = data.posts.filter(post => post.status === ADMIN_POST_STATUS.published).length
  const drafts = data.posts.filter(post => post.status === ADMIN_POST_STATUS.draft).length
  const recent = [...data.posts].sort((a, b) => new Date(b.updatedAtUtc).getTime() - new Date(a.updatedAtUtc).getTime()).slice(0, 6)
  const metrics = [["Publicados", published], ["Rascunhos", drafts], ["Categorias", data.categories.length], ["Tags", data.tags.length], ["Imagens", data.images.length]] as const

  return <main className="admin-page">
    <header className="admin-page-header"><div><p className="admin-eyebrow">Visão geral</p><h1 className="admin-title">Painel editorial</h1><p className="admin-description">Acompanhe e organize o conteúdo do Blog.</p></div><Link href="/_control/painel/posts/novo" className="admin-primary-action">Novo post</Link></header>

    <dl className="mt-7 grid grid-cols-2 overflow-hidden rounded-lg border border-blue-200/10 bg-blue-400/[.025] sm:grid-cols-5">
      {metrics.map(([label, value]) => <div key={label} className="border-blue-200/10 px-4 py-3 not-last:border-r max-sm:nth-[2]:border-r-0 max-sm:nth-[n+3]:border-t"><dt className="text-[10px] uppercase tracking-[.12em] text-muted-foreground">{label}</dt><dd className="mt-1 text-xl font-semibold text-sky-100">{value}</dd></div>)}
    </dl>

    <section className="mt-7 overflow-hidden rounded-lg border border-blue-200/10 bg-blue-400/[.02]" aria-labelledby="recent-posts"><div className="flex items-center justify-between border-b border-blue-200/10 px-4 py-3"><h2 id="recent-posts" className="text-sm font-semibold">Posts recentes</h2><Link href="/_control/painel/posts" className="text-xs text-sky-300 hover:text-sky-200">Ver todos</Link></div>{recent.length ? <ul className="divide-y divide-blue-200/[.07]">{recent.map(post => <li key={post.id}><Link href={`/_control/painel/posts/${post.id}`} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 px-4 py-3 text-sm transition hover:bg-blue-400/[.035]"><span className="truncate">{post.title}</span><span className={`rounded-full px-2 py-0.5 text-[10px] ${post.status === ADMIN_POST_STATUS.published ? "bg-cyan-400/10 text-cyan-200" : "bg-blue-400/10 text-blue-200"}`}>{post.status === ADMIN_POST_STATUS.published ? "Publicado" : "Rascunho"}</span><time className="hidden text-xs text-muted-foreground sm:block">{date.format(new Date(post.updatedAtUtc))}</time></Link></li>)}</ul> : <p className="p-6 text-sm text-muted-foreground">Nenhum post criado.</p>}</section>
  </main>
}
