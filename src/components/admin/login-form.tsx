"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setPending(true)
    const data = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/admin-session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      })
      const body = (await response.json()) as { message?: string }
      if (!response.ok) {
        setError(body.message ?? "Não foi possível entrar.")
        return
      }
      router.replace("/_control/painel")
      router.refresh()
    } catch {
      setError("Não foi possível entrar. Tente novamente.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="w-full rounded-md border border-white/10 bg-white/[0.035] px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Senha</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-md border border-white/10 bg-white/[0.035] px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  )
}
