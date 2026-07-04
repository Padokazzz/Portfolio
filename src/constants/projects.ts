export type ProjectLink = {
  label: string
  href: string
}

export type PortfolioProject = {
  id: string
  name: string
  eyebrow: string
  summary: string
  description: string
  status: string
  stack: string[]
  highlights: string[]
  metrics: {
    label: string
    value: string
  }[]
  demoHref: string
  links: ProjectLink[]
}

export const FEATURED_PROJECTS: PortfolioProject[] = [
  {
    id: "fintrack",
    name: "FinTrack",
    eyebrow: "Financas pessoais",
    summary: "Aplicacao full stack para controle financeiro pessoal.",
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
    summary: "Painel web para gerenciar servidor Minecraft com front e backend.",
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
