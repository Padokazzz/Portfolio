import Link from "next/link"
import { ArrowUpRight, BookOpen, Play } from "lucide-react"

import { Container } from "@/components/layout/container"
import { ProjectFrame, frameLabel } from "@/components/project/project-frame"
import { JsonLd } from "@/components/seo/json-ld"
import { FEATURED_PROJECTS } from "@/constants/projects"
import { createPageMetadata, SITE_URL } from "@/lib/site-metadata"
import { breadcrumbList } from "@/lib/structured-data"

export const metadata = createPageMetadata(
  "Projetos",
  "Projetos de frontend, backend e arquitetura de software com contexto, decisões técnicas, trade-offs e resultados.",
  "/projetos",
)

export default function ProjetosPage() {
  const projects = FEATURED_PROJECTS

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projetos de Leonardo Padilha",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: project.caseStudyHref
        ? `${SITE_URL}${project.caseStudyHref}`
        : project.demoHref
          ? `${SITE_URL}${project.demoHref}`
          : project.links[0]?.href ?? `${SITE_URL}/projetos`,
    })),
  }

  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <JsonLd
          data={breadcrumbList([
            { name: "Início", path: "" },
            { name: "Projetos", path: "/projetos" },
          ])}
        />
        <JsonLd data={itemList} />

        <section className="max-w-3xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Projetos
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-balance sm:text-5xl">
            Estudos de caso com contexto, decisoes tecnicas e resultado.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Aqui ficarao os projetos selecionados, com foco em problema,
            arquitetura, trade-offs, implementacao e impacto.
          </p>
        </section>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="group surface flex flex-col overflow-hidden rounded-lg border transition duration-300 hover:border-[#8b5cf6]/35 hover:bg-white/[0.055]"
            >
              {project.image && (
                <div className="flex flex-col p-2">
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <span className="size-2 rounded-full bg-[#8b5cf6]/70" />
                    <span className="size-2 rounded-full bg-[#38bdf8]/60" />
                    <span className="size-2 rounded-full bg-[#273248]" />
                    <span className="ml-1 truncate font-mono text-[0.65rem] text-[#68758b]">
                      {frameLabel(project.image.src)}
                    </span>
                  </div>
                  <ProjectFrame
                    image={project.image}
                    sizes="(min-width: 640px) 44vw, 92vw"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-4 border-t border-white/10 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {project.eyebrow}
                    </p>
                    <h2 className="text-xl font-semibold leading-tight">
                      {project.name}
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-md border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-2.5 py-1 text-xs text-[#a78bfa]">
                    {project.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-[#080b12]/45 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-1">
                  {project.caseStudyHref && (
                    <Link
                      href={project.caseStudyHref}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-3 py-2 text-sm text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Ver estudo de caso
                      <BookOpen aria-hidden="true" className="size-4" />
                    </Link>
                  )}

                  {project.demoHref && (
                    <Link
                      href={project.demoHref}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-3 py-2 text-sm text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Testar demo
                      <Play aria-hidden="true" className="size-4" />
                    </Link>
                  )}

                  {project.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}
