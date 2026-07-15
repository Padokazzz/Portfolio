import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { getAdminCategories } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createTaxonomyAction, deleteTaxonomyAction, updateTaxonomyAction } from "../taxonomy-actions"

export default async function AdminCategoriesPage() {
  await requireAdmin()
  const items = await getAdminCategories()
  return <main className="mx-auto max-w-6xl px-6 py-10"><p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Organização</p><h1 className="mt-2 text-3xl font-semibold">Categorias</h1><p className="mt-3 text-sm text-muted-foreground">Categorias vinculadas a posts não podem ser excluídas.</p><TaxonomyManager kind="category" items={items} createAction={createTaxonomyAction.bind(null, "category")} updateAction={updateTaxonomyAction.bind(null, "category")} deleteAction={deleteTaxonomyAction.bind(null, "category")} /></main>
}
