import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import type { PaginatedBlogPosts } from "@/types/blog"

export function BlogResults({ posts, title, emptyMessage, search, basePath, editorial = false }: { posts: PaginatedBlogPosts; title: string; emptyMessage: string; search?: string; basePath: string; editorial?: boolean }) {
  const featuredPosts = posts.items.filter(p => p.isFeatured)
  const featured = editorial && featuredPosts.length > 0 ? featuredPosts[0] : null
  const archive = featured ? posts.items.filter(p => p.id !== featured.id) : posts.items
  const startIndex = (posts.page - 1) * posts.pageSize
  const visibleArticles = featured ? archive.length : posts.totalItems

  return (
    <section className="mt-12" aria-labelledby="articles-heading">
      {featured && <BlogPostCard post={featured} variant="featured" index={startIndex + 1} />}
      <div className="mb-7 mt-14 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[.2em] text-sky-300">Biblioteca editorial</p><h2 id="articles-heading" className="text-2xl font-semibold">{title}</h2></div>
        <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs text-muted-foreground">{visibleArticles} {visibleArticles === 1 ? "artigo" : "artigos"}{featured ? " nesta seção" : ""}</span>
      </div>
      {archive.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archive.map((post, position) => <BlogPostCard key={post.id} post={post} index={startIndex + position + (featured ? 2 : 1)} />)}
        </div>
      ) : !featured ? (
        <div className="rounded-xl border border-blue-300/20 bg-blue-400/[.04] px-6 py-16 text-center">
          <h3 className="text-lg font-medium">Nenhum artigo encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : null}
      <BlogPagination page={posts.page} totalPages={posts.totalPages} search={search} basePath={basePath} />
    </section>
  )
}
