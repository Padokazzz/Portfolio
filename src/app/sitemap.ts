import type { MetadataRoute } from "next"
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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }))
}
