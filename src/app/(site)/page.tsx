import type { Metadata } from "next"

import { ContactCta } from "@/components/sections/contact-cta"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ExperienceSummary } from "@/components/sections/experience-summary"
import { HomeBlog } from "@/components/sections/home-blog"
import { HomeHero } from "@/components/sections/home-hero"
import { TechStack } from "@/components/sections/tech-stack"
import { createPageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-metadata"

const pageMetadata = createPageMetadata(
  "Desenvolvedor Full Stack",
  SITE_DESCRIPTION,
  "/",
)

export const metadata: Metadata = {
  ...pageMetadata,
  // Nome primeiro: o `<title>` é o sinal mais forte para a busca pelo seu
  // próprio nome, e o template do layout inverteria a ordem dos termos.
  title: { absolute: SITE_TITLE },
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechStack />
      <ExperienceSummary />
      <FeaturedProjects />
      <HomeBlog />
      <ContactCta />
    </>
  )
}
