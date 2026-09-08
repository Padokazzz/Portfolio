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
    getPublishedPosts({ page, pageSize: 10, search: search || undefined }),
    getBlogCategories(),
  ])

  return (
    <main className="blog-public-shell flex-1">
      <Container className="py-14 sm:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{"// Blog · ideias em construção"}</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-balance sm:text-5xl">
            Compartilhando conhecimento.<br />
            Criando <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-200 bg-clip-text text-transparent">impacto.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pensamentos, tutoriais, arquitetura de software, experiências reais e tudo que aprendo durante minha jornada como desenvolvedor.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <BlogSearchForm action="/blog" defaultValue={search} />
          </div>
        </header>

        <nav id="categorias" aria-label="Categorias do blog" className="mx-auto mt-9 flex max-w-4xl scroll-mt-24 justify-start gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/10 p-2 sm:justify-center">
          <Link href="/blog" className="shrink-0 rounded-lg bg-yellow-300 px-4 py-2 text-xs font-semibold text-[#191713] transition hover:bg-yellow-200">Todos</Link>
          {categories.slice(0, 9).map((category, index) => (
            <Link key={category.id} href={`/blog/categoria/${category.slug}`} className={`shrink-0 rounded-lg border px-4 py-2 text-xs transition ${index % 3 === 0 ? "border-cyan-300/20 text-cyan-100 hover:bg-cyan-400/10" : index % 3 === 1 ? "border-violet-300/20 text-violet-100 hover:bg-violet-400/10" : "border-emerald-300/20 text-emerald-100 hover:bg-emerald-400/10"}`}>
              {category.name}
            </Link>
          ))}
        </nav>

        <BlogResults
          posts={posts}
          title={search ? `Resultados para “${search}”` : "Todos os artigos"}
          emptyMessage={search ? "Tente buscar usando outros termos." : "Os primeiros artigos serão publicados em breve."}
          search={search}
          basePath="/blog"
          editorial={!search && page === 1}
        />
      </Container>
    </main>
  )
}
