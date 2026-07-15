import { notFound } from "next/navigation"

import { BlogResults } from "@/components/blog/blog-results"
import { BlogSearchForm } from "@/components/blog/blog-search-form"
import { Container } from "@/components/layout/container"
import { getBlogCategories, getPublishedPosts } from "@/lib/api/public-blog"
import { parseBlogSearchParams, type BlogSearchParams } from "@/lib/blog-query"
import { createPageMetadata } from "@/lib/site-metadata"

type CategoryPageProps = {
  params: Promise<{ slug: string }>
  searchParams: BlogSearchParams
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = (await getBlogCategories()).find((item) => item.slug === slug)
  if (!category) notFound()
  return createPageMetadata(
    `Categoria: ${category.name}`,
    category.description ?? `Artigos sobre ${category.name}.`,
    `/blog/categoria/${category.slug}`,
  )
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page, search } = await parseBlogSearchParams(searchParams)
  const category = (await getBlogCategories()).find((item) => item.slug === slug)
  if (!category) notFound()
  const basePath = `/blog/categoria/${category.slug}`
  const posts = await getPublishedPosts({ page, pageSize: 9, search: search || undefined, category: slug })

  return (
    <main className="flex-1">
      <Container className="py-20 sm:py-28">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Categoria</p>
          <h1 className="text-3xl font-semibold sm:text-5xl">{category.name}</h1>
          {category.description && <p className="text-lg leading-8 text-muted-foreground">{category.description}</p>}
        </header>
        <BlogSearchForm action={basePath} defaultValue={search} />
        <BlogResults posts={posts} title={search ? `Resultados para “${search}”` : `Artigos em ${category.name}`} emptyMessage="Nenhum artigo publicado nesta categoria." search={search} basePath={basePath} />
      </Container>
    </main>
  )
}
