import { getAdminPosts } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"

export default async function AdminPostsPage() {
  await requireAdmin()
  const posts = await getAdminPosts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Conteúdo</p>
      <h1 className="mt-2 text-3xl font-semibold">Posts</h1>
      <div className="surface mt-8 overflow-hidden rounded-lg border">
        {posts.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {post.status === ADMIN_POST_STATUS.published
                    ? "Publicado"
                    : post.status === ADMIN_POST_STATUS.archived
                      ? "Arquivado"
                      : "Rascunho"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-8 text-sm text-muted-foreground">Nenhum post criado.</p>
        )}
      </div>
    </main>
  )
}
