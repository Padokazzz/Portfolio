import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { PolicySection } from "@/components/layout/policy-section"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Política de privacidade",
  "Como os dados de quem acessa leonardopadilha.com são tratados: o que é coletado, para quê, com quem é compartilhado e quais são os direitos do titular.",
  "/politica-de-privacidade",
)

export default function PrivacidadePage() {
  return (
    <PageShell
      eyebrow="Privacidade"
      title="Política de privacidade"
      description="Este documento descreve, de forma objetiva, as práticas reais de tratamento de dados deste site. Ele reflete apenas os serviços que estão de fato em uso."
    >
      <div className="space-y-0 text-sm leading-7 text-muted-foreground">
        <PolicySection title="Sobre este documento">
          <p>
            Esta política aplica-se ao site leonardopadilha.com e foi
            atualizada em 9 de novembro de 2026. Ela informa as práticas reais
            do site e não substitui orientação jurídica especializada.
          </p>
        </PolicySection>

        <PolicySection title="Responsável pelo site">
          <p>
            O site é mantido por Leonardo Padilha Kawashaki. Para dúvidas,
            solicitações ou exercício de direitos sobre dados pessoais, use o{" "}
            <Link
              href="/contato"
              className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              canal de contato do site
            </Link>
            . O canal existe exclusivamente para responder às mensagens
            enviadas por ele.
          </p>
        </PolicySection>

        <PolicySection title="Dados que tratamos">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="font-medium text-foreground">
                Formulário de contato:
              </strong>{" "}
              nome, e-mail, empresa (opcional), assunto e mensagem. São usados
              apenas para responder à sua solicitação, mediante sua própria
              iniciativa ao enviar o formulário.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Preferência de cookies:
              </strong>{" "}
              categorias aceitas ou rejeitadas, versão da política de cookies e
              data da escolha. Fica armazenada apenas no seu navegador, sem
              dados pessoais.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Cookies de sessão do painel administrativo:
              </strong>{" "}
              usados exclusivamente por quem administra o site, com proteções{" "}
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
              . Não se aplicam a visitantes do conteúdo público.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Dados técnicos de acesso:
              </strong>{" "}
              a infraestrutura de hospedagem (Vercel) pode registrar endereço
              IP, data e hora, navegador e página solicitada para segurança,
              prevenção a abuso e operação do serviço.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Conteúdo de terceiros:
              </strong>{" "}
              páginas de demonstração do portfólio podem carregar imagens
              hospedadas no CDN da Unsplash, o que gera uma requisição direta
              do seu navegador para os servidores deles.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Cookies e tecnologias semelhantes">
          <p>
            Detalhes sobre categorias, finalidades e duração estão na{" "}
            <Link
              href="/politica-de-cookies"
              className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              política de cookies
            </Link>
            . Você pode alterar ou retirar suas escolhas pelo botão
            &quot;Preferências de cookies&quot; no rodapé de qualquer página.
          </p>
        </PolicySection>

        <PolicySection title="Analytics e publicidade">
          <p>
            Hoje o site <strong className="font-medium text-foreground">não</strong>{" "}
            carrega Google Analytics, Google AdSense ou qualquer outro serviço
            de medição/publicidade de terceiros. Caso esses serviços sejam
            integrados no futuro, eles só serão ativados após o seu
            consentimento pelo banner de preferências, nas categorias
            &quot;Análise&quot; e &quot;Publicidade&quot;.
          </p>
          <p>
            Quando aplicáveis, os dados tratados por serviços do Google seguem
            a{" "}
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

        <PolicySection title="Compartilhamento">
          <p>
            Não vendemos nem alugamos dados pessoais. O compartilhamento
            limita-se ao necessário para operar o site:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              serviço externo que recebe e processa as mensagens do formulário
              de contato, exclusivamente para responder à sua solicitação;
            </li>
            <li>
              infraestrutura de hospedagem (Vercel), para disponibilizar o site
              com segurança;
            </li>
            <li>
              serviços do Google, somente caso você aceite as categorias de
              análise ou publicidade.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Retenção">
          <p>
            Mensagens do formulário de contato são mantidas pelo tempo
            necessário para responder à solicitação e para eventual
            continuação da conversa. Registros técnicos seguem a retenção da
            infraestrutura de hospedagem. A preferência de cookies permanece no
            seu navegador até que você a altere ou limpe os dados do site.
          </p>
        </PolicySection>

        <PolicySection title="Seus direitos">
          <p>
            Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode
            solicitar confirmação da existência de tratamento, acesso aos
            dados, correção de dados incompletos ou desatualizados,
            anonimização, bloqueio ou eliminação de dados desnecessários e
            informações sobre compartilhamento. As solicitações são atendidas
            pelo{" "}
            <Link
              href="/contato"
              className="text-sky-300 underline underline-offset-2 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              canal de contato
            </Link>
            .
          </p>
        </PolicySection>

        <PolicySection title="Alterações nesta política">
          <p>
            Esta página pode ser atualizada quando as práticas do site
            mudarem. A data da última atualização é indicada no início do
            documento, e a versão vigente da política de cookies fica
            registrada na sua preferência de consentimento.
          </p>
        </PolicySection>
      </div>
    </PageShell>
  )
}
