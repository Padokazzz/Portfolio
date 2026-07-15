import Link from "next/link"

import { getAdminDashboard } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"

export default async function AdminDashboardPage() {
  await requireAdmin()
  const data = await getAdminDashboard()
  const published = data.posts.filter(
    (post) => post.status === ADMIN_POST_STATUS.published,
  ).length
  const drafts = data.posts.filter(
    (post) => post.status === ADMIN_POST_STATUS.draft,
  ).length
  const cards = [
    ["Publicados", published],
    ["Rascunhos", drafts],
    ["Categorias", data.categories.length],
    ["Tags", data.tags.length],
    ["Imagens", data.images.length],
  ] as const
  const recentPosts = [...data.posts]
    .sort(
      (left, right) =>
        new Date(right.updatedAtUtc).getTime() -
        new Date(left.updatedAtUtc).getTime(),
    )
    .slice(0, 5)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Visão geral</p>
      <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([label, value]) => (
          <article key={label} className="surface rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <section className="surface rounded-lg border p-6" aria-labelledby="recent-posts">
          <h2 id="recent-posts" className="text-lg font-semibold">Posts recentes</h2>
          {recentPosts.length > 0 ? (
            <ul className="mt-4 divide-y divide-white/10">
              {recentPosts.map((post) => (
                <li key={post.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="truncate">{post.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {post.status === ADMIN_POST_STATUS.published ? "Publicado" : "Rascunho"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Nenhum post criado.</p>
          )}
        </section>

        <aside className="surface rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Atalhos</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/_control/painel/posts" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Gerenciar posts</Link>
            <Link href="/_control/painel/categorias" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Gerenciar categorias</Link>
            <Link href="/_control/painel/tags" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Gerenciar tags</Link>
            <Link href="/_control/painel/imagens" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Gerenciar imagens</Link>
            <Link href="/blog" target="_blank" className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/[0.05]">Abrir blog público</Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
