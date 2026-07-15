import { getAllPublishedPosts } from "@/lib/api/public-blog"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-metadata"

export const revalidate = 300

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export async function GET() {
  let posts = [] as Awaited<ReturnType<typeof getAllPublishedPosts>>

  try {
    posts = await getAllPublishedPosts()
  } catch {
    // A valid empty feed is preferable to exposing an internal API failure.
  }

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const categories = post.categories
        .map((category) => `<category>${escapeXml(category.name)}</category>`)
        .join("")
      const tags = post.tags
        .map((tag) => `<category>${escapeXml(tag.name)}</category>`)
        .join("")

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${escapeXml(url)}</link>
  <guid isPermaLink="true">${escapeXml(url)}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  <description>${escapeXml(post.excerpt ?? SITE_DESCRIPTION)}</description>
  ${categories}${tags}
</item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(`${SITE_NAME} — Blog`)}</title>
  <link>${SITE_URL}/blog</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>pt-BR</language>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  })
}
