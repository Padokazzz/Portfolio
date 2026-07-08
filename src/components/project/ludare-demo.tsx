"use client"

import {
  ArrowLeft,
  Bell,
  Bookmark,
  CheckCircle2,
  Eye,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  PlayCircle,
  PlusSquare,
  Search,
  Send,
  Share2,
  Star,
  Tv,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type FeedPost = {
  id: string
  author: string
  handle: string
  avatar: string
  verified?: boolean
  time: string
  mediaType: "image" | "video" | "carousel"
  image: string
  imageAlt: string
  caption: string
  likes: number
  comments: number
  views: number
  location: string
}

const flashdares = [
  {
    name: "Voce",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    active: false,
  },
  {
    name: "Ludare",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=160&q=80",
    active: true,
  },
  {
    name: "Eventos",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=160&q=80",
    active: true,
  },
  {
    name: "Praia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=160&q=80",
    active: true,
  },
  {
    name: "Role",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=160&q=80",
    active: true,
  },
]

const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    author: "Ana Clara",
    handle: "@anacl",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    verified: true,
    time: "agora",
    mediaType: "carousel",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Pessoas em uma festa com luzes coloridas",
    caption:
      "Fim de tarde com a galera. Marcando o pessoal que sempre aparece nas melhores resenhas.",
    likes: 1284,
    comments: 86,
    views: 8420,
    location: "Sao Paulo, BR",
  },
  {
    id: "post-2",
    author: "Bruno Lima",
    handle: "@brunolimadev",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    time: "12 min",
    mediaType: "video",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Show com instrumentos musicais e luzes no palco",
    caption:
      "Trecho da TV Resenha de hoje. Video curto, curtidas em tempo real e comentarios sem sair do feed.",
    likes: 932,
    comments: 41,
    views: 12600,
    location: "Curitiba, BR",
  },
  {
    id: "post-3",
    author: "Marina Souza",
    handle: "@marisouza",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    verified: true,
    time: "34 min",
    mediaType: "image",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Casa iluminada ao ar livre durante um evento",
    caption:
      "Evento salvo, convite enviado e feed atualizado. Tudo no mesmo fluxo mobile.",
    likes: 2176,
    comments: 153,
    views: 18400,
    location: "Florianopolis, BR",
  },
]

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "events", label: "Eventos", icon: Star },
  { id: "publish", label: "Publicar", icon: PlusSquare },
  { id: "review", label: "Resenha", icon: MessageCircle, badge: 3 },
  { id: "tv", label: "TV", icon: Tv },
]

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function StatPill({
  icon: Icon,
  label,
}: {
  icon: typeof Heart
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600">
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  )
}

function FlashdareStrip() {
  return (
    <section className="border-b border-zinc-100 bg-white px-4 py-3">
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {flashdares.map((item) => (
          <button
            key={item.name}
            type="button"
            className="flex w-16 shrink-0 flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "rounded-full p-0.5",
                item.active
                ? "bg-gradient-to-tr from-[#ff3158] via-[#9b5cff] to-[#19d3ff]"
                  : "bg-zinc-200"
              )}
            >
              <span className="block rounded-full bg-white p-0.5">
                <span className="relative block size-12 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={`Flashdare de ${item.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
              </span>
            </span>
            <span className="max-w-full truncate text-[11px] text-zinc-700">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function FeedCard({
  post,
  liked,
  onToggleLike,
}: {
  post: FeedPost
  liked: boolean
  onToggleLike: () => void
}) {
  return (
    <article className="border-b border-zinc-100 bg-white">
      <header className="flex items-center gap-3 px-4 py-3">
        <span className="relative block size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={post.avatar}
            alt={`Avatar de ${post.author}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-sm font-semibold text-zinc-950">
              {post.author}
            </h2>
            {post.verified && (
              <CheckCircle2
                aria-label="Perfil verificado"
                className="size-4 text-sky-500"
              />
            )}
          </div>
          <p className="truncate text-xs text-zinc-500">
            {post.handle} - {post.location} - {post.time}
          </p>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100"
          aria-label="Mais opcoes"
        >
          <MoreHorizontal aria-hidden="true" className="size-5" />
        </button>
      </header>

      <div className="relative bg-zinc-950">
        <div className="relative aspect-square w-full">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="430px"
            className="object-cover"
          />
        </div>

        {post.mediaType === "video" && (
          <div className="absolute inset-0 grid place-items-center bg-black/10">
            <span className="rounded-full bg-black/45 p-3 text-white backdrop-blur">
              <PlayCircle aria-hidden="true" className="size-10" />
            </span>
          </div>
        )}

        {post.mediaType === "carousel" && (
          <div className="absolute right-3 top-3 rounded-full bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
            1/4
          </div>
        )}
      </div>

      <div className="space-y-3 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleLike}
              className={cn(
                "rounded-full p-2 transition",
                liked ? "text-red-500" : "text-zinc-800 hover:bg-zinc-100"
              )}
              aria-label={liked ? "Remover curtida" : "Curtir"}
            >
              <Heart
                aria-hidden="true"
                className={cn("size-5", liked && "fill-current")}
              />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-zinc-800 hover:bg-zinc-100"
              aria-label="Comentar"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-zinc-800 hover:bg-zinc-100"
              aria-label="Compartilhar"
            >
              <Share2 aria-hidden="true" className="size-5" />
            </button>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-zinc-800 hover:bg-zinc-100"
            aria-label="Salvar"
          >
            <Bookmark aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatPill
            icon={Heart}
            label={`${formatCompact(post.likes + (liked ? 1 : 0))} curtidas`}
          />
          <StatPill
            icon={MessageCircle}
            label={`${formatCompact(post.comments)} comentarios`}
          />
          <StatPill
            icon={Eye}
            label={`${formatCompact(post.views)} views`}
          />
        </div>

        <p className="text-sm leading-5 text-zinc-700">
          <span className="font-semibold text-zinc-950">{post.handle}</span>{" "}
          {post.caption}
        </p>

        <button type="button" className="text-xs font-medium text-zinc-500">
          Ver todos os comentarios
        </button>
      </div>
    </article>
  )
}

export function LudareDemo() {
  const [activeNav, setActiveNav] = useState("home")
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({
    "post-1": true,
  })

  const selectedTabLabel = useMemo(
    () => navItems.find((item) => item.id === activeNav)?.label ?? "Home",
    [activeNav]
  )

  function toggleLike(postId: string) {
    setLikedPosts((current) => ({
      ...current,
      [postId]: !current[postId],
    }))
  }

  return (
    <main className="min-h-screen bg-[#11100f] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 lg:grid lg:grid-cols-[0.75fr_1fr] lg:items-center lg:px-8">
        <section className="hidden space-y-5 lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white transition hover:bg-white/[0.07]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Portfolio
          </Link>

          <div className="max-w-md space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7fc7d9]">
              Demo mobile
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Feed fake do Ludare com experiencia de app no navegador.
            </h1>
            <p className="text-sm leading-6 text-zinc-300">
              Uma simulacao do fluxo principal do app: feed publico, Flashdare,
              acoes de post, contadores, videos, carrossel e navegacao inferior
              inspirada no projeto Flutter real.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3">
            {[
              ["Posts", "3"],
              ["Aba ativa", selectedTabLabel],
              ["Stack", "Flutter + .NET"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
              >
                <span className="block text-xs text-zinc-400">{label}</span>
                <strong className="mt-1 block text-sm">{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[430px] lg:ml-auto">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-950 p-2 shadow-2xl shadow-black/50">
            <div className="relative overflow-hidden rounded-[1.55rem] bg-white text-zinc-950">
              <div className="flex h-[min(820px,calc(100svh-2rem))] min-h-[680px] flex-col">
                <header className="sticky top-0 z-20 border-b border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                        Ludare
                      </p>
                      <h1 className="text-xl font-semibold tracking-wide">
                        Ludare
                      </h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100"
                        aria-label="Buscar usuarios"
                      >
                        <Search aria-hidden="true" className="size-5" />
                      </button>
                      <button
                        type="button"
                        className="relative rounded-full p-2 text-zinc-700 hover:bg-zinc-100"
                        aria-label="Notificacoes"
                      >
                        <Bell aria-hidden="true" className="size-5" />
                        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
                      </button>
                    </div>
                  </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto bg-zinc-50 pb-24">
                  <FlashdareStrip />

                  <div className="border-b border-zinc-100 bg-white px-4 py-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                      <span className="relative block size-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src="/images/profile.jpg"
                          alt="Avatar de Leonardo Padilha"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <button
                        type="button"
                        className="flex-1 rounded-full bg-white px-4 py-2 text-left text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-100"
                      >
                        Compartilhe uma resenha...
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-zinc-950 p-2 text-white"
                        aria-label="Publicar"
                      >
                        <Send aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  </div>

                  {feedPosts.map((post) => (
                    <FeedCard
                      key={post.id}
                      post={post}
                      liked={Boolean(likedPosts[post.id])}
                      onToggleLike={() => toggleLike(post.id)}
                    />
                  ))}
                </div>

                <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-zinc-100 bg-white px-3 pb-3 pt-2">
                  <div className="grid grid-cols-5">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const active = activeNav === item.id

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveNav(item.id)}
                          className="flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium text-zinc-600"
                        >
                          <span
                            className={cn(
                              "relative grid size-8 place-items-center rounded-xl",
                              active &&
                                "border-2 border-[#7fc7d9] text-[#0891b2]"
                            )}
                          >
                            <Icon aria-hidden="true" className="size-5" />
                            {item.badge && (
                              <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white transition hover:bg-white/[0.07] lg:hidden"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar ao portfolio
          </Link>
        </section>
      </div>
    </main>
  )
}
