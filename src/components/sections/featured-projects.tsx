"use client"

import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Layers3,
  Play,
  Server,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useMemo, useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { FEATURED_PROJECTS } from "@/constants/projects"
import { cn } from "@/lib/utils"

/** Hostname curto exibido na moldura de janela do screenshot. */
function frameLabel(src: string) {
  const file = src.split("/").pop() ?? src
  return file.replace(/\.(webp|png|jpg|jpeg)$/, "") + ".app"
}

/**
 * Template de grid compartilhado pelas duas linhas do card.
 * Usar o mesmo template garante que os cortes verticais fiquem alinhados.
 */
const CARD_GRID = "grid gap-4 lg:grid-cols-[1.02fr_0.98fr]"

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = FEATURED_PROJECTS
  const activeProject = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [projects, activeIndex]
  )

  const total = projects.length

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total)
    },
    [total]
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])

  if (!activeProject) {
    return null
  }

  const image = activeProject.image

  return (
    <section id="projetos" className="scroll-mt-20 border-t border-white/10">
      <div className="section-shell flex flex-col justify-center">
        <Reveal className="mb-6 max-w-2xl space-y-3">
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
        </Reveal>

        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Projeto anterior"
              className="surface-soft rounded-md border p-2 transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>

            <div
              aria-label="Selecionar projeto"
              className="flex items-center gap-2"
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver ${project.name}`}
                  aria-current={index === activeIndex}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    index === activeIndex
                      ? "w-6 bg-[#8b5cf6]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Proximo projeto"
              className="surface-soft rounded-md border p-2 transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          <p className="text-xs tabular-nums text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>

        <Reveal delay={0.08}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4"
            >
              {/* Linha 1: texto do projeto + screenshot real (quando existe) */}
              <div className={CARD_GRID}>
                <article
                  className={cn(
                    "surface rounded-lg border p-4 transition duration-300 hover:border-[#8b5cf6]/35 hover:bg-white/[0.055]",
                    !image && "lg:col-span-2"
                  )}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        {activeProject.eyebrow}
                      </p>
                      <h3 className="text-2xl font-semibold leading-tight">
                        {activeProject.name}
                      </h3>
                    </div>
                    <span className="rounded-md border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-3 py-1.5 text-xs text-[#a78bfa]">
                      {activeProject.status}
                    </span>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    {activeProject.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-[#080b12]/45 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(activeProject.demoHref ||
                    activeProject.caseStudyHref ||
                    activeProject.links.length > 0) && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {activeProject.caseStudyHref && (
                        <Link
                          href={activeProject.caseStudyHref}
                          className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-3 py-2 text-sm text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Ver estudo de caso
                          <BookOpen aria-hidden="true" className="size-4" />
                        </Link>
                      )}

                      {activeProject.demoHref && (
                        <Link
                          href={activeProject.demoHref}
                          className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-3 py-2 text-sm text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Testar
                          <Play aria-hidden="true" className="size-4" />
                        </Link>
                      )}

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
                  )}
                </article>

                {image && (
                  <figure
                    className={cn(
                      "surface group m-0 flex flex-col rounded-lg border p-2 transition duration-300",
                      activeProject.caseStudyHref
                        ? "border-[#8b5cf6]/30 hover:border-[#8b5cf6]/55"
                        : "hover:border-[#38bdf8]/35"
                    )}
                  >
                    <figcaption className="mb-2 flex items-center gap-2 px-1">
                      <span className="size-2 rounded-full bg-[#8b5cf6]/70" />
                      <span className="size-2 rounded-full bg-[#38bdf8]/60" />
                      <span className="size-2 rounded-full bg-[#273248]" />
                      <span className="ml-1 truncate font-mono text-[0.65rem] text-[#68758b]">
                        {frameLabel(image.src)}
                      </span>
                    </figcaption>

                    {image.phone ? (
                      <div
                        className="relative flex w-full items-center justify-center overflow-hidden rounded-md border border-[#273248] bg-[#080b12] aspect-[16/10]"
                      >
                        {/* Fundo ambiente: a propria paleta do app, borrada, da profundidade ao retrato. */}
                        <Image
                          src={image.src}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="(min-width: 1024px) 44vw, 92vw"
                          className="scale-125 object-cover opacity-55 blur-2xl"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(139_92_246/0.16),rgb(8_11_18/0.86)_64%)]"
                        />

                        <div className="relative h-[86%] w-auto">
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-2 rounded-[1.9rem] bg-[#8b5cf6]/20 blur-xl"
                          />
                          <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#080b12] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.9)]">
                            <div
                              aria-hidden="true"
                              className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/55"
                            />
                            <Image
                              src={image.src}
                              alt={image.alt}
                              height={1200}
                              width={675}
                              sizes="(min-width: 1024px) 22vw, 46vw"
                              className="h-full w-auto object-cover object-top transition duration-700 ease-out group-hover:scale-[1.015]"
                            />
                          </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgb(8_11_18/0.34))]" />
                      </div>
                    ) : (
                      <div className="relative w-full overflow-hidden rounded-md border border-[#273248] bg-[#080b12] aspect-[16/10]">
                        {image.fit === "contain" ? (
                          <>
                            {/* Fundo ambiente: a propria paleta do app, borrada,
                                preenche o frame sem esticar nem cortar o print. */}
                            <Image
                              src={image.src}
                              alt=""
                              aria-hidden="true"
                              fill
                              sizes="(min-width: 1024px) 44vw, 92vw"
                              className="scale-125 object-cover opacity-40 blur-2xl"
                            />
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(139_92_246/0.14),rgb(8_11_18/0.88)_64%)]"
                            />
                          </>
                        ) : null}
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 44vw, 92vw"
                          className={cn(
                            "relative transition duration-700 ease-out group-hover:scale-[1.015]",
                            image.fit === "contain"
                              ? "object-contain p-3"
                              : "object-cover object-top"
                          )}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(8_11_18/0.42))]" />
                      </div>
                    )}
                  </figure>
                )}
              </div>

              {/* Linha 2: leitura rapida + evidencias do projeto.
                  Mesmo template da linha 1 a partir de lg, para os cortes
                  verticais ficarem alinhados com os cards de cima. */}
              <div
                className={cn(
                  "grid gap-4 md:grid-cols-2 lg:grid-cols-[1.02fr_0.98fr]"
                )}
              >
                <div className="surface rounded-lg border p-4 transition duration-300 hover:border-[#38bdf8]/35 hover:bg-white/[0.055]">
                  <div className="mb-4 flex items-center gap-2">
                    <Layers3 aria-hidden="true" className="size-4" />
                    <h3 className="text-sm font-medium">Leitura rapida</h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {activeProject.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-md border border-white/10 bg-[#080b12]/45 p-2.5"
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

                <div className="surface rounded-lg border p-4 transition duration-300 hover:border-[#38bdf8]/35 hover:bg-white/[0.055]">
                  <div className="mb-4 flex items-center gap-2">
                    <Server aria-hidden="true" className="size-4" />
                    <h3 className="text-sm font-medium">
                      O que o projeto evidencia
                    </h3>
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
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
