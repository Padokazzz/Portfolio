import { ArrowUpRight, Clock3 } from "lucide-react"
import Link from "next/link"

import type { BlogPost } from "@/types/blog"
import { cn } from "@/lib/utils"

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function BlogPostCard({ post, variant = "default", index }: { post: BlogPost; variant?: "default" | "featured" | "compact"; index?: number }) {
  const featured = variant === "featured"
  const compact = variant === "compact"
  const hasCover = Boolean(post.coverImageUrl)
  return (
    <article className={cn("group h-full overflow-hidden border-white/10 transition duration-300 hover:border-[#e7c78f]/35", featured && "surface rounded-xl border", featured && (hasCover ? "grid lg:grid-cols-[1.15fr_0.85fr]" : "flex"), compact && "border-t py-5 first:border-t-0 first:pt-0", compact && (hasCover ? "grid grid-cols-[7rem_1fr]" : "block"), variant === "default" && "surface flex flex-col rounded-lg border hover:-translate-y-1")}>
      {post.coverImageUrl && (
        <Link href={`/blog/${post.slug}`} aria-label={`Ler ${post.title}`} className={cn("block overflow-hidden bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7c78f]", featured && "min-h-64 border-b border-white/10 lg:min-h-[26rem] lg:border-r lg:border-b-0", compact && "aspect-square rounded-lg border border-white/10", variant === "default" && "aspect-[16/9] border-b border-white/10")}>
          {/* The backend controls image hosts, so next/image cannot know them at build time. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt=""
            loading={featured ? "eager" : "lazy"}
            fetchPriority={featured ? "high" : "auto"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        </Link>
      )}

      <div className={cn("flex min-w-0 flex-1 flex-col", featured ? "p-6 sm:p-8" : compact ? "py-1 pl-4" : "p-5")}>
        {typeof index === "number" && <span className="mb-4 font-mono text-xs text-[#e7c78f]/70">{String(index).padStart(2, "0")}</span>}
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, compact ? 1 : undefined).map((category) => (
            <Link
              key={category.id}
              href={`/blog/categoria/${category.slug}`}
              className={cn("text-xs font-medium text-[#f0dfbd] transition hover:text-white", !compact && "rounded-full border border-[#e7c78f]/20 bg-[#e7c78f]/10 px-2.5 py-1 hover:bg-[#e7c78f]/15")}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <h3 className={cn("font-semibold leading-snug text-balance", featured ? "mt-5 text-2xl sm:text-3xl" : compact ? "mt-2 line-clamp-3 text-base" : "mt-4 text-xl")}>
          <Link href={`/blog/${post.slug}`} className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7c78f]">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && !compact && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className={cn("mt-auto flex items-center justify-between gap-3 text-xs text-muted-foreground", compact ? "pt-3" : "pt-6")}>
          <time dateTime={post.publishedAt}>
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
          <span className={cn("items-center gap-1.5", compact ? "hidden" : "flex")}>
            <Clock3 aria-hidden="true" className="size-3.5" />
            {post.readingTimeMinutes} min
          </span>
        </div>

        {post.tags.length > 0 && !compact && (
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

        <Link href={`/blog/${post.slug}`} className={cn("mt-4 items-center gap-1 text-sm font-medium text-[#f0dfbd] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7c78f]", compact ? "hidden" : "inline-flex")}>
          Ler artigo
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  )
}
