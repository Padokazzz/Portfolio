import { TECHNOLOGY_GROUPS } from "@/constants/technologies"

export function TechStack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Stack e tecnologias
          </p>
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
            Experiencia em mobile, backend e tecnologias modernas para
            desenvolvimento full stack.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TECHNOLOGY_GROUPS.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="mb-4 space-y-1.5">
                <h3 className="text-base font-medium">{group.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
              </div>

              <ul className="space-y-2.5">
                {group.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <li key={item.name} className="flex gap-3">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-foreground">
                        <Icon aria-hidden="true" className="size-3.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">
                          {item.name}
                        </span>
                        <span className="block text-sm leading-5 text-muted-foreground">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
