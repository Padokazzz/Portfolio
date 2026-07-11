"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { Toast } from "radix-ui"

import { ContactModal } from "@/components/contact/contact-modal"
import { CONTACT_LINKS } from "@/constants/contact"

const optionClassName = "group flex w-full items-center justify-between gap-5 border-b border-white/10 px-4 py-3.5 text-left transition duration-300 last:border-b-0 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export function ContactOptions() {
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  return (
    <Toast.Provider swipeDirection="right">
      {CONTACT_LINKS.map((option) => {
        const content = <OptionContent option={option} />
        return option.action === "contact" ? (
          <button key={option.label} type="button" className={optionClassName} onClick={() => setIsOpen(true)}>{content}</button>
        ) : (
          <Link key={option.href} href={option.href} target={option.external ? "_blank" : undefined} rel={option.external ? "noreferrer" : undefined} className={optionClassName}>{content}</Link>
        )
      })}

      <ContactModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onSuccess={() => setToast({ type: "success", message: "Sua mensagem foi enviada com sucesso. Entrarei em contato o mais breve possível." })}
        onFailure={(message) => setToast({ type: "error", message })}
      />

      <Toast.Root open={Boolean(toast)} onOpenChange={(open) => !open && setToast(null)} duration={6000} className="surface flex items-start gap-3 rounded-lg border p-4 text-sm shadow-2xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:slide-in-from-right-4">
        {toast?.type === "success" ? <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-400" /> : <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-destructive" />}
        <Toast.Description>{toast?.message}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[60] m-0 flex w-full max-w-md list-none flex-col gap-2 p-5 outline-none" />
    </Toast.Provider>
  )
}

function OptionContent({ option }: { option: (typeof CONTACT_LINKS)[number] }) {
  const Icon = option.icon
  return (
    <>
      <span className="flex min-w-0 items-center gap-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#e7c78f]/10 text-[#f0dfbd] transition-colors group-hover:bg-[#e7c78f]/18"><Icon aria-hidden="true" className="size-3.5" /></span>
        <span className="min-w-0"><span className="block text-sm font-medium">{option.label}</span><span className="mt-1 block truncate text-sm text-muted-foreground">{option.value}</span></span>
      </span>
      <span className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">Abrir <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted-foreground/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
    </>
  )
}
