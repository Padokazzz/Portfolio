import { SITE_URL } from "@/lib/site-metadata"

type Crumb = {
  name: string
  /** Caminho relativo (ex.: "/blog"). Omite para a própria home. */
  path?: string
}

/**
 * Breadcrumb em JSON-LD (BreadcrumbList) para o Google entender a
 * hierarquia das paginas internadas — posts, taxonomias e estudos de caso.
 */
export function breadcrumbList(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path !== undefined ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  }
}
