import { LoginForm } from "@/components/admin/login-form"
import { Container } from "@/components/layout/container"

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center py-16">
      <Container>
        <section className="surface mx-auto max-w-md rounded-xl border p-7 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Área restrita</p>
          <h1 className="mt-3 text-2xl font-semibold">Painel editorial</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Entre com sua conta administrativa para continuar.</p>
          <LoginForm />
        </section>
      </Container>
    </main>
  )
}
