import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createTaxonomyAction, deleteTaxonomyAction, updateTaxonomyAction } from "../taxonomy-actions"

export default async function AdminTagsPage() {
  await requireAdmin()
  const items = await getAdminTags()
  return <main className="admin-page"><header className="admin-page-header"><div><p className="admin-eyebrow">Organização</p><h1 className="admin-title">Tags</h1><p className="admin-description">Identifique tecnologias e tópicos específicos.</p></div><span className="text-xs text-muted-foreground">{items.length} cadastradas</span></header><TaxonomyManager kind="tag" items={items} createAction={createTaxonomyAction.bind(null, "tag")} updateAction={updateTaxonomyAction.bind(null, "tag")} deleteAction={deleteTaxonomyAction.bind(null, "tag")} /></main>
}
