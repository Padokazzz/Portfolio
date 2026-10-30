import { CASE_STUDY_LAYERS } from "@/constants/case-study-leilao"

/**
 * Diagrama de arquitetura do Leilao Online.
 * Renderizado com elementos HTML (nao SVG) para permanecer legivel por
 * leitores de tela e responsivo sem texto rasterizado.
 */
export function ArchitectureFlow() {
  return (
    <figure className="m-0">
      <ol className="grid gap-0 md:grid-cols-4">
        {CASE_STUDY_LAYERS.map((layer, index) => (
          <li key={layer.title} className="relative flex">
            <article className="surface relative flex h-full w-full flex-col rounded-lg border p-4">
              {/* Passo numerado */}
              <span className="mb-3 inline-flex size-6 items-center justify-center rounded-md bg-[#8b5cf6]/12 font-mono text-[0.7rem] text-[#a78bfa]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-sm font-semibold">{layer.title}</h3>
              <p className="mt-0.5 font-mono text-[0.72rem] leading-4 text-[#38bdf8]">
                {layer.subtitle}
              </p>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {layer.detail}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {layer.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-white/10 bg-[#080b12]/60 px-1.5 py-0.5 font-mono text-[0.66rem] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Seta de fluxo entre as camadas (desktop: horizontal) */}
              {index < CASE_STUDY_LAYERS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-2 z-10 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-[#8b5cf6]/70 to-[#38bdf8]/70 md:block"
                />
              )}
            </article>
          </li>
        ))}
      </ol>

      <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
        Fluxo de uma requisição: do browser ao banco, com o WebSocket como
        camada paralela para os eventos em tempo real.
      </figcaption>
    </figure>
  )
}
