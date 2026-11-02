import type { MetadataRoute } from "next"
import { getAllPublishedPosts } from "@/lib/api/public-blog"
import { SITE_URL } from "@/lib/site-metadata"

const routes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/projetos", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projetos/leilao-online", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/timeline", changeFrequency: "monthly", priority: 0.6 },
  { path: "/uses", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contato", changeFrequency: "yearly", priority: 0.5 },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = routes.map(
    ({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
    }),
  )

  const [postsResult] = await Promise.allSettled([getAllPublishedPosts()])
  const posts = postsResult.status === "fulfilled" ? postsResult.value : []

  // Tags e categorias ficam de fora de propósito: são 18 URLs de taxonomia
  // (mais da metade do sitemap) com quase o mesmo conteúdo entre si, o que
  // dilui o valor percebido do arquivo e faz o Google depriorizar o
  // rastreamento do restante do domínio. Elas continuam acessíveis pelos
  // links internos do blog, só não são anunciadas ao crawler.
  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    })),
  ]
}
