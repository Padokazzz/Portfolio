export type ProjectLink = {
  label: string
  href: string
}

export type PortfolioProject = {
  id: string
  name: string
  eyebrow: string
  description: string
  status: string
  stack: string[]
  highlights: string[]
  metrics: {
    label: string
    value: string
  }[]
  demoHref?: string
  links: ProjectLink[]
}

export const FEATURED_PROJECTS: PortfolioProject[] = [
  {
    id: "ludare",
    name: "Ludare",
    eyebrow: "Rede social mobile",
    description:
      "Aplicativo mobile de rede social em producao, publicado na App Store e Play Store. Atuo no produto atual com foco em experiencia mobile, integracoes, comunicacao em tempo real e evolucao continua de funcionalidades para usuarios reais.",
    status: "Em producao",
    stack: [
      "Flutter",
      "Dart",
      "C#",
      ".NET",
      "APIs REST",
      "SignalR",
      "WebRTC",
      "WebSocket",
      "Git",
    ],
    highlights: [
      "Produto mobile publicado para iOS e Android",
      "Rede social com funcionalidades voltadas a usuarios reais",
      "Integracoes com APIs e recursos de comunicacao em tempo real",
      "Atuacao atual em evolucao, manutencao e melhorias de UX",
    ],
    metrics: [
      { label: "Plataformas", value: "iOS + Android" },
      { label: "Canal", value: "App stores" },
      { label: "Dominio", value: "Rede social" },
    ],
    demoHref: "/experimentos/ludare",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/br/app/ludare/id1628374355",
      },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.ludare.followmme&hl=pt_BR&pli=1",
      },
    ],
  },
  {
    id: "fintrack",
    name: "FinTrack",
    eyebrow: "Financas pessoais",
    description:
      "Projeto dividido entre frontend web e API, com foco em organizacao de contas, categorias, transacoes e resumos mensais. A proposta e demonstrar fluxo completo de produto: interface, regras de negocio, persistencia e autenticacao.",
    status: "MVP em evolucao",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "C#",
      "ASP.NET Core",
      "Entity Framework Core",
      "PostgreSQL",
      "JWT",
      "Docker",
    ],
    highlights: [
      "Frontend e backend separados por responsabilidade",
      "API REST com autenticacao JWT",
      "Arquitetura backend simplificada e testavel",
      "Modelo preparado para contas, categorias e transacoes",
    ],
    metrics: [
      { label: "Repositorios", value: "2" },
      { label: "Camadas", value: "Front + API" },
      { label: "Dominio", value: "Financas" },
    ],
    demoHref: "/experimentos/fintrack",
    links: [
      {
        label: "Frontend",
        href: "https://github.com/Padokazzz/fintrack-web",
      },
      {
        label: "Backend",
        href: "https://github.com/Padokazzz/FinTrack",
      },
    ],
  },
  {
    id: "minecraft-panel",
    name: "Minecraft Panel",
    eyebrow: "Painel operacional",
    description:
      "Projeto de painel administrativo pensado para centralizar operacoes de um servidor Minecraft. A proposta e explorar uma experiencia de controle com interface web, backend proprio e comandos de gestao em um contexto pratico e divertido.",
    status: "MVP tecnico",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "APIs",
      "WebSockets",
      "Docker",
      "Linux",
    ],
    highlights: [
      "Frontend e backend no mesmo repositorio",
      "Foco em operacoes e visibilidade do servidor",
      "Base para comandos, status e automacoes",
      "Cenario real para integrar UI com processos backend",
    ],
    metrics: [
      { label: "Repositorios", value: "1" },
      { label: "Camadas", value: "Full stack" },
      { label: "Dominio", value: "Servidores" },
    ],
    demoHref: "/experimentos/minecraft-panel",
    links: [
      {
        label: "Repositorio",
        href: "https://github.com/Padokazzz/minecraft-panel",
      },
    ],
  },
]
