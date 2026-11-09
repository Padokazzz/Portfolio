"use client"

import type { FormEvent } from "react"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"

import { saveConsent, useConsent } from "@/lib/consent/consent-manager"

type CookiePreferencesProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})

/**
 * Diálogo de preferências. O conteúdo é desmontado quando fechado, então os
 * checkboxes usam `defaultChecked` derivado do consentimento atual — nenhuma
 * categoria opcional vem pré-marcada na primeira visita.
 */
export function CookiePreferences({ open, onOpenChange }: CookiePreferencesProps) {
  const consent = useConsent()

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    saveConsent({
      analytics: data.get("analytics") === "on",
      advertising: data.get("advertising") === "on",
    })
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          aria-describedby="cookie-preferences-description"
          className="surface fixed left-1/2 top-1/2 z-50 max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border p-4 shadow-2xl focus:outline-none sm:p-5"
        >
          <div className="pr-10">
            <Dialog.Title className="text-xl font-semibold">
              Preferências de cookies
            </Dialog.Title>
            <Dialog.Description
              id="cookie-preferences-description"
              className="mt-1 text-sm text-muted-foreground"
            >
              Escolha quais categorias opcionais você autoriza. Nenhuma
              categoria opcional é ativada sem a sua escolha, e você pode
              alterar ou retirar o consentimento quando quiser.
            </Dialog.Description>
          </div>
          <Dialog.Close asChild>
            <button
              aria-label="Fechar preferências de cookies"
              className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>
          </Dialog.Close>

          <form onSubmit={handleSave}>
            <div className="mt-4 space-y-3">
              <CategoryRow
                id="cookie-category-necessary"
                name="necessary"
                label="Necessários"
                description="Sessão do painel administrativo, segurança e registro da sua preferência de cookies. Estritamente necessários para o site funcionar."
                defaultChecked
                disabled
              />
              <CategoryRow
                id="cookie-category-analytics"
                name="analytics"
                label="Análise"
                description="Medição de visitas e uso do site (Google Analytics), quando esse serviço for integrado. Desativado por padrão."
                defaultChecked={consent?.analytics ?? false}
              />
              <CategoryRow
                id="cookie-category-advertising"
                name="advertising"
                label="Publicidade"
                description="Anúncios e personalização (Google AdSense), quando esse serviço for integrado. Desativado por padrão."
                defaultChecked={consent?.advertising ?? false}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Consulte a{" "}
              <a
                href="/politica-de-cookies"
                className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                política de cookies
              </a>{" "}
              para entender cada categoria.
              {consent && (
                <>
                  {" "}
                  Sua escolha atual está registrada na versão{" "}
                  <span className="font-mono">{consent.policyVersion}</span> da
                  política, de{" "}
                  {dateFormatter.format(new Date(consent.updatedAt))}.
                </>
              )}
            </p>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-yellow-300 px-4 py-2 text-xs font-semibold text-[#191713] transition hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Salvar preferências
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type CategoryRowProps = {
  id: string
  name: string
  label: string
  description: string
  defaultChecked?: boolean
  disabled?: boolean
}

function CategoryRow({ id, name, label, description, defaultChecked, disabled }: CategoryRowProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 p-3 transition hover:bg-white/[0.03] has-[:disabled]:cursor-default has-[:disabled]:hover:bg-transparent"
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="mt-0.5 size-4 shrink-0 accent-[#8b5cf6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium">
          {label}
          {disabled && (
            <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              sempre ativo
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  )
}
