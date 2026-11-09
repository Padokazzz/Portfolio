import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { PolicySection } from "@/components/layout/policy-section"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Aviso de afiliados",
  "Como funcionam os links de afiliado neste site, como eles são identificados e os compromissos editoriais que orientam as recomendações.",
  "/aviso-de-afiliados",
)

export default function AvisoAfiliadosPage() {
  return (
    <PageShell
      eyebrow="Transparência"
      title="Aviso de afiliados"
      description="Este site pode conter links de afiliado. Saiba como eles funcionam, como são identificados e o que orienta as recomendações publicadas."
    >
      <div className="space-y-0 text-sm leading-7 text-muted-foreground">
        <PolicySection title="O que é um link de afiliado">
          <p>
            Um link de afiliado direciona você a um produto ou serviço em uma
            plataforma com a qual este site pode ter uma parceria. Se você
            comprar por meio dele, podemos receber uma comissão do vendedor —{" "}
            <strong className="font-medium text-foreground">
              sem nenhum custo adicional para você
            </strong>
            . O preço que você paga é o mesmo.
          </p>
        </PolicySection>

        <PolicySection title="Como os links são identificados">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Os links marcam a relação comercial com os atributos{" "}
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                rel=&quot;sponsored nofollow&quot;
            </code>
              , reconhecidos pelos mecanismos de busca.
            </li>
            <li>
              Artigos que contêm links de afiliado exibem um aviso de
              transparência logo antes do conteúdo, explicando a relação
              comercial.
            </li>
            <li>
              Nenhum link é escondido em redirecionadores ou textos enganosos.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Status atual">
          <p>
            <strong className="font-medium text-foreground">
              Nenhum programa de afiliado está ativo no momento.
            </strong>{" "}
            Este aviso existe para deixar desde já as regras de transparência
            claras. Caso o site adira a programas no futuro, esta página será
            atualizada com os programas utilizados e os artigos correspondentes
            passarão a exibir o aviso de transparência.
          </p>
        </PolicySection>

        <PolicySection title="Compromissos editoriais">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Recomendar apenas produtos com relação real com o tema do artigo,
              explicando para quem o produto é indicado — e para quem não é.
            </li>
            <li>
              Não afirmar que um produto foi testado se não foi, e não inventar
              preço, desconto, nota ou disponibilidade.
            </li>
            <li>
              Atualizar ou remover links quebrados e ofertas vencidas.
            </li>
            <li>
              Nunca transformar artigos em listas de produtos: as recomendações
              ficam subordinadas ao conteúdo técnico.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Dúvidas">
          <p>
            Se você tem alguma dúvida sobre recomendações publicadas neste
            site, envie uma mensagem pelo{" "}
            <Link
              href="/contato"
              className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              canal de contato
            </Link>
            .
          </p>
        </PolicySection>
      </div>
    </PageShell>
  )
}
