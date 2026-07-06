import { Reveal } from "@/components/motion/reveal"
import { TECHNOLOGY_GROUPS } from "@/constants/technologies"

export function TechStack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto flex min-h-[calc(100svh-3.75rem)] w-full max-w-7xl flex-col justify-center px-6 py-8">
        <Reveal className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="h-1 w-20 rounded-full accent-line" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Stack e tecnologias
            </p>
            <h2 className="text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
              Ferramentas para compor produtos claros, escalaveis e bem acabados.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Um conjunto enxuto para criar, integrar, publicar e evoluir sistemas
            completos.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TECHNOLOGY_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <article className="surface h-full rounded-lg border p-3.5 transition duration-300 hover:-translate-y-1 hover:border-[#e7c78f]/35 hover:bg-white/[0.055]">
                <div className="mb-3 space-y-1.5 border-b border-white/10 pb-3">
                  <h3 className="text-base font-semibold">{group.title}</h3>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {group.description}
                  </p>
                </div>

                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon

                    return (
                      <li
                        key={item.name}
                        className="group flex gap-2.5 rounded-md px-1 py-1 transition-colors hover:bg-white/[0.035]"
                      >
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-[#e7c78f]/10 text-[#f0dfbd] transition-colors group-hover:bg-[#e7c78f]/18">
                          <Icon aria-hidden="true" className="size-3" />
                        </span>
                        <span>
                          <span className="block text-[0.82rem] font-medium">
                            {item.name}
                          </span>
                          <span className="block text-xs leading-4 text-muted-foreground">
                            {item.detail}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
