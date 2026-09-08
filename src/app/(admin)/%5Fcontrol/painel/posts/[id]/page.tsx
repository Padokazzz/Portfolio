import Link from "next/link"
import { redirect } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { getAdminCategories, getAdminImages, getAdminPost, getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { ADMIN_POST_STATUS } from "@/types/admin"
import { updatePostAction } from "../actions"
import { createTaxonomyAction } from "../../taxonomy-actions"
import { uploadImageAction } from "../../imagens/actions"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [post, categories, tags, images] = await Promise.all([getAdminPost(id), getAdminCategories(), getAdminTags(), getAdminImages()])
  if (post.status === ADMIN_POST_STATUS.archived) redirect("/_control/painel/posts")
  return <main className="admin-page"><header className="admin-page-header"><div><Link href="/_control/painel/posts" className="text-[11px] text-muted-foreground hover:text-sky-200">Posts / editar</Link><div className="mt-1 flex items-center gap-2"><h1 className="admin-title mt-0">{post.title}</h1><span className={`rounded-full px-2 py-0.5 text-[9px] ${post.status === ADMIN_POST_STATUS.published ? "bg-cyan-400/10 text-cyan-200" : "bg-blue-400/10 text-blue-200"}`}>{post.status === ADMIN_POST_STATUS.published ? "Publicado" : "Rascunho"}</span></div></div></header><PostForm key={post.version} post={post} categories={categories} tags={tags} images={images} action={updatePostAction.bind(null, id)} createCategoryAction={createTaxonomyAction.bind(null, "category")} createTagAction={createTaxonomyAction.bind(null, "tag")} uploadImageAction={uploadImageAction} /></main>
}
