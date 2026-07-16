"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { AdminApiError, changeAdminPostStatus, createAdminPost, createAndPublishAdminPost, deleteAdminPost, updateAdminPost, updateAndPublishAdminPost } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import type { AdminPostInput } from "@/types/admin"

export type PostFormState = { message: string; success: boolean }

const optional = (data: FormData, name: string) => String(data.get(name) ?? "").trim() || null
function parsePost(data: FormData): AdminPostInput {
  return {
    title: String(data.get("title") ?? "").trim(), slug: String(data.get("slug") ?? "").trim().toLowerCase(),
    excerpt: optional(data, "excerpt"), contentJson: optional(data, "contentJson"), contentHtml: optional(data, "contentHtml"),
    coverImageUrl: optional(data, "coverImageUrl"), seoTitle: optional(data, "seoTitle"), seoDescription: optional(data, "seoDescription"),
    canonicalUrl: optional(data, "canonicalUrl"), categoryIds: data.getAll("categoryIds").map(String), tagIds: data.getAll("tagIds").map(String),
    version: optional(data, "version"),
  }
}
function validate(input: AdminPostInput) {
  if (!input.title || input.title.length > 200) return "Informe um título com até 200 caracteres."
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) || input.slug.length > 220) return "Use um slug em minúsculas, com letras, números e hífens."
  if ((input.excerpt?.length ?? 0) > 500) return "O resumo deve ter até 500 caracteres."
  if ((input.seoTitle?.length ?? 0) > 70) return "O título SEO deve ter até 70 caracteres."
  if ((input.seoDescription?.length ?? 0) > 170) return "A descrição SEO deve ter até 170 caracteres."
  if (input.categoryIds.length > 5) return "Selecione no máximo 5 categorias."
  if (input.tagIds.length > 10) return "Selecione no máximo 10 tags."
  if (input.contentJson) { try { JSON.parse(input.contentJson) } catch { return "O conteúdo JSON é inválido." } }
  return null
}
function failure(error: unknown): PostFormState {
  if (error instanceof AdminApiError) return { success: false, message: error.status === 409 ? "Este post mudou em outra sessão. Recarregue a página antes de salvar novamente." : error.message }
  throw error
}
function refreshPublicBlog() {
  revalidateTag("public-blog", { expire: 0 })
  revalidatePath("/blog")
  revalidatePath("/sitemap.xml")
  revalidatePath("/rss.xml")
}

export async function createPostAction(_: PostFormState, data: FormData): Promise<PostFormState> {
  await requireAdmin()
  const input = parsePost(data); const error = validate(input)
  if (error) return { success: false, message: error }
  const publish = data.get("intent") === "publish"
  let post
  try { post = await (publish ? createAndPublishAdminPost(input) : createAdminPost(input)) } catch (cause) { return failure(cause) }
  revalidatePath("/_control/painel/posts")
  refreshPublicBlog()
  redirect(publish ? "/_control/painel/posts" : `/_control/painel/posts/${post.id}`)
}
export async function updatePostAction(id: string, _: PostFormState, data: FormData): Promise<PostFormState> {
  await requireAdmin()
  const input = parsePost(data); const error = validate(input)
  if (error) return { success: false, message: error }
  const publish = data.get("intent") === "publish"
  try { await (publish ? updateAndPublishAdminPost(id, input) : updateAdminPost(id, input)) } catch (cause) { return failure(cause) }
  revalidatePath("/_control/painel/posts")
  revalidatePath(`/_control/painel/posts/${id}`)
  refreshPublicBlog()
  redirect("/_control/painel/posts")
}
export async function transitionPostAction(data: FormData) {
  await requireAdmin()
  const id = String(data.get("id") ?? ""); const transition = String(data.get("transition") ?? "")
  if (!id || !["publish", "unpublish", "archive"].includes(transition)) return
  let errorMessage = ""
  try { await changeAdminPostStatus(id, transition as "publish" | "unpublish" | "archive") }
  catch (error) { if (error instanceof AdminApiError) errorMessage = error.message; else throw error }
  if (errorMessage) redirect(`/_control/painel/posts?erro=${encodeURIComponent(errorMessage)}`)
  revalidatePath("/_control/painel/posts"); refreshPublicBlog()
}
export async function deletePostAction(data: FormData) {
  await requireAdmin()
  const id = String(data.get("id") ?? ""); if (!id) return
  let errorMessage = ""
  try { await deleteAdminPost(id) }
  catch (error) { if (error instanceof AdminApiError) errorMessage = error.message; else throw error }
  if (errorMessage) redirect(`/_control/painel/posts?erro=${encodeURIComponent(errorMessage)}`)
  revalidatePath("/_control/painel/posts")
  refreshPublicBlog()
}
