"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

import { useMounted } from "@/lib/use-mounted"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  // O servidor nunca marca reduced-motion (getServerSnapshot = false), entao
  // o primeiro render do cliente bater com o HTML e a hidrataria nao quebra.
  const reduced = usePrefersReducedMotion()
  const mounted = useMounted()

  // Sem animação para quem pediu menos movimento, e ainda não assumimos o JS:
  // o conteúdo nasce visível, sem passar por estado oculto.
  //
  // Enquanto `!mounted` (SSR + primeiro render) renderizamos uma div simples
  // para o HTML estático não conter `opacity:0` — sem isso o Google baixaria
  // uma página praticamente vazia, já que framer-motion emite os estilos do
  // variant `hidden` direto na saída do servidor.
  if (reduced || !mounted) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="hidden"
      whileInView="visible"
      viewport={{
        amount: 0.22,
        margin: "-8% 0px -12% 0px",
        // `once: true` para o conteúdo revelado não voltar a sumir quando sai
        // da tela. Com `once: false` só a seção atual ficaria visível em
        // qualquer snapshot — inclusive o render que o Google captura depois
        // de rolar a página.
        once: true,
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: 34,
          scale: 0.985,
          filter: "blur(10px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        },
      }}
      transition={{
        duration: 0.82,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
