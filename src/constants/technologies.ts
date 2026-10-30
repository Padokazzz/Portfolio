import {
  Blocks,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  KeyRound,
  Layers3,
  Layout,
  MessageCircle,
  MonitorSmartphone,
  Network,
  Package,
  Palette,
  Radio,
  Server,
  Smartphone,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react"

/**
 * Cinco grupos cobrindo as tecnologias usadas nos projetos e experiencias
 * registrados no repositorio (src/constants/projects.ts e experience.ts).
 */
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
    description: "APIs, dominio e regras de negocio.",
    items: [
      {
        name: "Python / Django",
        detail: "Dominio e APIs",
        icon: Braces,
      },
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
    description: "Dados relacionais, cache e modelagem.",
    items: [
      {
        name: "PostgreSQL",
        detail: "Banco relacional open source",
        icon: Database,
      },
      {
        name: "SQL Server",
        detail: "Ecossistema Microsoft",
        icon: Database,
      },
      {
        name: "Redis",
        detail: "Cache e canal de eventos",
        icon: Zap,
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
    description: "Containers, ambientes e nuvem.",
    items: [
      {
        name: "Docker",
        detail: "Containers",
        icon: Container,
      },
      {
        name: "Linux",
        detail: "Servidores e terminal",
        icon: Terminal,
      },
      {
        name: "AWS",
        detail: "Servicos em nuvem",
        icon: Cloud,
      },
      {
        name: "Oracle Cloud",
        detail: "Recursos em nuvem",
        icon: Server,
      },
    ],
  },
  {
    title: "Ferramentas e integrações",
    description: "Versao, automacao e conexoes.",
    items: [
      {
        name: "Git / GitHub",
        detail: "Controle de versao",
        icon: GitBranch,
      },
      {
        name: "GitHub Actions",
        detail: "CI/CD automatizado",
        icon: Workflow,
      },
      {
        name: "Vite",
        detail: "Build e dev server",
        icon: Package,
      },
      {
        name: "JWT",
        detail: "Autenticacao entre camadas",
        icon: KeyRound,
      },
      {
        name: "Chatbot WhatsApp",
        detail: "Atendimento integrado",
        icon: MessageCircle,
      },
      {
        name: "UI / Prototipacao",
        detail: "Design de interfaces",
        icon: Palette,
      },
    ],
  },
] as const
