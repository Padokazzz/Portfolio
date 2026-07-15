"use server"

import { revalidatePath } from "next/cache"
import {
  AdminApiError, createAdminCategory, createAdminTag, deleteAdminCategory,
  deleteAdminTag, updateAdminCategory, updateAdminTag,
} from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"

export type TaxonomyFormState = { success: boolean; message: string }
type Kind = "category" | "tag"

function values(data: FormData) {
  return { name: String(data.get("name") ?? "").trim(), slug: String(data.get("slug") ?? "").trim().toLowerCase(), description: String(data.get("description") ?? "").trim() || null }
}
function validate(kind: Kind, input: ReturnType<typeof values>) {
  const nameLimit = kind === "category" ? 100 : 80
  const slugLimit = kind === "category" ? 120 : 100
  if (!input.name || input.name.length > nameLimit) return `Informe um nome com até ${nameLimit} caracteres.`
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) || input.slug.length > slugLimit) return "Use um slug em minúsculas, com letras, números e hífens."
  if (kind === "category" && (input.description?.length ?? 0) > 300) return "A descrição deve ter até 300 caracteres."
  return null
}
function apiFailure(error: unknown): TaxonomyFormState {
  if (error instanceof AdminApiError) return { success: false, message: error.status === 409 ? "Já existe um item com este nome ou slug, ou ele ainda está vinculado a posts." : error.message }
  throw error
}
function refresh(kind: Kind) {
  revalidatePath(`/_control/painel/${kind === "category" ? "categorias" : "tags"}`)
  revalidatePath("/_control/painel")
  revalidatePath("/blog")
}

export async function createTaxonomyAction(kind: Kind, _: TaxonomyFormState, data: FormData): Promise<TaxonomyFormState> {
  await requireAdmin()
  const input = values(data); const error = validate(kind, input)
  if (error) return { success: false, message: error }
  try { if (kind === "category") await createAdminCategory(input); else await createAdminTag({ name: input.name, slug: input.slug }) }
  catch (cause) { return apiFailure(cause) }
  refresh(kind)
  return { success: true, message: `${kind === "category" ? "Categoria" : "Tag"} criada com sucesso.` }
}
export async function updateTaxonomyAction(kind: Kind, id: string, _: TaxonomyFormState, data: FormData): Promise<TaxonomyFormState> {
  await requireAdmin()
  const input = values(data); const error = validate(kind, input)
  if (error) return { success: false, message: error }
  try { if (kind === "category") await updateAdminCategory(id, input); else await updateAdminTag(id, { name: input.name, slug: input.slug }) }
  catch (cause) { return apiFailure(cause) }
  refresh(kind)
  return { success: true, message: "Alterações salvas." }
}
export async function deleteTaxonomyAction(kind: Kind, id: string, _: TaxonomyFormState, data: FormData): Promise<TaxonomyFormState> {
  await requireAdmin()
  if (String(data.get("confirmation") ?? "") !== id) return { success: false, message: "Confirmação de exclusão inválida." }
  try { if (kind === "category") await deleteAdminCategory(id); else await deleteAdminTag(id) }
  catch (cause) { return apiFailure(cause) }
  refresh(kind)
  return { success: true, message: `${kind === "category" ? "Categoria" : "Tag"} excluída.` }
}
