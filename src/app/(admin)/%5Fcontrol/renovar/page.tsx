import { SessionRefresh } from "@/components/admin/session-refresh"
import { Container } from "@/components/layout/container"

export default function RenewAdminSessionPage() {
  return (
    <main className="flex min-h-screen items-center">
      <Container>
        <section className="surface mx-auto max-w-md rounded-lg border p-8 text-center">
          <h1 className="text-xl font-semibold">Validando acesso</h1>
          <div className="mt-3"><SessionRefresh immediate /></div>
        </section>
      </Container>
    </main>
  )
}
