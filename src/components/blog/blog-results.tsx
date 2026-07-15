import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import type { PaginatedBlogPosts } from "@/types/blog"

export function BlogResults({
  posts,
  title,
  emptyMessage,
  search,
  basePath,
  editorial = false,
}: {
  posts: PaginatedBlogPosts
  title: string
  emptyMessage: string
  search?: string
  basePath: string
  editorial?: boolean
}) {
  const [featured, ...remaining] = posts.items
  const secondary = remaining.slice(0, 2)
  const archive = remaining.slice(2)
  const startIndex = (posts.page - 1) * posts.pageSize
  return (
    <section className="mt-14" aria-labelledby="articles-heading">
      <div className="mb-7 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
        <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#e7c78f]">Arquivo editorial</p>
        <h2 id="articles-heading" className="mt-2 text-2xl font-semibold">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
          {posts.totalItems === 1
            ? "1 artigo encontrado"
            : `${posts.totalItems} artigos encontrados`}
        </p>
        </div>
        <span aria-hidden="true" className="hidden font-mono text-5xl font-light text-white/[0.06] sm:block">{String(posts.page).padStart(2, "0")}</span>
      </div>

      {posts.items.length > 0 ? (
        editorial && featured ? <>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
            <BlogPostCard post={featured} variant="featured" index={startIndex + 1} />
            {secondary.length > 0 && <aside aria-label="Outras leituras em destaque" className="border-y border-white/10 py-5 lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">{secondary.map((post, position) => <BlogPostCard key={post.id} post={post} variant="compact" index={startIndex + position + 2} />)}</aside>}
          </div>
          {archive.length > 0 && <div className="mt-12 grid gap-5 border-t border-white/10 pt-8 md:grid-cols-2 lg:grid-cols-3">{archive.map((post, position) => <BlogPostCard key={post.id} post={post} index={startIndex + position + 4} />)}</div>}
        </> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.items.map((post, position) => <BlogPostCard key={post.id} post={post} index={startIndex + position + 1} />)}</div>
      ) : (
        <div className="surface rounded-lg border px-6 py-12 text-center">
          <h3 className="text-lg font-medium">Nenhum artigo encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      )}

      <BlogPagination
        page={posts.page}
        totalPages={posts.totalPages}
        search={search}
        basePath={basePath}
      />
    </section>
  )
}
