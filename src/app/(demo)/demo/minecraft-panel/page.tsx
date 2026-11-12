import type { Metadata } from "next"

import { MinecraftPanelDemo } from "@/components/project/minecraft-panel-demo"

export const metadata: Metadata = {
  title: "Painel Minecraft — administração de servidor",
  description:
    "Demonstração do painel de administração de servidor Minecraft: jogadores, permissões e status do mundo.",
}

export default function MinecraftPanelDemoPage() {
  return <MinecraftPanelDemo />
}
