import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { getAllPublishedPosts } from "@/lib/api/public-blog"
import { cn } from "@/lib/utils"

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date)
}

const POST_COUNT = 3

/**
 * Blocos de leitura da home: traz os artigos recentes para o primeiro nível
 * de navegação. Antes a home só linkava para `/blog`, deixando cada post a
 * dois cliques de distância — a forma mais barata de sinalizar ao crawler
 * quais páginas merecem rastreamento.
 */
export async function HomeBlog() {
  const [postsResult] = await Promise.allSettled([getAllPublishedPosts()])
  const posts =
    postsResult.status === "fulfilled"
      ? postsResult.value.slice(0, POST_COUNT)
      : []

  return (
    <section id="blog" className="scroll-mt-20 border-t border-white/10">
      <div className="section-shell flex flex-col justify-center">
        <Reveal className="mb-6 max-w-2xl space-y-3">
          <div className="h-1 w-20 rounded-full accent-line" />
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Blog
          </p>
          <h2 className="text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
            Artigos sobre programar, criar e continuar.
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Reflexoes publicadas direto do blog: arquitetura de software, o dia
            a dia de construir produto e o que o codigo ensina fora da tela.
          </p>
        </Reveal>

        {posts.length > 0 && (
          <ul className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="min-w-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="surface group flex h-full flex-col rounded-lg border p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/40 hover:bg-white/[0.055]"
                >
                  {post.categories[0] && (
                    <span className="mb-3 w-fit rounded-md border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2.5 py-1 text-xs text-[#a78bfa]">
                      {post.categories[0].name}
                    </span>
                  )}

                  <h3 className="font-semibold leading-snug text-balance">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}

                  <span
                    className={cn(
                      "mt-auto flex items-center gap-1.5 pt-5 text-xs text-muted-foreground",
                      "transition duration-300 group-hover:text-[#a78bfa]",
                    )}
                  >
                    Ler artigo
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                    {formatDate(post.publishedAt) && (
                      <time
                        dateTime={post.publishedAt}
                        className="ml-auto tabular-nums"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Reveal delay={0.08} className="mt-6">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/40 hover:bg-white/[0.07]"
          >
            Ver todos os artigos
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
