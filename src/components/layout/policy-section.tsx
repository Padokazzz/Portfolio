import type { ReactNode } from "react"

type PolicySectionProps = {
  title: string
  children: ReactNode
}

/** Seção de conteúdo das páginas institucionais (privacidade, cookies, afiliados). */
export function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-lg font-semibold leading-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  )
}
