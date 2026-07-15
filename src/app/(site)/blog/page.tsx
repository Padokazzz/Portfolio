import Link from "next/link"

import { BlogResults } from "@/components/blog/blog-results"
import { BlogSearchForm } from "@/components/blog/blog-search-form"
import { Container } from "@/components/layout/container"
import { getBlogCategories, getPublishedPosts } from "@/lib/api/public-blog"
import { parseBlogSearchParams, type BlogSearchParams } from "@/lib/blog-query"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Blog",
  "Artigos e reflexões de Leonardo Padilha sobre desenvolvimento web, engenharia e arquitetura de software.",
  "/blog",
)

export default async function BlogPage({ searchParams }: { searchParams: BlogSearchParams }) {
  const { page, search } = await parseBlogSearchParams(searchParams)
  const [posts, categories] = await Promise.all([
    getPublishedPosts({ page, pageSize: 9, search: search || undefined }),
    getBlogCategories(),
  ])

  return <main className="flex-1">
    <Container className="py-14 sm:py-20">
      <header className="border-y border-white/10 py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4"><span className="font-mono text-xs text-[#e7c78f]">VOL. 01</span><span className="h-px flex-1 bg-gradient-to-r from-[#e7c78f]/50 to-transparent" /></div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Caderno de engenharia & produto</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">Software além do código.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Decisões técnicas, arquitetura e aprendizados de projetos explicados com contexto — para quem constrói produtos no mundo real.</p>
          </div>
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Encontre uma pauta</p>
            <div className="mt-3"><BlogSearchForm action="/blog" defaultValue={search} /></div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Textos independentes sobre o trabalho por trás de sistemas que precisam durar.</p>
          </div>
        </div>
      </header>

      {categories.length > 0 && <div className="relative border-b border-white/10 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-[#11100f] after:to-transparent"><nav aria-label="Assuntos do blog" className="flex gap-6 overflow-x-auto py-5 pr-12 text-sm">{categories.slice(0, 8).map((category) => <Link key={category.id} href={`/blog/categoria/${category.slug}`} className="shrink-0 text-muted-foreground transition hover:text-[#f0dfbd] focus-visible:text-[#f0dfbd]">{category.name}</Link>)}</nav></div>}

      <BlogResults
        posts={posts}
        title={search ? `Resultados para “${search}”` : "Artigos recentes"}
        emptyMessage={search ? "Tente buscar usando outros termos." : "Os primeiros artigos serão publicados em breve."}
        search={search}
        basePath="/blog"
        editorial={!search && page === 1}
      />
    </Container>
  </main>
}
