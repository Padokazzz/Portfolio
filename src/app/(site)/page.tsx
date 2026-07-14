import { ContactCta } from "@/components/sections/contact-cta"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ExperienceSummary } from "@/components/sections/experience-summary"
import { HomeHero } from "@/components/sections/home-hero"
import { TechStack } from "@/components/sections/tech-stack"
import { createPageMetadata, SITE_DESCRIPTION } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Desenvolvedor Full Stack",
  SITE_DESCRIPTION,
  "/",
)

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechStack />
      <ExperienceSummary />
      <FeaturedProjects />
      <ContactCta />
    </>
  )
}
