import Link from "next/link"
import { redirect } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { getAdminCategories, getAdminPost, getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"
import { updatePostAction } from "../actions"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [post, categories, tags] = await Promise.all([getAdminPost(id), getAdminCategories(), getAdminTags()])
  if (post.status === ADMIN_POST_STATUS.archived) redirect("/_control/painel/posts")
  const action = updatePostAction.bind(null, id)
  return <main className="mx-auto max-w-5xl px-6 py-10"><Link href="/_control/painel/posts" className="text-sm text-muted-foreground">← Voltar aos posts</Link><h1 className="mt-5 text-3xl font-semibold">Editar post</h1><p className="mt-2 text-sm text-muted-foreground">{post.status === ADMIN_POST_STATUS.published ? "Publicado" : "Rascunho"}</p><PostForm key={post.version} post={post} categories={categories} tags={tags} action={action} /></main>
}
