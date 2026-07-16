import { ImageLibrary } from "@/components/admin/image-library"
import { getAdminImages } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { deleteImageAction, updateImageAction, uploadImageAction } from "./actions"

export default async function AdminImagesPage() {
  await requireAdmin()
  const images = await getAdminImages()
  return <main className="admin-page"><header className="admin-page-header"><div><p className="admin-eyebrow">Mídia</p><h1 className="admin-title">Imagens</h1><p className="admin-description">JPEG, PNG ou WebP · máximo de 4,9 MB.</p></div><span className="text-xs text-muted-foreground">{images.length} arquivos</span></header><ImageLibrary images={images} uploadAction={uploadImageAction} updateAction={updateImageAction} deleteAction={deleteImageAction} /></main>
}
