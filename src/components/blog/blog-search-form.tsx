import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BlogSearchForm({
  action,
  defaultValue,
}: {
  action: string
  defaultValue?: string
}) {
  return (
    <form
      action={action}
      role="search"
      className="flex w-full gap-2 border-b border-white/20 pb-2 transition focus-within:border-[#e7c78f]/60"
    >
      <label htmlFor="blog-search" className="sr-only">
        Buscar artigos
      </label>
      <input
        id="blog-search"
        name="busca"
        type="search"
        defaultValue={defaultValue}
        placeholder="Busque por título ou conteúdo"
        className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
      />
      <Button type="submit" variant="ghost" size="lg" className="px-3 text-[#f0dfbd] hover:bg-white/[0.04]">
        <Search aria-hidden="true" />
        Buscar
      </Button>
    </form>
  )
}
