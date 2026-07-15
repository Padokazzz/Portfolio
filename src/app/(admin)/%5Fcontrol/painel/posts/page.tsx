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
  return <main className="mx-auto max-w-6xl px-6 py-10">
    <div className="flex items-end justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Conteúdo</p><h1 className="mt-2 text-3xl font-semibold">Posts</h1></div><Link href="/_control/painel/posts/novo" className="rounded-md bg-[#e7c78f] px-4 py-2 text-sm font-medium text-[#191713]">Novo post</Link></div>
    <form className="mt-8 grid gap-3 sm:grid-cols-[1fr_12rem_auto]"><input name="busca" defaultValue={query.busca} placeholder="Buscar por título ou slug" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm" /><select name="status" defaultValue={query.status ?? ""} className="rounded-md border border-white/10 bg-[#11100f] px-3 py-2 text-sm"><option value="">Todos os status</option><option value="1">Rascunhos</option><option value="2">Publicados</option><option value="3">Arquivados</option></select><button className="rounded-md border border-white/10 px-4 py-2 text-sm">Filtrar</button></form>
    {query.erro && <p role="alert" className="mt-4 text-sm text-red-300">{query.erro}</p>}
    <div className="surface mt-5 overflow-hidden rounded-lg border">{filtered.length ? <ul className="divide-y divide-white/10">{filtered.map(post => <li key={post.id} className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center"><div>{post.status === ADMIN_POST_STATUS.archived ? <span className="font-medium">{post.title}</span> : <Link href={`/_control/painel/posts/${post.id}`} className="font-medium hover:text-[#f0dfbd]">{post.title}</Link>}<p className="mt-1 text-xs text-muted-foreground">/{post.slug} · {labels[post.status]}</p></div><div className="flex flex-wrap gap-2">
      {post.status !== ADMIN_POST_STATUS.archived && <><form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value={post.status === ADMIN_POST_STATUS.published ? "unpublish" : "publish"} /><button className="rounded border border-white/10 px-3 py-1.5 text-xs">{post.status === ADMIN_POST_STATUS.published ? "Despublicar" : "Publicar"}</button></form><form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value="archive" /><button className="rounded border border-white/10 px-3 py-1.5 text-xs">Arquivar</button></form></>}
      {post.status === ADMIN_POST_STATUS.archived && <form action={deletePostAction}><input type="hidden" name="id" value={post.id} /><DeletePostButton /></form>}
    </div></li>)}</ul> : <p className="p-8 text-sm text-muted-foreground">Nenhum post encontrado.</p>}</div>
  </main>
}
