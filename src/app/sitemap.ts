import type { MetadataRoute } from "next"
import {
  getAllPublishedPosts,
  getBlogCategories,
  getBlogTags,
} from "@/lib/api/public-blog"
import { SITE_URL } from "@/lib/site-metadata"

const routes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/projetos", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/timeline", changeFrequency: "monthly", priority: 0.6 },
  { path: "/uses", changeFrequency: "monthly", priority: 0.6 },
  { path: "/experimentos", changeFrequency: "monthly", priority: 0.5 },
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

  const [postsResult, categoriesResult, tagsResult] = await Promise.allSettled([
    getAllPublishedPosts(),
    getBlogCategories(),
    getBlogTags(),
  ])
  const posts = postsResult.status === "fulfilled" ? postsResult.value : []
  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : []
  const tags = tagsResult.status === "fulfilled" ? tagsResult.value : []

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/blog/categoria/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...tags.map((tag) => ({
      url: `${SITE_URL}/blog/tag/${tag.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ]
}
