import { Container } from "@/components/layout/container"

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
        <p>Portfolio profissional em desenvolvimento.</p>
        <p>{new Date().getFullYear()}</p>
      </Container>
    </footer>
  )
}
