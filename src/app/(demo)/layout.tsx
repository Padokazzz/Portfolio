import type { Metadata } from "next"

// As demos são noindex, mas ainda são rastreadas a partir dos links da home
// e de /projetos. Sem título e descrição próprios elas herdavam os da home
// (raiz), mandando ao crawler três URLs com exatamente o mesmo <title> e a
// mesma description da home — um sinal clássico de conteúdo duplicado.
export const metadata: Metadata = {
  title: "Demonstração interativa",
  description:
    "Protótipos navegáveis dos projetos de Leonardo Padilha: interfaces reais para demonstrar decisões de produto, de UX e de engenharia.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
