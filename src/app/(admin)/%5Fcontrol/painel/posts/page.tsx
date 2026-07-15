import Link from "next/link"
import { getAdminPosts } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"
import { deletePostAction, transitionPostAction } from "./actions"

export default async function AdminPostsPage() {
  await requireAdmin()
  const posts = await getAdminPosts()
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Conteúdo</p><h1 className="mt-2 text-3xl font-semibold">Posts</h1></div>
        <Link href="/_control/painel/posts/novo" className="rounded-md bg-[#e7c78f] px-4 py-2 text-sm font-medium text-[#191713]">Novo post</Link>
      </div>
      <div className="surface mt-8 overflow-hidden rounded-lg border">
        {posts.length ? <ul className="divide-y divide-white/10">{posts.map(post => (
          <li key={post.id} className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center">
            <div><Link href={`/_control/painel/posts/${post.id}`} className="font-medium hover:text-[#f0dfbd]">{post.title}</Link><p className="mt-1 text-xs text-muted-foreground">/{post.slug} · {post.status === 2 ? "Publicado" : post.status === 3 ? "Arquivado" : "Rascunho"}</p></div>
            <div className="flex flex-wrap gap-2">
              <form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value={post.status === ADMIN_POST_STATUS.published ? "unpublish" : "publish"} /><button className="rounded border border-white/10 px-3 py-1.5 text-xs">{post.status === ADMIN_POST_STATUS.published ? "Despublicar" : "Publicar"}</button></form>
              {post.status !== ADMIN_POST_STATUS.archived && <form action={transitionPostAction}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="transition" value="archive" /><button className="rounded border border-white/10 px-3 py-1.5 text-xs">Arquivar</button></form>}
              <form action={deletePostAction}><input type="hidden" name="id" value={post.id} /><button className="rounded border border-red-400/20 px-3 py-1.5 text-xs text-red-300">Excluir</button></form>
            </div>
          </li>
        ))}</ul> : <p className="p-8 text-sm text-muted-foreground">Nenhum post criado.</p>}
      </div>
    </main>
  )
}
