import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BlogPaginationProps = {
  page: number
  totalPages: number
  search?: string
  basePath?: string
}

function pageHref(basePath: string, page: number, search?: string) {
  const params = new URLSearchParams()
  if (page > 1) params.set("page", String(page))
  if (search) params.set("busca", search)
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export function BlogPagination({
  page,
  totalPages,
  search,
  basePath = "/blog",
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Paginação dos artigos"
      className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6"
    >
      {page > 1 ? (
        <Link
          href={pageHref(basePath, page - 1, search)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <ChevronLeft aria-hidden="true" />
          Anterior
        </Link>
      ) : (
        <span />
      )}

      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={pageHref(basePath, page + 1, search)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Próxima
          <ChevronRight aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
