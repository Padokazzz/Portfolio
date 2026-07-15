import { ArrowUpRight, Clock3 } from "lucide-react"
import Link from "next/link"

import type { BlogPost } from "@/types/blog"

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="surface group flex h-full flex-col overflow-hidden rounded-lg border transition duration-300 hover:-translate-y-1 hover:border-[#e7c78f]/35">
      {post.coverImageUrl && (
        <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-white/[0.03]">
          {/* The backend controls image hosts, so next/image cannot know them at build time. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/categoria/${category.slug}`}
              className="rounded-full border border-[#e7c78f]/20 bg-[#e7c78f]/10 px-2.5 py-1 text-xs text-[#f0dfbd] transition hover:bg-[#e7c78f]/15"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-snug text-balance">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {post.readingTimeMinutes} min
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="relative mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/10 pt-4 text-xs text-muted-foreground">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="hover:text-foreground"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#f0dfbd]">
          Ler artigo
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </article>
  )
}
