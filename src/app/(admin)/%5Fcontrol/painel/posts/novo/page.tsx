import Link from "next/link"
import { PostForm } from "@/components/admin/post-form"
import { getAdminCategories, getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createPostAction } from "../actions"

export default async function NewPostPage() {
  await requireAdmin()
  const [categories, tags] = await Promise.all([getAdminCategories(), getAdminTags()])
  return <main className="mx-auto max-w-5xl px-6 py-10"><Link href="/_control/painel/posts" className="text-sm text-muted-foreground">← Voltar aos posts</Link><h1 className="mt-5 text-3xl font-semibold">Novo post</h1><PostForm categories={categories} tags={tags} action={createPostAction} /></main>
}
