import { getAdminDashboard } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"

export default async function AdminDashboardPage() {
  await requireAdmin()
  const data = await getAdminDashboard()
  const published = data.posts.filter((post) => post.status === 2).length
  const drafts = data.posts.filter((post) => post.status === 1).length
  const cards = [
    ["Publicados", published],
    ["Rascunhos", drafts],
    ["Categorias", data.categories.length],
    ["Tags", data.tags.length],
    ["Imagens", data.images.length],
  ] as const

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
    </main>
  )
}
