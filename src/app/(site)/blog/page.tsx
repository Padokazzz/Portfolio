import { Search } from "lucide-react"

import { BlogPostCard } from "@/components/blog/blog-post-card"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getPublishedPosts } from "@/lib/api/public-blog"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Blog",
  "Artigos e reflexões de Leonardo Padilha sobre desenvolvimento web, engenharia e arquitetura de software.",
  "/blog",
)

type BlogPageProps = {
  searchParams: Promise<{
    page?: string | string[]
    busca?: string | string[]
  }>
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function parsePage(value: string | undefined) {
  const page = Number.parseInt(value ?? "1", 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = await searchParams
  const search = firstValue(query.busca)?.trim() ?? ""
  const posts = await getPublishedPosts({
    page: parsePage(firstValue(query.page)),
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

        <form
          action="/blog"
          role="search"
          className="surface mt-10 flex max-w-2xl gap-2 rounded-lg border p-2"
        >
          <label htmlFor="blog-search" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="blog-search"
            name="busca"
            type="search"
            defaultValue={search}
            placeholder="Busque por título ou conteúdo"
            className="min-w-0 flex-1 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="lg" className="px-4">
            <Search aria-hidden="true" />
            Buscar
          </Button>
        </form>

        <section className="mt-12" aria-labelledby="articles-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="articles-heading" className="text-xl font-semibold">
                {search ? `Resultados para “${search}”` : "Artigos recentes"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
                {posts.totalItems === 1
                  ? "1 artigo encontrado"
                  : `${posts.totalItems} artigos encontrados`}
              </p>
            </div>
          </div>

          {posts.items.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.items.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="surface rounded-lg border px-6 py-12 text-center">
              <h3 className="text-lg font-medium">Nenhum artigo encontrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {search
                  ? "Tente buscar usando outros termos."
                  : "Os primeiros artigos serão publicados em breve."}
              </p>
            </div>
          )}

          <BlogPagination
            page={posts.page}
            totalPages={posts.totalPages}
            search={search}
          />
        </section>
      </Container>
    </main>
  )
}
