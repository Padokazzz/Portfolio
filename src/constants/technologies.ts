import {
  Blocks,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Layers3,
  Layout,
  MonitorSmartphone,
  Network,
  Radio,
  Server,
  Smartphone,
  Terminal,
} from "lucide-react"

export const TECHNOLOGY_GROUPS = [
  {
    title: "Frontend & Mobile",
    description: "Interfaces web e mobile.",
    items: [
      {
        name: "Flutter / Dart",
        detail: "Mobile multiplataforma",
        icon: Smartphone,
      },
      {
        name: "React / Next.js",
        detail: "Interfaces web",
        icon: Layers3,
      },
      {
        name: "TypeScript",
        detail: "Aplicacoes tipadas",
        icon: FileCode2,
      },
      {
        name: "HTML & CSS",
        detail: "Semantica e estilo",
        icon: Layout,
      },
      {
        name: "Responsividade",
        detail: "Mobile first",
        icon: MonitorSmartphone,
      },
      {
        name: "Tailwind CSS",
        detail: "Estilos utilitarios",
        icon: Layout,
      },
    ],
  },
  {
    title: "Backend",
    description: "APIs e servicos de aplicacao.",
    items: [
      {
        name: "C# / .NET",
        detail: "Backend com .NET",
        icon: Code2,
      },
      {
        name: "Node.js",
        detail: "Backend JS/TS",
        icon: Terminal,
      },
      {
        name: "APIs REST",
        detail: "Contratos HTTP",
        icon: Network,
      },
      {
        name: "SignalR / WebSockets",
        detail: "Tempo real",
        icon: Radio,
      },
    ],
  },
  {
    title: "Banco de Dados",
    description: "Dados relacionais e modelagem.",
    items: [
      {
        name: "SQL Server",
        detail: "Ecossistema Microsoft",
        icon: Database,
      },
      {
        name: "PostgreSQL",
        detail: "Banco relacional open source",
        icon: Database,
      },
      {
        name: "SQL",
        detail: "Consultas e joins",
        icon: Terminal,
      },
      {
        name: "Modelagem de Dados",
        detail: "Entidades e relacoes",
        icon: Blocks,
      },
    ],
  },
  {
    title: "Infraestrutura",
    description: "Ambientes e versionamento.",
    items: [
      {
        name: "Docker",
        detail: "Containers",
        icon: Container,
      },
      {
        name: "Oracle Cloud",
        detail: "Recursos em nuvem",
        icon: Server,
      },
      {
        name: "Linux",
        detail: "Servidores e terminal",
        icon: Terminal,
      },
      {
        name: "Git / GitHub",
        detail: "Controle de versao",
        icon: GitBranch,
      },
    ],
  },
] as const
