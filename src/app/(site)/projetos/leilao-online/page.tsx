import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  Layers3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ArchitectureFlow } from "@/components/sections/case-study-architecture"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import {
  CASE_STUDY_BID_FLOW,
  CASE_STUDY_DECISIONS,
  CASE_STUDY_DEPLOY,
  CASE_STUDY_LEILAO,
  CASE_STUDY_METRICS,
  CASE_STUDY_QUALITY,
  CASE_STUDY_STACK,
} from "@/constants/case-study-leilao"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Leilão Online — Estudo de caso",
  "Estudo de caso da plataforma de leilão em tempo real: Django Channels, WebSockets, ledger append-only, auditoria HMAC e 218 testes automatizados.",
  "/projetos/leilao-online",
)

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mb-6 max-w-3xl space-y-3">
      <div className="h-1 w-20 rounded-full accent-line" />
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      )}
    </Reveal>
  )
}

export default function LeilaoOnlineCaseStudyPage() {
  const project = CASE_STUDY_LEILAO

  return (
    <main className="flex-1">
      {/* Cabeçalho do estudo de caso */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <Reveal>
            <Link
              href="/#projetos"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Voltar aos projetos
            </Link>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {project.eyebrow}
                </p>
                <h1 className="text-3xl font-semibold leading-[1.08] text-balance sm:text-5xl">
                  {project.name}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6]/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                ))}
              </div>

              {/* Screenshot real do produto */}
              <figure className="surface m-0 rounded-lg border p-2">
                <figcaption className="mb-2 flex items-center gap-2 px-1">
                  <span className="size-2 rounded-full bg-[#8b5cf6]/70" />
                  <span className="size-2 rounded-full bg-[#38bdf8]/60" />
                  <span className="size-2 rounded-full bg-[#273248]" />
                  <span className="ml-1 font-mono text-[0.65rem] text-[#68758b]">
                    leilao-online.webp
                  </span>
                </figcaption>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-[#273248] bg-[#080b12]">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 92vw"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(8_11_18/0.4))]" />
                </div>
              </figure>
            </Reveal>

            {/* Indicadores técnicos */}
            <Reveal delay={0.1} className="space-y-4">
              <div className="surface rounded-lg border p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Layers3 aria-hidden="true" className="size-4" />
                  <h2 className="text-sm font-medium">Indicadores técnicos</h2>
                </div>

                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                  {CASE_STUDY_METRICS.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-md border border-white/10 bg-[#080b12]/45 p-2.5"
                    >
                      <dt className="text-xs text-muted-foreground">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 text-lg font-semibold tabular-nums text-[#a78bfa]">
                        {metric.value}
                      </dd>
                      <dd className="text-[0.7rem] leading-4 text-muted-foreground">
                        {metric.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Stack agrupada */}
              <div className="surface rounded-lg border p-4">
                <div className="mb-4 flex items-center gap-2">
                  <GitBranch aria-hidden="true" className="size-4" />
                  <h2 className="text-sm font-medium">Stack por camada</h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {CASE_STUDY_STACK.map((entry) => (
                    <div key={entry.group}>
                      <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {entry.group}
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {entry.items.map((item) => (
                          <li
                            key={item}
                            className="rounded border border-white/10 bg-[#080b12]/45 px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Arquitetura */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Arquitetura"
            title="Quatro camadas com responsabilidade separada."
            description="O domínio mora fora do serializer, o tempo real é uma camada própria e a persistência separa fonte da verdade de canal de eventos."
          />
          <Reveal>
            <ArchitectureFlow />
          </Reveal>
        </div>
      </section>

      {/* Fluxo de um lance */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Tempo real"
            title="Do clique ao comprovante, em seis passos."
            description="Cada etapa tem uma falha própria prevista: handshake negado, recusa com código, lock ordenado, broadcast anônimo, fallback e liquidação idempotente."
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDY_BID_FLOW.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <li className="surface h-full rounded-lg border p-4 transition duration-300 hover:border-[#8b5cf6]/35 hover:bg-white/[0.055]">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#38bdf8]">
                      {item.step}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#273248] to-transparent" />
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Decisões técnicas */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Decisões técnicas"
            title="Problema real, escolha consciente e prova."
            description="Nenhuma decisão foi decorativa: cada uma responde a uma falha concreta de dinheiro, concorrência ou auditoria."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CASE_STUDY_DECISIONS.map((decision, index) => {
              const Icon = decision.icon

              return (
                <Reveal key={decision.title} delay={index * 0.05}>
                  <article className="surface h-full rounded-lg border p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/35 hover:bg-white/[0.055]">
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-md bg-[#8b5cf6]/12 text-[#a78bfa]">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <h3 className="text-sm font-semibold">{decision.title}</h3>
                    </div>

                    <div className="space-y-2.5 text-xs leading-5">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground/85">
                          Problema.{" "}
                        </span>
                        {decision.problem}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground/85">
                          Escolha.{" "}
                        </span>
                        {decision.decision}
                      </p>
                      <p className="rounded-md border border-white/10 bg-[#080b12]/50 p-2.5 text-muted-foreground">
                        <span className="font-medium text-[#34d399]">
                          Prova.{" "}
                        </span>
                        {decision.proof}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Qualidade e testes */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Qualidade"
            title="218 testes antes de qualquer commit."
            description="A suíte verde é pré-condição de entrega, e a sabotagem — quebrar de propósito e ver falhar — é parte do processo."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {CASE_STUDY_QUALITY.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="surface h-full rounded-lg border p-4 transition duration-300 hover:border-[#34d399]/35 hover:bg-white/[0.055]">
                    <div className="flex gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#34d399]/10 text-[#34d399]">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deploy */}
      <section className="border-b border-white/10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Produção"
            title="Quatro serviços, um boot resolve tudo."
            description="O worker de liquidação vive no boot do dyno web porque o background worker do Render free é pago — decisão documentada no repositório."
          />

          <div className="surface overflow-hidden rounded-lg border">
            <ul className="divide-y divide-white/10">
              {CASE_STUDY_DEPLOY.map((item) => (
                <li
                  key={item.env}
                  className="grid gap-1 p-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[10rem_7rem_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="text-sm font-medium">{item.env}</span>
                  <span className="font-mono text-xs text-[#a78bfa]">
                    {item.where}
                  </span>
                  <span className="text-xs leading-5 text-muted-foreground">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Encerramento */}
      <section>
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="surface card-highlight flex flex-col gap-5 rounded-lg border p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl space-y-2">
                <h2 className="text-xl font-semibold leading-tight text-balance">
                  Ver o sistema rodando de verdade.
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  A vitrine está publicada, com lotes ao vivo, carteira e
                  auditoria pública aberta sem cadastro.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#8b5cf6] px-4 py-2.5 text-sm text-[#f1f5f9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
