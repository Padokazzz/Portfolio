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
      className="surface mt-10 flex max-w-2xl gap-2 rounded-lg border p-2"
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
        className="min-w-0 flex-1 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit" size="lg" className="px-4">
        <Search aria-hidden="true" />
        Buscar
      </Button>
    </form>
  )
}
