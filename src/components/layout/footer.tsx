import { Container } from "@/components/layout/container"

const STACKS = [
  {
    label: "Frontend",
    technologies: "Next.js · React · TypeScript · Tailwind CSS",
  },
  {
    label: "Backend",
    technologies: ".NET 10 · ASP.NET Core · FluentValidation · MailKit",
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0e0d0c]/60">
      <Container className="flex flex-col gap-5 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
        <p className="shrink-0">
          &copy; {new Date().getFullYear()} Leonardo Padilha. Todos os direitos
          reservados.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1 lg:justify-end">
          {STACKS.map((stack) => (
            <p key={stack.label}>
              <span className="font-medium text-foreground/80">
                {stack.label}
              </span>
              <span aria-hidden="true"> — </span>
              {stack.technologies}
            </p>
          ))}
        </div>
      </Container>
    </footer>
  )
}
