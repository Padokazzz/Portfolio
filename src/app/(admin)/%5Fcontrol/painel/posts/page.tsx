import Link from "next/link"
import { DeletePostButton } from "@/components/admin/delete-post-button"
import { getAdminPosts } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS, type AdminPostStatus } from "@/types/admin"
import { deletePostAction, transitionPostAction } from "./actions"

const labels: Record<AdminPostStatus, string> = { 1: "Rascunho", 2: "Publicado", 3: "Arquivado" }
type Props = { searchParams: Promise<{ busca?: string; status?: string; erro?: string }> }

export default async function AdminPostsPage({ searchParams }: Props) {
  await requireAdmin()
  const [posts, query] = await Promise.all([getAdminPosts(), searchParams])
  const search = query.busca?.trim().toLocaleLowerCase("pt-BR") ?? ""
  const status = Number(query.status || 0)
  const filtered = posts.filter(post => (!search || `${post.title} ${post.slug}`.toLocaleLowerCase("pt-BR").includes(search)) && (!status || post.status === status))

  return <main className="admin-page"><header className="admin-page-header"><div><p className="admin-eyebrow">Conteúdo</p><h1 className="admin-title">Posts</h1><p className="admin-description">Crie, revise e publique artigos.</p></div><Link href="/_control/painel/posts/novo" className="admin-primary-action">Novo post</Link></header>
    <form className="mt-6 flex flex-wrap gap-2"><input name="busca" defaultValue={query.busca} placeholder="Buscar título ou slug" className="admin-input min-w-52 flex-1" /><select name="status" defaultValue={query.status ?? ""} className="admin-input bg-[#0d1118]"><option value="">Todos</option><option value="1">Rascunhos</option><option value="2">Publicados</option><option value="3">Arquivados</option></select><button className="admin-secondary-action">Filtrar</button></form>
    {query.erro && <p role="alert" className="mt-3 text-xs text-red-300">{query.erro}</p>}
    <section className="mt-4 overflow-hidden rounded-lg border border-blue-200/10 bg-blue-400/[.02]">{filtered.length ? <ul className="divide-y divide-blue-200/[.07]">{filtered.map(post => <li key={post.id} className="grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div className="min-w-0"><div className="flex items-center gap-2">{post.status === ADMIN_POST_STATUS.archived ? <span className="truncate text-sm font-medium">{post.title}</span> : <Link href={`/_control/painel/posts/${post.id}`} className="truncate text-sm font-medium hover:text-sky-200">{post.title}</Link>}<span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] ${post.status === ADMIN_POST_STATUS.published ? "bg-cyan-400/10 text-cyan-200" : "bg-blue-400/10 text-blue-200"}`}>{labels[post.status]}</span></div><p className="mt-0.5 truncate text-[11px] text-muted-foreground">/{post.slug}{post.excerpt ? ` · ${post.excerpt}` : ""}</p></div><div className="flex gap-3 text-[11px]">{post.status !== ADMIN_POST_STATUS.archived && <><form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value={post.status === ADMIN_POST_STATUS.published ? "unpublish" : "publish"} /><button className="text-sky-300 hover:text-sky-200">{post.status === ADMIN_POST_STATUS.published ? "Despublicar" : "Publicar"}</button></form><form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value="archive" /><button className="text-muted-foreground hover:text-foreground">Arquivar</button></form></>}{post.status === ADMIN_POST_STATUS.archived && <form action={deletePostAction}><input type="hidden" name="id" value={post.id} /><DeletePostButton /></form>}</div></li>)}</ul> : <p className="p-6 text-sm text-muted-foreground">Nenhum post encontrado.</p>}</section>
  </main>
}
