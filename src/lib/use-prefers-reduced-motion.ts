import { useSyncExternalStore } from "react"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot() {
  // O servidor sempre renderiza a versao animada; durante a hidrataria o
  // React usa este snapshot (evitando mismatch) e depois passa a ler o real.
  return false
}

/**
 * `prefers-reduced-motion` de forma segura para SSR/hidrataria:
 * o primeiro render do cliente e identico ao HTML do servidor.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
