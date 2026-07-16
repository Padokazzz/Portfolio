import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock3, Mail, Share2 } from "lucide-react"

import { Container } from "@/components/layout/container"
import {
  getPublishedPost,
  getRelatedPosts,
  PublicBlogApiError,
} from "@/lib/api/public-blog"
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/lib/site-metadata"
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html"

type ArticlePageProps = { params: Promise<{ slug: string }> }

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

async function loadPost(slug: string) {
  try {
    return await getPublishedPost(slug)
  } catch (error) {
    if (error instanceof PublicBlogApiError && error.status === 404) notFound()
    throw error
  }
}

function getCanonicalUrl(canonicalUrl: string | null, slug: string) {
  const fallback = `${SITE_URL}/blog/${slug}`
  if (!canonicalUrl) return fallback

  try {
    const url = new URL(canonicalUrl, SITE_URL)
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : fallback
  } catch {
    return fallback
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  const title = post.seoTitle ?? post.title
  const description = post.seoDescription ?? post.excerpt ?? SITE_DESCRIPTION
  const canonical = getCanonicalUrl(post.canonicalUrl, post.slug)
  const image = post.coverImageUrl ?? SOCIAL_IMAGE.url

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url: canonical,
      title,
      description,
      publishedTime: post.publishedAt,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = await loadPost(slug)
  const related = await getRelatedPosts(slug, 5)
  const articleUrl = `${SITE_URL}/blog/${post.slug}`
  const canonicalUrl = getCanonicalUrl(post.canonicalUrl, post.slug)
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt ?? SITE_DESCRIPTION,
    image: post.coverImageUrl || undefined,
    datePublished: post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    articleSection: post.categories.map((category) => category.name),
    keywords: post.tags.map((tag) => tag.name).join(", "),
  }

  return (
    <main className="blog-public-shell flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="py-12 sm:py-20">
        <article className="mx-auto grid max-w-6xl items-start gap-y-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-10 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-14">
          <header className="min-w-0 border-b border-blue-300/15 pb-8 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/categoria/${category.slug}`}
                  className="text-[11px] font-medium uppercase tracking-[.12em] text-sky-300 transition hover:text-sky-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 break-words text-3xl font-semibold leading-[1.12] tracking-[-.025em] [overflow-wrap:anywhere] sm:text-4xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="size-3.5" />
                {post.readingTimeMinutes} min de leitura
              </span>
            </div>
          </header>

          {post.coverImageUrl && (
            <figure className="flex min-w-0 items-center justify-center lg:col-start-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImageUrl} alt={`Capa do artigo ${post.title}`} className="h-auto max-h-[26.25rem] w-auto max-w-full rounded-md object-contain" />
            </figure>
          )}

          <div className="blog-article-column min-w-0 lg:col-start-1 [overflow-wrap:anywhere]">
          {post.contentHtml ? (
            <div
              className="mt-12 max-w-3xl text-[1.05rem] leading-8 text-[#d8d3c9] [&_a]:font-medium [&_a]:text-[#f0dfbd] [&_a]:underline [&_a]:decoration-[#e7c78f]/40 [&_a]:underline-offset-4 [&_a]:focus-visible:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-[#e7c78f] [&_blockquote]:my-8 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-2 [&_blockquote]:border-[#e7c78f]/60 [&_blockquote]:bg-white/[0.025] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:text-[#c9c3b8] [&_code]:rounded [&_code]:bg-white/[0.07] [&_code]:px-1.5 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_h2]:mb-5 [&_h2]:mt-16 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-foreground [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h4]:mb-3 [&_h4]:mt-8 [&_h4]:font-semibold [&_h4]:text-foreground [&_hr]:my-12 [&_hr]:border-white/10 [&_img]:my-10 [&_img]:max-h-[32rem] [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-white/10 [&_img]:bg-black/20 [&_img]:object-contain [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:my-6 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/35 [&_pre]:p-5 [&_pre]:text-sm [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_td]:border [&_td]:border-white/10 [&_td]:p-3 [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/[0.04] [&_th]:p-3 [&_th]:text-left [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{
                __html: sanitizeBlogHtml(post.contentHtml),
              }}
            />
          ) : (
            <p className="mt-12 text-muted-foreground">
              Este artigo ainda não possui conteúdo disponível.
            </p>
          )}
          </div>

          <footer className="min-w-0 border-t border-blue-300/15 pt-6 lg:col-start-1">
            {post.tags.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog/tag/${tag.slug}`} className="transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                    #{tag.name}
                  </Link>
                ))}
                </div>
              </div>
            )}
            <nav aria-label="Compartilhar artigo" className={`flex flex-wrap items-center gap-4 ${post.tags.length > 0 ? "mt-5" : ""}`}>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Compartilhar</p>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Share2 aria-hidden="true" className="size-3.5" /> LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Share2 aria-hidden="true" className="size-3.5" /> X
              </a>
              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Mail aria-hidden="true" className="size-3.5" /> E-mail
              </a>
            </nav>
          </footer>

          <aside className="min-w-0 space-y-5 lg:col-start-2 lg:row-start-1 lg:row-span-4" aria-label="Artigos relacionados">
            {related.length > 0 && <section className="relative overflow-hidden rounded-xl border border-blue-300/15 bg-gradient-to-br from-blue-500/[.055] to-cyan-400/[.02] p-4 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-300/80 before:via-blue-400/60 before:to-transparent" aria-labelledby="related-heading">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sky-300">Recomendados</p>
              <h2 id="related-heading" className="mt-1 text-base font-semibold">Continue explorando</h2>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">Leituras relacionadas e outros artigos do Blog.</p>
              <div className="mt-4 divide-y divide-blue-200/[.10]">{related.slice(0, 5).map((item) => <article key={item.id} className="group py-3 first:pt-0 last:pb-0">
                <Link href={`/blog/${item.slug}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3" aria-label={`Ler ${item.title}`}>
                  {item.coverImageUrl ? <div className="aspect-[4/3] overflow-hidden rounded-md border border-cyan-300/10 bg-black/20 shadow-[0_6px_20px_rgba(2,132,199,.06)]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- imagens do CMS podem usar origens dinâmicas */}
                    <img src={item.coverImageUrl} alt={`Capa de ${item.title}`} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  </div> : <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-blue-300/10 bg-gradient-to-br from-blue-400/[.09] to-cyan-400/[.04]"><span className="text-[9px] uppercase tracking-[.12em] text-sky-200/70">Artigo</span></div>}
                  <div className="min-w-0 self-center">
                    <p className="truncate text-[9px] font-semibold uppercase tracking-[.12em] text-sky-300">{item.categories[0]?.name ?? "Artigo"}</p>
                    <h3 className="mt-0.5 line-clamp-2 break-words text-xs font-semibold leading-4 [overflow-wrap:anywhere] transition group-hover:text-sky-200">{item.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-muted-foreground">{item.excerpt || "Leia mais no Blog."}</p>
                  </div>
                </Link>
              </article>)}</div>
            </section>}

            <Link href="/blog" className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-300/20 bg-yellow-300/[.035] px-3 py-2 text-xs font-medium text-yellow-100/80 transition hover:border-yellow-300/35 hover:bg-yellow-300/[.07] hover:text-yellow-100">Todos os artigos <ArrowRight className="size-3.5" /></Link>
          </aside>
        </article>

      </Container>
    </main>
  )
}
