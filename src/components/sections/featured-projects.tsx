"use client"

import { ArrowUpRight, GitBranch, Layers3, Play, Server } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { FEATURED_PROJECTS } from "@/constants/projects"
import { cn } from "@/lib/utils"

export function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState(
    FEATURED_PROJECTS[0]?.id ?? ""
  )

  const activeProject = useMemo(
    () =>
      FEATURED_PROJECTS.find((project) => project.id === activeProjectId) ??
      FEATURED_PROJECTS[0],
    [activeProjectId]
  )

  if (!activeProject) {
    return null
  }

  return (
    <section id="projetos" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto flex min-h-[calc(100svh-3.75rem)] w-full max-w-7xl flex-col justify-center px-6 py-8">
        <Reveal className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="h-1 w-20 rounded-full accent-line" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Projetos em destaque
            </p>
            <h2 className="text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
              Cases navegaveis para sentir o produto antes de ler o codigo.
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Uma selecao inicial para mostrar como cada sistema foi pensado:
              problema, stack, responsabilidades e uma previa fiel da interface.
            </p>
          </div>

          <div
            aria-label="Selecionar projeto"
            className="grid gap-2 sm:grid-cols-2 lg:w-[28rem]"
          >
            {FEATURED_PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={cn(
                  "surface-soft rounded-md border px-3 py-2.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#e7c78f]/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeProject.id === project.id &&
                    "border-[#e7c78f]/45 bg-[#e7c78f]/10 text-foreground"
                )}
              >
                <span className="block text-sm font-medium">
                  {project.name}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {project.eyebrow}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="surface rounded-lg border p-4 transition duration-300 hover:border-[#e7c78f]/35 hover:bg-white/[0.055]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {activeProject.eyebrow}
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {activeProject.name}
                </h3>
              </div>
              <span className="rounded-md border border-[#e7c78f]/20 bg-[#e7c78f]/10 px-3 py-1.5 text-xs text-[#f0dfbd]">
                {activeProject.status}
              </span>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {activeProject.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-[#11100f]/45 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={activeProject.demoHref}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#f0dfbd] px-3 py-2 text-sm text-[#15110c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffe9bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Testar
                <Play aria-hidden="true" className="size-4" />
              </Link>

              {activeProject.links.map((link) => (
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
          </article>

          <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
            <div className="surface rounded-lg border p-4 transition duration-300 hover:border-[#7fc7d9]/35 hover:bg-white/[0.055]">
              <div className="mb-4 flex items-center gap-2">
                <Layers3 aria-hidden="true" className="size-4" />
                <h3 className="text-sm font-medium">Leitura rapida</h3>
              </div>

              <div className="grid gap-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md border border-white/10 bg-[#11100f]/45 p-2.5"
                  >
                    <span className="block text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="mt-1 block text-sm font-medium">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface rounded-lg border p-4 transition duration-300 hover:border-[#7fc7d9]/35 hover:bg-white/[0.055]">
              <div className="mb-4 flex items-center gap-2">
                <Server aria-hidden="true" className="size-4" />
                <h3 className="text-sm font-medium">O que o projeto evidencia</h3>
              </div>

              <ul className="space-y-2.5">
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm">
                    <GitBranch
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="leading-5 text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
