"use client"

import { useEffect, useState } from "react"

export function SiteIntro() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 560)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="site-intro pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-[#11100f]"
    >
      <div className="w-44 overflow-hidden">
        <div className="site-intro-line h-px w-full origin-left bg-[#e7c78f]" />
        <p className="mt-3 text-center text-[0.62rem] uppercase tracking-[0.24em] text-[#f0dfbd]/70">
          Leonardo Padilha - Fullstack Developer
        </p>
      </div>
    </div>
  )
}
