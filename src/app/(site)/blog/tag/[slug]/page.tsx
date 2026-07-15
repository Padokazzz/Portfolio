import { notFound } from "next/navigation"

import { BlogResults } from "@/components/blog/blog-results"
import { BlogSearchForm } from "@/components/blog/blog-search-form"
import { Container } from "@/components/layout/container"
import { getBlogTags, getPublishedPosts } from "@/lib/api/public-blog"
import { parseBlogSearchParams, type BlogSearchParams } from "@/lib/blog-query"
import { createPageMetadata } from "@/lib/site-metadata"

type TagPageProps = { params: Promise<{ slug: string }>; searchParams: BlogSearchParams }

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const tag = (await getBlogTags()).find((item) => item.slug === slug)
  if (!tag) notFound()
  return createPageMetadata(`Tag: ${tag.name}`, `Artigos marcados com ${tag.name}.`, `/blog/tag/${tag.slug}`)
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params
  const { page, search } = await parseBlogSearchParams(searchParams)
  const tag = (await getBlogTags()).find((item) => item.slug === slug)
  if (!tag) notFound()
  const basePath = `/blog/tag/${tag.slug}`
  const posts = await getPublishedPosts({ page, pageSize: 9, search: search || undefined, tag: slug })

  return (
    <main className="flex-1">
      <Container className="py-20 sm:py-28">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Tag</p>
          <h1 className="text-3xl font-semibold sm:text-5xl">#{tag.name}</h1>
        </header>
        <BlogSearchForm action={basePath} defaultValue={search} />
        <BlogResults posts={posts} title={search ? `Resultados para “${search}”` : `Artigos com #${tag.name}`} emptyMessage="Nenhum artigo publicado com esta tag." search={search} basePath={basePath} />
      </Container>
    </main>
  )
}
