import { Reveal } from "@/components/motion/reveal"
import { PROFESSIONAL_EXPERIENCES } from "@/constants/experience"

export function ExperienceSummary() {
  return (
    <section id="experiencia" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto flex min-h-[calc(100svh-3.75rem)] w-full max-w-7xl flex-col justify-center px-6 py-8">
        <Reveal className="mb-5">
          <div className="flex items-center gap-4">
            <div className="h-1 w-16 rounded-full accent-line" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Experiencia profissional
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {PROFESSIONAL_EXPERIENCES.map((experience, index) => {
            const Icon = experience.icon

            return (
              <Reveal key={experience.company} delay={index * 0.06}>
                <article className="surface flex min-h-full flex-col rounded-lg border p-4 transition duration-300 hover:-translate-y-1 hover:border-[#7fc7d9]/35 hover:bg-white/[0.055]">
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-md bg-[#7fc7d9]/10 text-[#bce9f2]">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>

                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-muted-foreground">
                        {experience.period}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-muted-foreground">
                        {experience.duration}
                      </span>
                    </div>
                  </div>

                    <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold">
                      {experience.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.role}
                    </p>
                    <p className="text-sm leading-5 text-muted-foreground">
                      {experience.summary}
                    </p>
                  </div>

                  <ul className="grid gap-1.5">
                    {experience.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="border-l border-white/10 pl-4 text-sm leading-5 text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {experience.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-[#11100f]/45 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
