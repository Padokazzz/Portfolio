import {
  Database,
  FlaskConical,
  Lock,
  Radio,
  Rocket,
  Scale,
  ShieldCheck,
  Wallet,
} from "lucide-react"

/**
 * Estudo de caso do Leilao Online.
 * Todos os fatos sao extraidos do README / PLANO.md do repositorio
 * https://github.com/Padokazzz/elite-dev-leilao-online — nenhum numero
 * ou comportamento foi inventado.
 */

export const CASE_STUDY_LEILAO = {
  id: "leilao-online",
  name: "Leilão Online",
  eyebrow: "Full stack · Desafio técnico",
  summary:
    "Plataforma de leilão em tempo real com carteiras, lances via WebSocket, liquidação automática e cadeia de auditoria pública. Construída como desafio de engenharia: dinheiro em centavos, concorrencia controlada e 218 testes antes de qualquer commit.",
  image: {
    src: "/images/projects/leilao-online.webp",
    alt: "Vitrine do Leilao Online com lotes de leilao e status ao vivo",
  },
  links: [
    {
      label: "Site no ar",
      href: "https://leilao-online-eta.vercel.app/",
    },
    {
      label: "Repositório",
      href: "https://github.com/Padokazzz/elite-dev-leilao-online",
    },
  ],
} as const

/** Indicadores tecnicos verificaveis no repositorio e em producao. */
export const CASE_STUDY_METRICS = [
  { label: "Testes backend", value: "218", detail: "Suíte verde obrigatória" },
  { label: "Push em produção", value: "~1 s", detail: "Latência medida no smoke" },
  { label: "Backoff de reconexão", value: "10 s", detail: "Teto do expoente" },
  { label: "Polling de fallback", value: "8 s", detail: "Enquanto o WS cai" },
  { label: "Janela anti-snipe", value: "2 min", detail: "Reabre o relógio" },
  { label: "Precisão monetária", value: "Centavos", detail: "bigint, nunca float" },
] as const

/**
 * Camadas da arquitetura, do browser ao banco.
 * Ordem = ordem do fluxo de uma requisicao real.
 */
export const CASE_STUDY_LAYERS = [
  {
    title: "Front-end",
    subtitle: "React 19 · Vite · TypeScript",
    detail: "SPA sem UI kit, tema claro/escuro com variáveis CSS e script anti-flash.",
    tags: ["/vitrine", "/carteira", "/comprovantes/:uuid", "/auditoria"],
  },
  {
    title: "Tempo real",
    subtitle: "Django Channels · WebSocket",
    detail: "Handshake com token na query e origem validada — 403 antes de qualquer evento.",
    tags: ["bid.placed", "auction.closed", "snapshot"],
  },
  {
    title: "Domínio",
    subtitle: "Django + DRF",
    detail: "Regras de lance, carteira, liquidação e auditoria em camada própria (não no serializer).",
    tags: ["below_min", "insufficient_funds", "seller_forbidden"],
  },
  {
    title: "Persistência",
    subtitle: "PostgreSQL + Redis",
    detail: "Ledger append-only como fonte da verdade; Redis como channel layer do Channels.",
    tags: ["ledger", "locks", "channel layer"],
  },
] as const

/** Decisoes tecnicas: o que foi escolhido e por que. */
export const CASE_STUDY_DECISIONS = [
  {
    icon: Wallet,
    title: "Centavos em bigint",
    problem: "Float soma errado em dinheiro e produz valores irreais.",
    decision: "Todo valor vive em centavos (`bigint`) até a formatação final.",
    proof: "Um parser que lia `\"50.5\"` como 10× o valor virou um bug de R$ 505 e depois teste de regressão.",
  },
  {
    icon: Scale,
    title: "Ledger append-only",
    problem: "Saldo editável não audita e aceita divergência silenciosa.",
    decision: "Movimentação só se acrescenta; saldo total, comprometido e disponível são derivados.",
    proof: "Superado, o comprometimento libera; cancelamento estorna tudo — sem UPDATE em histórico.",
  },
  {
    icon: Lock,
    title: "Lock com ordem fixa",
    problem: "Lances simultâneos podem deadlock ou deixar saldo negativo.",
    decision: "Aquisição de lock sempre na mesma ordem, dentro de transação.",
    proof: "Lances concorrentes sem deadlock e sem saldo negativo nos testes de concorrência.",
  },
  {
    icon: Radio,
    title: "Anti-snipe",
    problem: "\"Roubo de segundo\": lance no último instante vencia sem reação.",
    decision: "Lance nos últimos 2 minutos reabre o fim para 2 minutos a partir do lance.",
    proof: "Janela cheia de reação, aplicada no domínio — não no front-end.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoria com HMAC",
    problem: "Qualquer UPDATE/DELETE quebraria a prova de integridade.",
    decision: "Cadeia de hash HMAC por lote, calculada no domínio e nunca no serializer.",
    proof: "Verificação pública sem e-mail ou ID real: pseudônimos HMAC e comprovante por UUID.",
  },
  {
    icon: Scale,
    title: "Liquidação idempotente",
    problem: "Rodar o encerramento duas vezes debitaria o vencedor duas vezes.",
    decision: "Liquidação idempotente + lazy settle + worker `settle_auctions_loop` (5 s).",
    proof: "Encerrar duas vezes não debita duas vezes, e o status não depende de cron externo.",
  },
] as const

/** Fluxo real de um lance, do clique ao comprovante. */
export const CASE_STUDY_BID_FLOW = [
  {
    step: "01",
    title: "Handshake",
    detail:
      "O WebSocket valida token e header Origin no handshake. Origem fora da lista recebe 403 antes de qualquer evento chegar ao browser.",
  },
  {
    step: "02",
    title: "Validação no domínio",
    detail:
      "Lance só entra em lote ao vivo, com incremento mínimo, fundos suficientes e o leiloeiro bloqueado. Cada recusa volta com código próprio.",
  },
  {
    step: "03",
    title: "Lock e commit",
    detail:
      "Lock transacional em ordem fixa: débito do licitante, liberação de quem foi superado e registro no ledger na mesma transação.",
  },
  {
    step: "04",
    title: "Broadcast",
    detail:
      "Evento `bid.placed` sai com pseudônimo — nunca a identidade. Snapshot inicial leva `you_lead` para cada cliente.",
  },
  {
    step: "05",
    title: "Fallback",
    detail:
      "Reconexão infinita com backoff capado em 10 s, retry imediato ao voltar a aba/rede e polling a cada 8 s enquanto o WS está fora.",
  },
  {
    step: "06",
    title: "Liquidação",
    detail:
      "No fim: vencedor debitado, comprovante criado e vendedor creditado — operação idempotente, confirmada pelo worker.",
  },
] as const

/** Cobertura de testes e o processo por tras deles. */
export const CASE_STUDY_QUALITY = [
  {
    icon: FlaskConical,
    title: "218 testes no backend",
    detail:
      "Suíte rodando a cada etapa, antes de qualquer commit. A cultura do repositório é suíte verde primeiro.",
  },
  {
    icon: FlaskConical,
    title: "Sabotagem obrigatória",
    detail:
      "Quebrar a função de propósito e ver o teste falhar para provar que ele testa o que deve.",
  },
  {
    icon: Rocket,
    title: "CI no GitHub Actions",
    detail:
      "Backend contra Postgres real e front com build + lint + testes a cada push e PR.",
  },
  {
    icon: Database,
    title: "Front também testado",
    detail: "Vitest para dinheiro em centavos e parser de BRL, além de typecheck, lint e smoke visual.",
  },
] as const

/** Stack completa do projeto, agrupada por responsabilidade. */
export const CASE_STUDY_STACK = [
  {
    group: "Backend",
    items: ["Python", "Django", "Django REST Framework", "Django Channels", "ASGI (daphne)"],
  },
  {
    group: "Front-end",
    items: ["React 19", "Vite", "TypeScript", "CSS com variáveis", "Vitest"],
  },
  {
    group: "Dados",
    items: ["PostgreSQL", "Redis", "Ledger append-only", "Locks transacionais"],
  },
  {
    group: "Infra e entrega",
    items: ["Docker Compose", "GitHub Actions", "Render", "Vercel", "Neon", "Upstash"],
  },
] as const

/** Roteiro de producao: o que sobe e onde. */
export const CASE_STUDY_DEPLOY = [
  {
    env: "Front-end",
    where: "Vercel",
    detail: "Build do `front/` com rewrite de SPA — link direto e reload não dão 404.",
  },
  {
    env: "API + WebSockets",
    where: "Render",
    detail: "Docker único: collectstatic → migrate → worker de liquidação embutido → daphne.",
  },
  {
    env: "Banco",
    where: "Neon",
    detail: "PostgreSQL serverless, configurado por `DB_HOST`/`DB_NAME`/`DB_USER`/`DB_PASSWORD`.",
  },
  {
    env: "Tempo real",
    where: "Upstash",
    detail: "Redis via `REDIS_URL` (TLS) como channel layer do Channels.",
  },
] as const
