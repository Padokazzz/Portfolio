import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { PolicySection } from "@/components/layout/policy-section"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Política de cookies",
  "Categorias de cookies e preferências usadas em leonardopadilha.com, finalidades, fornecedores e como alterar ou rejeitar categorias opcionais.",
  "/politica-de-cookies",
)

const CATEGORY_ROWS = [
  {
    category: "Necessários",
    status: "Sempre ativos",
    purpose:
      "Funcionamento básico do site, segurança e registro da sua preferência de cookies.",
  },
  {
    category: "Análise",
    status: "Opcional · desativado por padrão",
    purpose:
      "Medição de visitas e uso do site (Google Analytics), quando esse serviço for integrado. Só é ativado com consentimento.",
  },
  {
    category: "Publicidade",
    status: "Opcional · desativado por padrão",
    purpose:
      "Anúncios e personalização (Google AdSense), quando esse serviço for integrado. Só é ativado com consentimento.",
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Cookies"
      title="Política de cookies"
      description="Este site não usa cookies de análise ou publicidade hoje. As categorias opcionais existem para serem ativadas somente com a sua escolha."
    >
      <div className="space-y-0 text-sm leading-7 text-muted-foreground">
        <PolicySection title="O que são cookies">
          <p>
            Cookies são pequenos arquivos salvos no navegador ao visitar um
            site. Além de cookies, este site usa armazenamento local
            (<code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
              localStorage
            </code>
            ) para guardar a sua preferência de consentimento — esse dado fica
            apenas no seu dispositivo e não contém informações pessoais.
          </p>
        </PolicySection>

        <PolicySection title="Categorias">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold text-foreground">
                    Categoria
                  </th>
                  <th className="py-2 pr-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="py-2 font-semibold text-foreground">
                    Finalidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {CATEGORY_ROWS.map((row) => (
                  <tr key={row.category} className="border-b border-white/[0.06] align-top">
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {row.category}
                    </td>
                    <td className="py-3 pr-4">{row.status}</td>
                    <td className="py-3">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PolicySection>

        <PolicySection title="O que está em uso hoje">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                portfolio-admin-access
              </code>{" "}
              e{" "}
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                portfolio-admin-refresh
              </code>{" "}
              — cookies de sessão do painel administrativo, protegidos com{" "}
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                httpOnly
              </code>
              ,{" "}
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                secure
              </code>{" "}
              e{" "}
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                sameSite=strict
              </code>
              , usados apenas por quem administra o site. Não se aplicam a
              visitantes do conteúdo público.
            </li>
            <li>
              <code className="rounded bg-white/[0.07] px-1.5 py-0.5 text-xs">
                leonardopadilha-cookie-consent
              </code>{" "}
              (armazenamento local) — registra suas categorias, a versão desta
              política e a data da escolha.
            </li>
            <li>
              Nenhum cookie de análise ou publicidade está em uso neste momento.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Serviços de terceiros, quando integrados">
          <p>
            Hoje nenhum script de terceiros de medição ou publicidade é
            carregado. Se o site passar a usar Google Analytics (categoria
            Análise) e/ou Google AdSense (categoria Publicidade), esses scripts
            só serão carregados depois que você aceitar a categoria
            correspondente no banner de preferências — antes disso, eles ficam
            bloqueados. Informações tratadas pelo Google seguem a{" "}
            <a
              href="https://policies.google.com/privacy?hl=pt-BR"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Política de Privacidade do Google
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="Como alterar ou retirar sua escolha">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Clique em &quot;Preferências de cookies&quot; no rodapé de
              qualquer página, ajuste as categorias e salve — inclusive para
              retirar o consentimento antes concedido.
            </li>
            <li>
              Ou limpe os dados do site no seu navegador; na próxima visita o
              banner será exibido novamente.
            </li>
            <li>
              Se esta política mudar de forma relevante, a versão do registro
              muda e o banner volta a ser exibido para uma nova escolha.
            </li>
          </ul>
          <p>
            Recusar categorias opcionais não restringe o acesso ao conteúdo:
            todos os artigos e páginas continuam disponíveis.
          </p>
        </PolicySection>

        <PolicySection title="Versão desta política">
          <p>
            Versão 2026-11-09, última atualização em 9 de novembro de 2026.
            Dúvidas sobre cookies ou dados pessoais podem ser enviadas pelo{" "}
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
