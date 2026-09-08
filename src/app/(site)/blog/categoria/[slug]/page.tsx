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
    <main className="blog-public-shell flex-1">
      <Container className="py-20 sm:py-28">
        <header className="max-w-3xl rounded-2xl border border-blue-300/20 bg-gradient-to-br from-blue-500/[.09] to-cyan-400/[.03] p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Coleção · Categoria</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">{category.name}</h1>
          {category.description && <p className="text-lg leading-8 text-muted-foreground">{category.description}</p>}
        </header>
        <div className="mt-8 max-w-3xl"><BlogSearchForm action={basePath} defaultValue={search} /></div>
        <BlogResults posts={posts} title={search ? `Resultados para “${search}”` : `Artigos em ${category.name}`} emptyMessage="Nenhum artigo publicado nesta categoria." search={search} basePath={basePath} />
      </Container>
    </main>
  )
}
