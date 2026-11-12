import type { Metadata } from "next"

import { FinTrackDemo } from "@/components/project/fintrack-demo"

export const metadata: Metadata = {
  title: "FinTrack — gestão financeira",
  description:
    "Demonstração do FinTrack: painel de finanças pessoais com contas, transações e visão mensal.",
}

export default function FinTrackDemoPage() {
  return <FinTrackDemo />
}
