import Image from "next/image"

import type { ProjectImage } from "@/constants/projects"
import { cn } from "@/lib/utils"

/** Hostname curto exibido na moldura de janela do screenshot. */
export function frameLabel(src: string) {
  const file = src.split("/").pop() ?? src
  return file.replace(/\.(webp|png|jpg|jpeg)$/, "") + ".app"
}

type ProjectFrameProps = {
  image: ProjectImage
  /** Tamanho declarado para o next/image otimizar por viewport. */
  sizes?: string
}

/**
 * Moldura de screenshot 16/10 compartilhada pelo carrossel da home e pela
 * listagem de projetos. Três tratamentos:
 * - `phone`: mockup de celular sobre fundo ambiente (apps mobile);
 * - `fit: "contain"`: print inteiro sobre fundo ambiente borrado;
 * - padrao: cover cortando pelo topo.
 */
export function ProjectFrame({
  image,
  sizes = "(min-width: 1024px) 44vw, 92vw",
}: ProjectFrameProps) {
  if (image.phone) {
    return (
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border border-[#273248] bg-[#080b12] aspect-[16/10]">
        {/* Fundo ambiente: a propria paleta do app, borrada, da profundidade ao retrato. */}
        <Image
          src={image.src}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className="scale-125 object-cover opacity-55 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(139_92_246/0.16),rgb(8_11_18/0.86)_64%)]"
        />

        <div className="relative h-[86%] w-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-[1.9rem] bg-[#8b5cf6]/20 blur-xl"
          />
          <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#080b12] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.9)]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/55"
            />
            <Image
              src={image.src}
              alt={image.alt}
              height={1200}
              width={675}
              sizes="(min-width: 1024px) 22vw, 46vw"
              className="h-full w-auto object-cover object-top transition duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgb(8_11_18/0.34))]" />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-[#273248] bg-[#080b12] aspect-[16/10]">
      {image.fit === "contain" ? (
        <>
          {/* Fundo ambiente: a propria paleta do app, borrada,
              preenche o frame sem esticar nem cortar o print. */}
          <Image
            src={image.src}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="scale-125 object-cover opacity-40 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(139_92_246/0.14),rgb(8_11_18/0.88)_64%)]"
          />
        </>
      ) : null}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className={cn(
          "relative transition duration-700 ease-out group-hover:scale-[1.015]",
          image.fit === "contain"
            ? "object-contain p-3"
            : "object-cover object-top"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(8_11_18/0.42))]" />
    </div>
  )
}
