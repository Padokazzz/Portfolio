"use client"

import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  FolderKanban,
  Home,
  Plus,
  ReceiptText,
  Settings,
  UserCircle,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"

const months = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const transactions = [
  {
    id: "1",
    description: "Salario",
    categoryName: "Receita",
    date: "03/07/2026",
    amount: 4800,
    type: 1,
  },
  {
    id: "2",
    description: "Mercado",
    categoryName: "Casa",
    date: "05/07/2026",
    amount: 384.9,
    type: 2,
  },
  {
    id: "3",
    description: "Internet",
    categoryName: "Servicos",
    date: "08/07/2026",
    amount: 119.9,
    type: 2,
  },
  {
    id: "4",
    description: "Freelance",
    categoryName: "Receita",
    date: "12/07/2026",
    amount: 950,
    type: 1,
  },
]

const navigationItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Contas", icon: Wallet },
  { label: "Transacoes", icon: ReceiptText },
  { label: "Categorias", icon: FolderKanban },
  { label: "Configuracoes", icon: Settings },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

type SummaryCardProps = {
  title: string
  value: string
  description: string
}

function SummaryCard({ title, value, description }: SummaryCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <strong className="mt-3 block text-2xl font-semibold text-slate-950">
        {value}
      </strong>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </section>
  )
}

export function FinTrackDemo() {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const totals = useMemo(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === 1)
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    const totalExpense = transactions
      .filter((transaction) => transaction.type === 2)
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    return {
      overallBalance: 12840.5,
      totalIncome,
      totalExpense,
      finalBalance: totalIncome - totalExpense,
      transactions: transactions.length,
    }
  }, [])

  const chartItems = [
    {
      name: "Receitas",
      amount: totals.totalIncome,
      color: "bg-emerald-600",
    },
    {
      name: "Despesas",
      amount: totals.totalExpense,
      color: "bg-rose-600",
    },
    {
      name: "Saldo",
      amount: totals.finalBalance,
      color: "bg-blue-600",
    },
  ]

  const maxChartValue = Math.max(...chartItems.map((item) => item.amount))

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Wallet aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">FinTrack</p>
              <p className="text-xs text-slate-500">Gestao financeira</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <UserCircle aria-hidden="true" className="size-8 text-slate-500" />
              <div>
                <p className="text-sm font-medium">Leonardo</p>
                <p className="text-xs text-slate-500">Demo local</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white lg:hidden">
                  <Wallet aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold sm:text-base">
                    Dashboard
                  </p>
                  <p className="hidden text-xs text-slate-500 sm:block">
                    Resumo financeiro mensal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  <span className="hidden sm:inline">Portfolio</span>
                </Link>

                <button className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-3 text-sm font-medium text-white shadow-sm">
                  <Plus aria-hidden="true" className="size-4" />
                  <span className="hidden sm:inline">Nova transacao</span>
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-2xl font-semibold text-slate-950">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Acompanhe o resumo financeiro do periodo selecionado.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="text-sm font-medium text-slate-700">
                  Mes
                  <select
                    value={month}
                    onChange={(event) => setMonth(Number(event.target.value))}
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 sm:w-40"
                  >
                    {months.map((label, index) => (
                      <option key={label} value={index + 1}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Ano
                  <input
                    type="number"
                    min={2000}
                    max={2100}
                    value={year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 sm:w-28"
                  />
                </label>
              </div>
            </header>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <SummaryCard
                title="Saldo geral"
                value={formatCurrency(totals.overallBalance)}
                description="Soma das contas"
              />
              <SummaryCard
                title="Receitas"
                value={formatCurrency(totals.totalIncome)}
                description="Entradas do mes"
              />
              <SummaryCard
                title="Despesas"
                value={formatCurrency(totals.totalExpense)}
                description="Saidas do mes"
              />
              <SummaryCard
                title="Saldo final"
                value={formatCurrency(totals.finalBalance)}
                description="Receitas menos despesas"
              />
              <SummaryCard
                title="Transacoes"
                value={String(totals.transactions)}
                description="Movimentos registrados"
              />
            </section>

            <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-slate-950">
                    <BarChart3 aria-hidden="true" className="size-4" />
                    Visao mensal
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Comparativo de receitas, despesas e saldo.
                  </p>
                </div>

                <div className="grid h-72 grid-cols-3 items-end gap-6 border-b border-slate-200 px-4 pb-6">
                  {chartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex h-full flex-col justify-end"
                    >
                      <div
                        className={cn(
                          "mx-auto w-full max-w-24 rounded-t-md",
                          item.color
                        )}
                        style={{
                          height: `${Math.max(
                            (item.amount / maxChartValue) * 100,
                            12
                          )}%`,
                        }}
                      />
                      <p className="mt-3 text-center text-xs font-medium text-slate-600">
                        {item.name}
                      </p>
                      <p className="mt-1 text-center text-xs text-slate-500">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-slate-950">
                    <CreditCard aria-hidden="true" className="size-4" />
                    Transacoes recentes
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Ultimos movimentos do periodo.
                  </p>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => {
                    const isIncome = transaction.type === 1

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-950">
                            {transaction.description}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {transaction.categoryName} - {transaction.date}
                          </p>
                        </div>

                        <strong
                          className={cn(
                            "whitespace-nowrap text-sm font-semibold",
                            isIncome ? "text-emerald-600" : "text-rose-600"
                          )}
                        >
                          {isIncome ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </strong>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
