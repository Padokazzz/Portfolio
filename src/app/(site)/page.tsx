import { ContactCta } from "@/components/sections/contact-cta"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ExperienceSummary } from "@/components/sections/experience-summary"
import { HomeHero } from "@/components/sections/home-hero"
import { TechStack } from "@/components/sections/tech-stack"

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
