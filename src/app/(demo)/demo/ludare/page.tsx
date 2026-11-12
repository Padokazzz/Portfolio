import type { Metadata } from "next"

import { LudareDemo } from "@/components/project/ludare-demo"

export const metadata: Metadata = {
  title: "Ludare — gestão de leilões",
  description:
    "Demonstração do Ludare: fluxo de leilão online com lotes, lances e acompanhamento em tempo real.",
}

export default function LudareDemoPage() {
  return <LudareDemo />
}
