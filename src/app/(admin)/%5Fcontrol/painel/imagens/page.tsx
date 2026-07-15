import { ImageLibrary } from "@/components/admin/image-library"
import { getAdminImages } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { deleteImageAction, updateImageAction, uploadImageAction } from "./actions"

export default async function AdminImagesPage() {
  await requireAdmin()
  const images = await getAdminImages()
  return <main className="mx-auto max-w-6xl px-6 py-10"><p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Mídia</p><h1 className="mt-2 text-3xl font-semibold">Imagens</h1><p className="mt-3 text-sm text-muted-foreground">JPEG, PNG ou WebP, com no máximo 4,9 MB. Imagens vinculadas a posts não podem ser excluídas.</p><ImageLibrary images={images} uploadAction={uploadImageAction} updateAction={updateImageAction} deleteAction={deleteImageAction} /></main>
}
