import Link from "next/link"

type AffiliateDisclosureProps = {
  className?: string
}

/**
 * Aviso de transparência exibido em artigos que contêm links de afiliado.
 * Sempre precede o conteúdo comercial para que o leitor saiba antes de clicar.
 */
export function AffiliateDisclosure({ className }: AffiliateDisclosureProps) {
  return (
    <aside
      aria-label="Divulgação de afiliados"
      className={`rounded-lg border border-[#e7c78f]/30 bg-[#e7c78f]/[0.07] p-4 text-sm leading-6 text-[#d8d3c9] ${className ?? ""}`}
    >
      <p>
        <strong className="font-semibold text-[#f0dfbd]">Transparência:</strong>{" "}
        alguns links deste artigo podem ser links de afiliado. Se você
        comprar por meio deles, podemos receber uma comissão, sem custo
        adicional para você.{" "}
        <Link
          href="/aviso-de-afiliados"
          className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Como funcionam os links de afiliado
        </Link>
        .
      </p>
    </aside>
  )
}
