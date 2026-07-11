import {
  Camera,
  Download,
  GitBranch,
  Mail,
  UserRound,
} from "lucide-react"

export const CONTACT_LINKS = [
  {
    label: "Email",
    value: "Enviar mensagem",
    icon: Mail,
    action: "contact" as const,
  },
  {
    label: "LinkedIn",
    value: "Perfil profissional",
    href: "https://www.linkedin.com/in/leonardo-padilha-kawashaki/",
    icon: UserRound,
    external: true,
    action: "link" as const,
  },
  {
    label: "GitHub",
    value: "Projetos e codigo",
    href: "https://github.com/padokazzz",
    icon: GitBranch,
    external: true,
    action: "link" as const,
  },
  {
    label: "Instagram",
    value: "Processo criativo",
    href: "https://www.instagram.com/padoka_oficial",
    icon: Camera,
    external: true,
    action: "link" as const,
  },
  {
    label: "Curriculo",
    value: "Baixar PDF",
    href: "/Leonardo_Padilha_CV_PT.pdf",
    icon: Download,
    external: true,
    action: "link" as const,
  },
] as const
