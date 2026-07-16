import { Search } from "lucide-react"

export function BlogSearchForm({ action, defaultValue }: { action: string; defaultValue?: string }) {
  return (
    <form action={action} role="search" className="flex h-14 w-full items-center gap-3 rounded-xl border border-cyan-300/20 bg-[linear-gradient(110deg,rgba(34,211,238,.07),rgba(139,92,246,.06),rgba(0,0,0,.12))] px-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] transition focus-within:border-cyan-300/60 focus-within:ring-2 focus-within:ring-cyan-300/10">
      <Search aria-hidden="true" className="size-4 text-cyan-200" />
      <label htmlFor="blog-search" className="sr-only">Pesquisar artigos</label>
      <input id="blog-search" name="busca" type="search" defaultValue={defaultValue} placeholder="Pesquise por assunto, tecnologia ou palavra-chave" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      <button type="submit" className="sr-only">Buscar</button>
    </form>
  )
}
