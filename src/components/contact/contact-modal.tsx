"use client"

import { FormEvent, useState, type ChangeEvent } from "react"
import { LoaderCircle, X } from "lucide-react"
import { Dialog } from "radix-ui"

import { Button } from "@/components/ui/button"
import { ContactApiError, type ContactField, type ContactFormData, sendContactMessage } from "@/lib/contact-api"

const EMPTY_FORM: ContactFormData = { name: "", email: "", company: "", subject: "", message: "" }

type ContactModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  onFailure: (message: string) => void
}

function validate(data: ContactFormData) {
  const errors: Partial<Record<ContactField, string>> = {}
  if (!data.name) errors.name = "O nome é obrigatório."
  if (!data.email) errors.email = "O e-mail é obrigatório."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Informe um e-mail válido."
  if (!data.subject) errors.subject = "O assunto é obrigatório."
  if (!data.message) errors.message = "A mensagem é obrigatória."
  return errors
}

export function ContactModal({ open, onOpenChange, onSuccess, onFailure }: ContactModalProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})
  const [isSending, setIsSending] = useState(false)

  function updateField(field: ContactField, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSending) return

    const trimmed = Object.fromEntries(Object.entries(form).map(([field, value]) => [field, value.trim()])) as ContactFormData
    const validationErrors = validate(trimmed)
    setForm(trimmed)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length) return

    setIsSending(true)
    try {
      await sendContactMessage(trimmed)
      setForm(EMPTY_FORM)
      setErrors({})
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      if (error instanceof ContactApiError) {
        setErrors(error.fieldErrors)
        onFailure(error.message)
      } else {
        onFailure("Não foi possível enviar sua mensagem. Tente novamente.")
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content aria-describedby="contact-dialog-description" className="surface fixed left-1/2 top-1/2 z-50 max-h-[90svh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border p-5 shadow-2xl focus:outline-none sm:p-6">
          <div className="pr-10">
            <Dialog.Title className="text-xl font-semibold">Enviar mensagem</Dialog.Title>
            <Dialog.Description id="contact-dialog-description" className="mt-1 text-sm text-muted-foreground">Preencha os dados abaixo e entrarei em contato em breve.</Dialog.Description>
          </div>
          <Dialog.Close asChild>
            <button aria-label="Fechar formulário de contato" className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="size-4" /></button>
          </Dialog.Close>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" field="name" value={form.name} error={errors.name} disabled={isSending} autoFocus onChange={updateField} />
              <Field label="E-mail" field="email" type="email" value={form.email} error={errors.email} disabled={isSending} onChange={updateField} />
            </div>
            <Field label="Empresa (opcional)" field="company" optional value={form.company} error={errors.company} disabled={isSending} onChange={updateField} />
            <Field label="Assunto" field="subject" value={form.subject} error={errors.subject} disabled={isSending} onChange={updateField} />
            <Field label="Mensagem" field="message" multiline value={form.message} error={errors.message} disabled={isSending} onChange={updateField} />
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Dialog.Close asChild><Button type="button" variant="outline" size="lg">Cancelar</Button></Dialog.Close>
              <Button type="submit" size="lg" disabled={isSending}>{isSending && <LoaderCircle aria-hidden="true" className="animate-spin" />}{isSending ? "Enviando..." : "Enviar mensagem"}</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type FieldProps = { label: string; field: ContactField; value: string; error?: string; type?: string; optional?: boolean; multiline?: boolean; disabled: boolean; autoFocus?: boolean; onChange: (field: ContactField, value: string) => void }

function Field({ label, field, value, error, type = "text", optional, multiline, disabled, autoFocus, onChange }: FieldProps) {
  const id = `contact-${field}`
  const className = "mt-1.5 w-full rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-[#e7c78f]/50 focus:ring-2 focus:ring-[#e7c78f]/15 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive"
  const props = { id, name: field, value, disabled, autoFocus, "aria-required": !optional, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(field, event.target.value) }
  return <div><label htmlFor={id} className="text-sm font-medium">{label} {!optional && <span aria-hidden="true">*</span>}</label>{multiline ? <textarea {...props} rows={5} className={`${className} resize-y`} /> : <input {...props} type={type} className={className} />}{error && <p id={`${id}-error`} className="mt-1 text-xs text-destructive">{error}</p>}</div>
}
