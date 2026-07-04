import { Building2, Layers3 } from "lucide-react"

export const PROFESSIONAL_EXPERIENCES = [
  {
    company: "Ludare Bank",
    role: "Desenvolvedor full stack mobile",
    period: "Nov de 2025 - o momento",
    duration: "8 meses",
    summary:
      "Aplicacoes mobile, APIs em .NET e recursos em tempo real para produto financeiro digital.",
    responsibilities: [
      "Mobile com Flutter e APIs com C#/.NET.",
      "Chat, chamadas de voz/video e comunicacao em tempo real com SignalR, WebRTC e WebSocket.",
      "Integracoes REST, producao, monitoramento, performance e melhorias de UX.",
    ],
    stack: [
      "Flutter",
      "C#",
      ".NET",
      "Docker",
      "SignalR",
      "WebRTC",
      "WebSocket",
      "APIs REST",
      "Git",
    ],
    icon: Building2,
  },
  {
    company: "Codefy",
    role: "Desenvolvedor full stack",
    period: "Ago de 2025 - o momento",
    duration: "1 ano",
    summary:
      "Atuacao autonoma e remota em aplicacoes web modernas, interfaces responsivas e integracoes.",
    responsibilities: [
      "Aplicacoes web com React, TypeScript e JavaScript.",
      "Interfaces responsivas, componentes reutilizaveis e boas praticas de frontend.",
      "Integracao com APIs REST, SQL, C#/.NET e entrega ponta a ponta.",
    ],
    stack: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Git",
      "APIs REST",
      "SQL",
      "C#",
      ".NET",
    ],
    icon: Layers3,
  },
] as const
