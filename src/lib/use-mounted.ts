import { useEffect, useLayoutEffect, useState } from "react"

// `useLayoutEffect` avisa no servidor: so existe `window` no cliente.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * `false` durante o SSR e no primeiro render do cliente (o HTML renderizado
 * pelo cliente casa com o do servidor, sem mismatch de hidrataria) e `true`
 * logo antes da primeira pintura.
 *
 * Serve para animacoes nascerem **visiveis** no HTML estatico: quem baixa a
 * pagina sem executar JS — incluindo o primeiro rastreamento do Google —
 * recebe o conteudo completo. So depois o client assume o estado oculto e
 * toca a animacao de entrada.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
