import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import type { PaginatedBlogPosts } from "@/types/blog"

export function BlogResults({
  posts,
  title,
  emptyMessage,
  search,
  basePath,
}: {
  posts: PaginatedBlogPosts
  title: string
  emptyMessage: string
  search?: string
  basePath: string
}) {
  return (
    <section className="mt-12" aria-labelledby="articles-heading">
      <div className="mb-6">
        <h2 id="articles-heading" className="text-xl font-semibold">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
          {posts.totalItems === 1
            ? "1 artigo encontrado"
            : `${posts.totalItems} artigos encontrados`}
        </p>
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
