import { Reveal } from "@/components/motion/reveal"
import { ContactOptions } from "@/components/contact/contact-options"

type ContactCtaProps = {
  variant?: "home" | "page"
}

export function ContactCta({ variant = "home" }: ContactCtaProps) {
  const isPage = variant === "page"

  return (
    <section
      id="contato"
      className={isPage ? "flex-1" : "border-t border-white/10"}
    >
      <div
        className={
          isPage
            ? "mx-auto grid min-h-[calc(100svh-3.75rem)] w-full max-w-7xl items-center gap-8 px-6 py-8 lg:grid-cols-[0.92fr_1.08fr]"
            : "mx-auto grid min-h-[calc(100svh-3.75rem)] w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
        }
      >
        <Reveal className="max-w-2xl">
          <div>
            <div className="mb-4 h-1 w-20 rounded-full accent-line" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Contato
            </p>

            <h2 className="mt-4 text-2xl font-semibold leading-tight text-balance sm:text-[1.7rem]">
              Vamos conversar sobre produto, desenvolvimento ou boas ideias.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Estou aberto a conversas sobre desenvolvimento full stack, mobile,
              frontend, backend e produtos digitais com foco em entrega real,
              boa experiencia e identidade.
            </p>
          </div>

          <div className="surface mt-6 max-w-md rounded-md border p-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-4">
              <span>status</span>
              <span className="text-foreground">disponivel</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-3">
              <span>resposta</span>
              <span className="text-foreground">ate 24h</span>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="surface overflow-hidden rounded-lg border"
        >
          <ContactOptions />
        </Reveal>
      </div>
    </section>
  )
}
