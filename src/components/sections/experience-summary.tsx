import { PROFESSIONAL_EXPERIENCES } from "@/constants/experience"

export function ExperienceSummary() {
  return (
    <section id="experiencia" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
        <div className="mb-7">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Experiencia profissional
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {PROFESSIONAL_EXPERIENCES.map((experience) => {
            const Icon = experience.icon

            return (
              <article
                key={experience.company}
                className="flex min-h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-1 flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-md bg-white/[0.06]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-muted-foreground">
                        {experience.period}
                      </span>
                      <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-muted-foreground">
                        {experience.duration}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {experience.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.role}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {experience.summary}
                    </p>
                  </div>

                  <ul className="grid gap-2">
                    {experience.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="border-l border-white/10 pl-4 text-sm leading-6 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {experience.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
