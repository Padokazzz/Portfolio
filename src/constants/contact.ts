import { Download, GitBranch, Mail, UserRound } from "lucide-react"

export const CONTACT_LINKS = [
  {
    label: "Email",
    value: "Enviar mensagem",
    href: "mailto:leonardopadilhak@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Perfil profissional",
    href: "https://www.linkedin.com/in/leonardo-padilha-kawashaki/",
    icon: UserRound,
    external: true,
  },
  {
    label: "GitHub",
    value: "Projetos e codigo",
    href: "https://github.com/padokazzz",
    icon: GitBranch,
    external: true,
  },
  {
    label: "Curriculo",
    value: "Baixar PDF",
    href: "/Leonardo_Padilha_CV_PT.pdf",
    icon: Download,
    external: true,
  },
] as const
