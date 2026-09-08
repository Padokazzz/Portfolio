import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { getAdminCategories } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createTaxonomyAction, deleteTaxonomyAction, updateTaxonomyAction } from "../taxonomy-actions"

export default async function AdminCategoriesPage() {
  await requireAdmin()
  const items = await getAdminCategories()
  return <main className="admin-page"><header className="admin-page-header"><div><p className="admin-eyebrow">Organização</p><h1 className="admin-title">Categorias</h1><p className="admin-description">Agrupe os posts por assunto principal.</p></div><span className="text-xs text-muted-foreground">{items.length} cadastradas</span></header><TaxonomyManager kind="category" items={items} createAction={createTaxonomyAction.bind(null, "category")} updateAction={updateTaxonomyAction.bind(null, "category")} deleteAction={deleteTaxonomyAction.bind(null, "category")} /></main>
}
