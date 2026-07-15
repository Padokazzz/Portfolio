import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock3, Mail, Share2 } from "lucide-react"

import { BlogPostCard } from "@/components/blog/blog-post-card"
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
  const related = await getRelatedPosts(slug)
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
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="py-12 sm:py-20">
        <article className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar ao blog
          </Link>

          <header className="mt-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/categoria/${category.slug}`}
                  className="rounded-full border border-[#e7c78f]/20 bg-[#e7c78f]/10 px-3 py-1 text-xs text-[#f0dfbd]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-balance sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="size-4" />
                {post.readingTimeMinutes} min de leitura
              </span>
            </div>
          </header>

          {post.coverImageUrl && (
            <figure className="surface-soft mx-auto mt-10 aspect-[16/9] max-h-[27rem] max-w-3xl overflow-hidden rounded-xl border p-1.5 shadow-2xl shadow-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImageUrl} alt="" className="size-full rounded-lg object-cover" />
            </figure>
          )}

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

          <footer className="surface-soft mt-16 max-w-3xl rounded-xl border p-5 sm:p-6">
            {post.tags.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog/tag/${tag.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-[#e7c78f]/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7c78f]">
                    #{tag.name}
                  </Link>
                ))}
                </div>
              </div>
            )}
            <nav aria-label="Compartilhar artigo" className={`flex flex-wrap gap-3 ${post.tags.length > 0 ? "mt-6 border-t border-white/10 pt-5" : ""}`}>
              <p className="w-full text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Compartilhar</p>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm transition hover:border-[#e7c78f]/30 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7c78f]"
              >
                <Share2 aria-hidden="true" className="size-4" /> LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm transition hover:border-[#e7c78f]/30 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7c78f]"
              >
                <Share2 aria-hidden="true" className="size-4" /> X
              </a>
              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm transition hover:border-[#e7c78f]/30 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7c78f]"
              >
                <Mail aria-hidden="true" className="size-4" /> E-mail
              </a>
            </nav>
          </footer>
        </article>

        {related.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-12" aria-labelledby="related-heading">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#e7c78f]">Próximas leituras</p>
            <h2 id="related-heading" className="mt-2 text-2xl font-semibold">
              Continue lendo
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <BlogPostCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  )
}
