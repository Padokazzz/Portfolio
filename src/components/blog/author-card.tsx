import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const introParagraphs = [
  "Sou movido pela curiosidade e pela vontade de entender como as coisas funcionam.",
  "Gosto de programação, jogos, animes, música e cultura pop. Assuntos diferentes, mas que têm algo em comum: sempre existe alguma coisa nova para descobrir.",
  "Este espaço é um pouco de tudo isso. Compartilho o que aprendo, projetos que desenvolvo, ideias que me fazem pensar e assuntos que despertam minha curiosidade.",
  "Afinal, conhecimento nunca é demais e entender o mundo ao nosso redor é uma das coisas mais interessantes que podemos fazer.",
]

type AuthorCardProps = {
  className?: string
}

export function AuthorCard({ className = "" }: AuthorCardProps) {
  return (
    <section
      aria-labelledby="author-card-heading"
      className={`relative overflow-hidden rounded-xl border border-blue-300/15 bg-gradient-to-br from-blue-500/[.055] to-cyan-400/[.02] p-4 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-300/80 before:via-blue-400/60 before:to-transparent ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sky-300">
        Humano por trás do código
      </p>

      <div className="mt-3 flex items-center gap-3">
        <Image
          src="/images/profile.jpg"
          alt="Leonardo Padilha"
          width={56}
          height={56}
          quality={95}
          className="size-14 shrink-0 rounded-full border border-cyan-300/20 bg-black/20 object-cover"
        />
        <div className="min-w-0">
          <h2
            id="author-card-heading"
            className="break-words text-base font-semibold leading-tight [overflow-wrap:anywhere]"
          >
            Leonardo Padilha
          </h2>
        </div>
      </div>

      <div className="mt-3 space-y-2.5 text-[12.5px] leading-5 text-muted-foreground">
        {introParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/20 bg-cyan-300/[.045] px-3 py-2 text-xs font-medium text-sky-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/[.08] hover:text-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        Um pouco mais sobre mim
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </Link>
    </section>
  )
}
