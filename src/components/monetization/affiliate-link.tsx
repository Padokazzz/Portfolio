"use client"

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"

import { trackEvent } from "@/lib/analytics/analytics"

type AffiliateLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "rel" | "target"
> & {
  href: string
  children: ReactNode
}

function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

/**
 * Link de afiliado com identificação acessível, atributos comerciais
 * (`rel="sponsored nofollow"`), clique medido sem dados pessoais e
 * navegação na mesma aba (padrão consistente do site — sem target="_blank").
 * Nunca deve ser usado para links editoriais comuns.
 */
export function AffiliateLink({ href, children, onClick, ...rest }: AffiliateLinkProps) {
  // URL fora do padrão http(s): renderiza apenas o texto, sem navegação.
  if (!isSafeHttpUrl(href)) return <span>{children}</span>

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    try {
      trackEvent("click_affiliate", { link_host: new URL(href).host })
    } catch {
      // Medição é opcional: erro nunca bloqueia a navegação.
    }
  }

  return (
    <a {...rest} href={href} rel="sponsored nofollow" onClick={handleClick}>
      {children}
      <span className="sr-only"> (link de afiliado)</span>
    </a>
  )
}
