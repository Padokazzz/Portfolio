"use client"

import { Music2 } from "lucide-react"
import { useEffect, useState } from "react"

import { SECTION_SOUNDTRACKS } from "@/constants/soundtrack"

const DEFAULT_SECTION = SECTION_SOUNDTRACKS[0].sectionId
type SectionId = (typeof SECTION_SOUNDTRACKS)[number]["sectionId"]

const WAVE_HEIGHTS = [45, 72, 38, 64, 52] as const

export function ListeningIndicator() {
  const [activeSection, setActiveSection] =
    useState<SectionId>(DEFAULT_SECTION)

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "")

      if (SECTION_SOUNDTRACKS.some((item) => item.sectionId === hash)) {
        setActiveSection(hash as SectionId)
      }
    }

    updateFromHash()
    window.addEventListener("hashchange", updateFromHash)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as SectionId)
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    )

    SECTION_SOUNDTRACKS.forEach((item) => {
      const section = document.getElementById(item.sectionId)

      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      window.removeEventListener("hashchange", updateFromHash)
      observer.disconnect()
    }
  }, [])

  const soundtrack =
    SECTION_SOUNDTRACKS.find((item) => item.sectionId === activeSection) ??
    SECTION_SOUNDTRACKS[0]

  return (
    <aside
      aria-label={`Ouvindo ${soundtrack.track}`}
      className="fixed bottom-4 right-4 z-40 hidden w-[14.5rem] rounded-md border border-white/[0.07] bg-[#151310]/70 px-3 py-2.5 text-muted-foreground shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-md md:block"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-5 shrink-0 items-center justify-center text-[#e7c78f]/70">
          <Music2 aria-hidden="true" className="size-3.5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground/80">
              Ouvindo...
            </p>
            <span className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/60">
              {soundtrack.genre}
            </span>
          </div>

          <p className="mt-0.5 truncate text-xs font-medium text-foreground/85">
            {soundtrack.track}
          </p>
        </div>

        <div className="flex h-5 shrink-0 items-end gap-0.5" aria-hidden="true">
          {WAVE_HEIGHTS.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-0.5 rounded-full bg-[#e7c78f]/55"
              style={{
                height: `${height}%`,
                transformOrigin: "bottom",
                animationName: "music-wave",
                animationDuration: `${1.6 + index * 0.15}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${index * 0.25}s`,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
