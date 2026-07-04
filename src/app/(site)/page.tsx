import { FeaturedProjects } from "@/components/sections/featured-projects"
import { HomeHero } from "@/components/sections/home-hero"
import { TechStack } from "@/components/sections/tech-stack"

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechStack />
      <FeaturedProjects />
    </>
  )
}
