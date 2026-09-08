import Link from "next/link"
import { PostForm } from "@/components/admin/post-form"
import { getAdminCategories, getAdminImages, getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createPostAction } from "../actions"
import { createTaxonomyAction } from "../../taxonomy-actions"
import { uploadImageAction } from "../../imagens/actions"

export default async function NewPostPage() {
  await requireAdmin()
  const [categories, tags, images] = await Promise.all([getAdminCategories(), getAdminTags(), getAdminImages()])
  return <main className="admin-page"><header className="admin-page-header"><div><Link href="/_control/painel/posts" className="text-[11px] text-muted-foreground hover:text-sky-200">Posts / novo</Link><h1 className="admin-title">Criar post</h1><p className="admin-description">Escreva, organize e publique sem sair desta tela.</p></div></header><PostForm categories={categories} tags={tags} images={images} action={createPostAction} createCategoryAction={createTaxonomyAction.bind(null, "category")} createTagAction={createTaxonomyAction.bind(null, "tag")} uploadImageAction={uploadImageAction} /></main>
}
