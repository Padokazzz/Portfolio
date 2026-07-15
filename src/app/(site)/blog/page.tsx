import { BlogResults } from "@/components/blog/blog-results"
import { BlogSearchForm } from "@/components/blog/blog-search-form"
import { Container } from "@/components/layout/container"
import { getPublishedPosts } from "@/lib/api/public-blog"
import {
  parseBlogSearchParams,
  type BlogSearchParams,
} from "@/lib/blog-query"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Blog",
  "Artigos e reflexões de Leonardo Padilha sobre desenvolvimento web, engenharia e arquitetura de software.",
  "/blog",
)

export default async function BlogPage({
  searchParams,
}: {
  searchParams: BlogSearchParams
}) {
  const { page, search } = await parseBlogSearchParams(searchParams)
  const posts = await getPublishedPosts({
    page,
    pageSize: 9,
    search: search || undefined,
  })

  return (
    <main className="flex-1">
      <Container className="py-20 sm:py-28">
        <header className="max-w-3xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Blog
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-balance sm:text-5xl">
            Ideias práticas sobre software, arquitetura e produto.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Artigos sobre decisões técnicas, aprendizados de projetos e os
            detalhes que fazem um sistema funcionar bem no mundo real.
          </p>
        </header>

        <BlogSearchForm action="/blog" defaultValue={search} />
        <BlogResults
          posts={posts}
          title={search ? `Resultados para “${search}”` : "Artigos recentes"}
          emptyMessage={
            search
              ? "Tente buscar usando outros termos."
              : "Os primeiros artigos serão publicados em breve."
          }
          search={search}
          basePath="/blog"
        />
      </Container>
    </main>
  )
}
