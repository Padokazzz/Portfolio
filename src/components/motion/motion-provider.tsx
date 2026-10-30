"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Respeita `prefers-reduced-motion` em todas as animações framer-motion:
 * transform/layout são desligadas e só resta o fade de opacidade.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
