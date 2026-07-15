import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { getAdminTags } from "@/lib/api/admin-blog.server"
import { requireAdmin } from "@/lib/auth/session.server"
import { createTaxonomyAction, deleteTaxonomyAction, updateTaxonomyAction } from "../taxonomy-actions"

export default async function AdminTagsPage() {
  await requireAdmin()
  const items = await getAdminTags()
  return <main className="mx-auto max-w-6xl px-6 py-10"><p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Organização</p><h1 className="mt-2 text-3xl font-semibold">Tags</h1><TaxonomyManager kind="tag" items={items} createAction={createTaxonomyAction.bind(null, "tag")} updateAction={(id) => updateTaxonomyAction.bind(null, "tag", id)} deleteAction={(id) => deleteTaxonomyAction.bind(null, "tag", id)} /></main>
}
