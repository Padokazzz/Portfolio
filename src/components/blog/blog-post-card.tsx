import { ArrowRight, Clock3 } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date)
}

const palettes = [
  { border: "border-blue-300/20 hover:border-blue-300/50", glow: "from-blue-500/10", badge: "bg-blue-400/10 text-blue-200", button: "bg-yellow-300 text-[#191713] hover:bg-yellow-200" },
  { border: "border-cyan-300/20 hover:border-cyan-300/50", glow: "from-cyan-400/10", badge: "bg-cyan-400/10 text-cyan-100", button: "bg-yellow-300 text-[#191713] hover:bg-yellow-200" },
  { border: "border-sky-300/20 hover:border-sky-300/50", glow: "from-sky-500/10", badge: "bg-sky-400/10 text-sky-200", button: "bg-yellow-300 text-[#191713] hover:bg-yellow-200" },
  { border: "border-indigo-300/20 hover:border-indigo-300/50", glow: "from-indigo-500/10", badge: "bg-indigo-400/10 text-indigo-200", button: "bg-yellow-300 text-[#191713] hover:bg-yellow-200" },
] as const

export function BlogPostCard({ post, variant = "default", index = 0 }: { post: BlogPost; variant?: "default" | "featured" | "compact"; index?: number }) {
  const featured = variant === "featured"
  const palette = palettes[index % palettes.length]

  return (
    <article className={cn(
      "group overflow-hidden rounded-xl border bg-[linear-gradient(145deg,rgba(28,27,25,.94),rgba(15,15,14,.98))] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,.28)]",
      palette.border,
      featured && "grid min-h-[20rem] hover:translate-y-0 lg:grid-cols-[1.02fr_1fr]",
    )}>
      {post.coverImageUrl && (
        <Link href={`/blog/${post.slug}`} aria-label={`Ler ${post.title}`} className={cn("block overflow-hidden", featured ? "order-2 min-h-64 lg:min-h-full" : "aspect-[16/9]")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImageUrl} alt={`Capa de ${post.title}`} loading={featured ? "eager" : "lazy"} fetchPriority={featured ? "high" : "auto"} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </Link>
      )}

      <div className={cn("flex flex-col bg-gradient-to-br to-transparent p-5", palette.glow, featured && "order-1 justify-center p-7 sm:p-10")}>
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 1).map((category) => (
            <Link key={category.id} href={`/blog/categoria/${category.slug}`} className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide", palette.badge)}>{featured ? "Destaque" : category.name}</Link>
          ))}
        </div>
        <h3 className={cn("mt-4 font-semibold leading-tight text-balance", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
          <Link href={`/blog/${post.slug}`} className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ed]">{post.title}</Link>
        </h3>
        {post.excerpt && <p className={cn("mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground", featured && "max-w-md")}>{post.excerpt}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Clock3 className="size-3" />{post.readingTimeMinutes} min</span>
          {post.categories[0] && <span>{post.categories[0].name}</span>}
          {formatDate(post.publishedAt) && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        </div>
        {featured && <Link href={`/blog/${post.slug}`} className={cn("mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition", palette.button)}>Ler artigo <ArrowRight className="size-4" /></Link>}
      </div>
    </article>
  )
}
