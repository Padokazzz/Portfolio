"use client"

import {
  ArrowLeft,
  CheckCircle,
  Download,
  LayoutDashboard,
  RefreshCw,
  Save,
  Send,
  Square,
  Terminal,
  UploadCloud,
  Users,
} from "lucide-react"
import Link from "next/link"
import { FormEvent, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const updateStages = [
  { label: "Validando link", progress: 8 },
  { label: "Criando backup", progress: 22 },
  { label: "Enviando backup para a nuvem", progress: 38 },
  { label: "Parando servidor", progress: 52 },
  { label: "Baixando atualizacao", progress: 68 },
  { label: "Instalando arquivos", progress: 84 },
  { label: "Iniciando servidor", progress: 94 },
]

const initialLogs = [
  "[10:32:08 INFO]: Starting Minecraft Bedrock server",
  "[10:32:11 INFO]: Loading properties",
  "[10:32:15 INFO]: Level Name: Survival",
  "[10:33:01 INFO]: Server started on 0.0.0.0:19132",
  "[10:35:42 INFO]: Player connected: Leonardo",
]

const quickCommands = [
  { label: "Jogadores", command: "list", icon: Users },
  { label: "Salvar", command: "save-all", icon: Save },
  { label: "Parar", command: "stop", icon: Square },
]

export function MinecraftPanelDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "terminal">(
    "terminal"
  )
  const [logs, setLogs] = useState(initialLogs)
  const [command, setCommand] = useState("")
  const [updateUrl, setUpdateUrl] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "list",
    "save-all",
  ])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isLoadingLogs, setIsLoadingLogs] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [updateStageIndex, setUpdateStageIndex] = useState(0)
  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "running" | "success" | "error"
  >("idle")
  const logsEndRef = useRef<HTMLDivElement>(null)

  function appendLog(value: string) {
    setLogs((currentLogs) => [...currentLogs, value])
    window.setTimeout(() => {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }

  function sendCommand(commandToSend: string) {
    const trimmedCommand = commandToSend.trim()

    if (!trimmedCommand) {
      return
    }

    setCommandHistory((history) =>
      [trimmedCommand, ...history.filter((item) => item !== trimmedCommand)].slice(
        0,
        8
      )
    )
    setCommand("")
    appendLog(`> ${trimmedCommand}`)

    if (trimmedCommand === "list") {
      appendLog("[10:36:02 INFO]: There are 2/20 players online: Leonardo, Alex")
      return
    }

    if (trimmedCommand === "save-all") {
      appendLog("[10:36:06 INFO]: Saved the world")
      return
    }

    if (trimmedCommand === "stop") {
      appendLog("[10:36:12 WARN]: Stop command queued in demo mode")
      return
    }

    appendLog(`[10:36:18 INFO]: Executed command: ${trimmedCommand}`)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendCommand(command)
  }

  function handleUpdateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!updateUrl.trim()) {
      return
    }

    setIsUpdating(true)
    setUpdateStatus("running")
    setUpdateProgress(68)
    setUpdateStageIndex(4)
    appendLog("[10:37:00 INFO]: Bedrock update started from provided URL")

    window.setTimeout(() => {
      setUpdateProgress(100)
      setUpdateStageIndex(updateStages.length - 1)
      setUpdateStatus("success")
      setIsUpdating(false)
      setUpdateUrl("")
      appendLog("[10:37:08 INFO]: Update completed successfully")
    }, 900)
  }

  function refreshLogs() {
    setIsLoadingLogs(true)
    window.setTimeout(() => {
      setIsLoadingLogs(false)
      appendLog("[10:38:20 INFO]: Logs refreshed")
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-950">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-green-600 text-sm font-bold text-white">
              MC
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-gray-900 sm:text-xl">
                Minecraft Admin Panel
              </h1>
              <p className="hidden text-sm text-gray-500 sm:block">
                Painel de Controle do Servidor Bedrock
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </header>

      <div className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
          {[
            {
              id: "overview" as const,
              label: "Visao Geral",
              icon: LayoutDashboard,
            },
            { id: "terminal" as const, label: "Terminal", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "overview" ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <CheckCircle className="size-5 text-green-500" />
                    Status do Servidor
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Informacoes em tempo real do servidor Minecraft Bedrock.
                  </p>
                </div>
                <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                  Ativo
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-600">Jogadores</p>
                  <p className="mt-2 text-3xl font-bold">2/20</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Leonardo", "Alex"].map((player) => (
                      <span
                        key={player}
                        className="rounded-md border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-700"
                      >
                        {player}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-600">Versao</p>
                  <p className="mt-2 text-xl font-semibold">Bedrock 1.21.x</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Survival server - atualizado automaticamente
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Acoes rapidas</h2>
              <div className="mt-4 grid gap-3">
                {quickCommands.map((quick) => {
                  const Icon = quick.icon

                  return (
                    <button
                      key={quick.command}
                      type="button"
                      onClick={() => {
                        setActiveTab("terminal")
                        sendCommand(quick.command)
                      }}
                      className="inline-flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon aria-hidden="true" className="size-4" />
                        {quick.label}
                      </span>
                      <code className="text-xs text-gray-500">
                        {quick.command}
                      </code>
                    </button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : (
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Terminal aria-hidden="true" className="size-5" />
                    Terminal do Servidor
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Console, logs e comandos do Minecraft em uma unica tela
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAutoRefresh((value) => !value)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm",
                      autoRefresh
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200"
                    )}
                  >
                    {autoRefresh ? "Auto: ON" : "Auto: OFF"}
                  </button>
                  <button
                    type="button"
                    onClick={refreshLogs}
                    className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                  >
                    <RefreshCw
                      aria-hidden="true"
                      className={cn("size-4", isLoadingLogs && "animate-spin")}
                    />
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                  >
                    <Download aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <form
                onSubmit={handleUpdateSubmit}
                className="rounded-md border border-green-200 bg-green-50 p-3"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      value={updateUrl}
                      onChange={(event) => setUpdateUrl(event.target.value)}
                      placeholder="Cole o link .zip da atualizacao do Minecraft Bedrock"
                      disabled={isUpdating}
                      className="h-10 flex-1 rounded-md border border-green-200 bg-white px-3 text-sm outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      {isUpdating ? (
                        <RefreshCw className="size-4 animate-spin" />
                      ) : (
                        <UploadCloud className="size-4" />
                      )}
                      Atualizar
                    </button>
                  </div>

                  {updateStatus !== "idle" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-green-900">
                          {updateStatus === "success"
                            ? "Atualizacao concluida"
                            : updateStages[updateStageIndex]?.label}
                        </span>
                        <span className="tabular-nums text-green-800">
                          {updateProgress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-green-100">
                        <div
                          className="h-full rounded-full bg-green-600 transition-all duration-500"
                          style={{ width: `${updateProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </form>

              <div className="flex flex-wrap gap-2">
                {quickCommands.map((quick) => {
                  const Icon = quick.icon

                  return (
                    <button
                      key={quick.command}
                      type="button"
                      onClick={() => sendCommand(quick.command)}
                      className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {quick.label}
                    </button>
                  )
                })}
              </div>

              <div className="overflow-hidden rounded-md border border-gray-800 bg-gray-950">
                <div className="h-[420px] overflow-y-auto p-4 font-mono text-sm">
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div
                        key={`${index}-${log}`}
                        className="break-words text-gray-300"
                      >
                        <span className="mr-2 select-none text-gray-600">
                          $
                        </span>
                        {log}
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="border-t border-gray-800 bg-gray-900 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-green-400">
                      &gt;
                    </span>
                    <input
                      value={command}
                      onChange={(event) => setCommand(event.target.value)}
                      placeholder="Digite um comando"
                      className="h-10 flex-1 rounded-md border border-gray-700 bg-gray-950 px-3 font-mono text-sm text-gray-100 placeholder:text-gray-500"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center rounded-md bg-green-600 px-3 text-white"
                    >
                      <Send aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                </form>
              </div>

              {commandHistory.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {commandHistory.map((historyCommand) => (
                    <button
                      key={historyCommand}
                      type="button"
                      onClick={() => setCommand(historyCommand)}
                      className="rounded-md bg-gray-100 px-3 py-2 text-sm"
                    >
                      {historyCommand}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
