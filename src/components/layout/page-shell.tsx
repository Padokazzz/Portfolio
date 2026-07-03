import { Container } from "@/components/layout/container"

type PageShellProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <section className="max-w-3xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </section>
      </Container>
    </main>
  )
}
