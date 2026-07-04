"use client"

import { ArrowUpRight, GitBranch, Layers3, Play, Server } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

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
    <section className="border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Projetos em destaque
            </p>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Estudos de caso que conectam produto, arquitetura e execucao.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Uma primeira selecao de projetos para demonstrar como penso sobre
              sistemas completos: contexto, stack, responsabilidades e pontos de
              evolucao.
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
                  "rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeProject.id === project.id &&
                    "border-white/25 bg-white/[0.08]"
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
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {activeProject.eyebrow}
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {activeProject.name}
                </h3>
              </div>
              <span className="rounded-md bg-white/[0.06] px-3 py-1.5 text-xs text-muted-foreground">
                {activeProject.status}
              </span>
            </div>

            <p className="text-base leading-7 text-muted-foreground">
              {activeProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={activeProject.demoHref}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center gap-2">
                <Layers3 aria-hidden="true" className="size-4" />
                <h3 className="text-sm font-medium">Leitura rapida</h3>
              </div>

              <div className="grid gap-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md bg-white/[0.04] p-3"
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

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center gap-2">
                <Server aria-hidden="true" className="size-4" />
                <h3 className="text-sm font-medium">O que o projeto evidencia</h3>
              </div>

              <ul className="space-y-3">
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm">
                    <GitBranch
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="leading-6 text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
