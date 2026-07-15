"use server"

import { revalidatePath } from "next/cache"
import { AdminApiError, deleteAdminImage, updateAdminImage, uploadAdminImage } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"

export type ImageFormState = { success: boolean; message: string }
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"])
const maximumUploadBytes = Math.floor(4.9 * 1024 * 1024)
const maximumAltTextLength = 300

function failure(error: unknown, conflict: string): ImageFormState {
  if (error instanceof AdminApiError) return { success: false, message: error.status === 409 ? conflict : error.message }
  throw error
}
function refresh() { revalidatePath("/_control/painel/imagens"); revalidatePath("/_control/painel") }

export async function uploadImageAction(_: ImageFormState, data: FormData): Promise<ImageFormState> {
  await requireAdmin()
  const file = data.get("file")
  if (!(file instanceof File) || file.size === 0) return { success: false, message: "Selecione uma imagem." }
  if (file.size > maximumUploadBytes) return { success: false, message: "A imagem deve ter no máximo 4,9 MB." }
  if (!allowedTypes.has(file.type)) return { success: false, message: "Envie uma imagem JPEG, PNG ou WebP." }
  const altText = String(data.get("altText") ?? "").trim()
  if (altText.length > maximumAltTextLength) return { success: false, message: "O texto alternativo deve ter até 300 caracteres." }
  const payload = new FormData(); payload.set("file", file); payload.set("altText", altText)
  try { await uploadAdminImage(payload) } catch (error) { return failure(error, "Não foi possível enviar esta imagem.") }
  refresh(); return { success: true, message: "Imagem enviada com sucesso." }
}
export async function updateImageAction(id: string, _: ImageFormState, data: FormData): Promise<ImageFormState> {
  await requireAdmin()
  const altText = String(data.get("altText") ?? "").trim()
  if (altText.length > maximumAltTextLength) return { success: false, message: "O texto alternativo deve ter até 300 caracteres." }
  try { await updateAdminImage(id, altText || null) }
  catch (error) { return failure(error, "Não foi possível atualizar esta imagem.") }
  refresh(); return { success: true, message: "Texto alternativo atualizado." }
}
export async function deleteImageAction(id: string, _: ImageFormState, data: FormData): Promise<ImageFormState> {
  await requireAdmin()
  if (String(data.get("confirmation") ?? "") !== id) return { success: false, message: "Confirmação de exclusão inválida." }
  try { await deleteAdminImage(id) } catch (error) { return failure(error, "Esta imagem está vinculada a um post e não pode ser excluída.") }
  refresh(); return { success: true, message: "Imagem excluída." }
}
