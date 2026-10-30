import { Reveal } from "@/components/motion/reveal"
import { PROFESSIONAL_EXPERIENCES } from "@/constants/experience"

/**
 * Linha do tempo vertical: trilho a esquerda com indicador violeta
 * por experiencia e periodo ancorado ao no.
 */
export function ExperienceSummary() {
  return (
    <section id="experiencia" className="scroll-mt-20 border-t border-white/10">
      <div className="section-shell flex flex-col justify-center">
        <Reveal className="mb-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-16 rounded-full accent-line" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Experiencia profissional
            </p>
          </div>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
            Onde a stack virou produto em uso real.
          </h2>
        </Reveal>

        <ol className="relative ml-1 border-l border-[#273248] pl-6 sm:ml-2 sm:pl-9">
          {PROFESSIONAL_EXPERIENCES.map((experience, index) => {
            const Icon = experience.icon
            const isLast = index === PROFESSIONAL_EXPERIENCES.length - 1

            return (
              <li key={experience.company} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.5rem+6px)] top-6 flex size-3 items-center justify-center rounded-full bg-[#8b5cf6] ring-4 ring-[#8b5cf6]/15 sm:-left-[calc(2.25rem+6px)]"
                >
                  <span className="size-1.5 rounded-full bg-[#a78bfa]" />
                </span>

                <Reveal
                  delay={index * 0.08}
                  className={isLast ? "pb-0" : "pb-8 sm:pb-10"}
                >
                  <article className="surface rounded-lg border p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/40 hover:bg-white/[0.055]">
                    {/* Cabecalho: periodo + duracao */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2.5 py-1 text-xs text-[#a78bfa]">
                        {experience.period}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-muted-foreground">
                        {experience.duration}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#8b5cf6]/12 text-[#a78bfa]">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>

                      <div className="min-w-0 space-y-1.5">
                        <h3 className="text-lg font-semibold leading-tight">
                          {experience.company}
                        </h3>
                        <p className="text-sm font-medium text-[#38bdf8]">
                          {experience.role}
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {experience.summary}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-4 grid gap-1.5">
                      {experience.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="border-l border-[#8b5cf6]/30 pl-4 text-sm leading-5 text-muted-foreground transition-colors hover:border-[#8b5cf6]/70 hover:text-foreground/90"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-[#080b12]/45 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
