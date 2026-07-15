import type { Metadata } from "next"

export const SITE_NAME = "Leonardo Padilha"
export const SITE_TITLE = "Leonardo Padilha | Desenvolvedor Full Stack"
export const SITE_DESCRIPTION =
  "Portfólio de Leonardo Padilha, desenvolvedor full stack especializado em aplicações web, APIs e arquitetura de software."
export const SITE_URL = "https://padilhadev.vercel.app"
export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Leonardo Padilha — Desenvolvedor Full Stack",
}

export const SOCIAL_LINKS = [
  "https://github.com/padokazzz",
  "https://www.linkedin.com/in/leonardo-padilha-kawashaki/",
]

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`,
      },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  }
}
