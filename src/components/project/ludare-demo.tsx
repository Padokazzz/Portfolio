"use client"

import {
  ArrowLeft,
  BatteryFull,
  Bell,
  Camera,
  Eye,
  Heart,
  Home,
  MessageCircle,
  MoreVertical,
  PlusSquare,
  Search,
  Share2,
  Star,
  Tv,
  Wifi,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type Story = {
  name: string
  image?: string
  create?: boolean
}

type FeedPost = {
  id: string
  author: string
  avatar: string
  time: string
  image: string
  imageAlt: string
  likes: number
  views: number
}

const stories: Story[] = [
  { name: "Criar", create: true },
  {
    name: "Ana",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "Carlos",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "Maria",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "Joao",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "Fer",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=180&q=80",
  },
]

const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    author: "Ana Silva",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    time: "ha 5 min",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=90",
    imageAlt: "Pizza fatiada em uma tabua de madeira",
    likes: 15,
    views: 45,
  },
  {
    id: "post-2",
    author: "Carlos Mendes",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    time: "ha 18 min",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=90",
    imageAlt: "Pessoas em uma festa com luzes coloridas",
    likes: 128,
    views: 320,
  },
]

const navItems = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "events", label: "Eventos", icon: Star },
  { id: "publish", label: "Publicar", icon: PlusSquare },
  { id: "review", label: "Resenha", icon: MessageCircle },
  { id: "tv", label: "TV Resenha", icon: Tv },
]

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pt-2.5 text-xs font-semibold text-[#f4f0f5]">
      <div className="flex items-center gap-1.5">
        <span>14:43</span>
        <span className="size-1.5 rounded-full bg-[#f4f0f5]" />
        <span className="size-1.5 rounded-full border border-[#f4f0f5]" />
        <span className="size-1.5 rounded-full bg-[#f4f0f5]" />
      </div>

      <div className="flex items-center gap-1.5">
        <Wifi aria-hidden="true" className="size-3.5" />
        <span className="text-[10px] leading-none">5G</span>
        <BatteryFull aria-hidden="true" className="size-4" />
        <span>100%</span>
      </div>
    </div>
  )
}

function StoryStrip() {
  return (
    <section className="px-3 pt-4">
      <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <button
            key={story.name}
            type="button"
            className="flex w-[56px] shrink-0 flex-col items-center gap-1.5"
          >
            <span className="grid size-14 place-items-center rounded-[18px] border-2 border-[#c8cbff] bg-[#202020] p-1">
              {story.create ? (
                <span className="grid size-full place-items-center rounded-[13px] text-[#c8cbff]">
                  <Camera aria-hidden="true" className="size-7" />
                </span>
              ) : (
                <span className="relative block size-full overflow-hidden rounded-[13px]">
                  <Image
                    src={story.image ?? ""}
                    alt={`Story de ${story.name}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
              )}
            </span>
            <span className="max-w-full truncate text-xs font-semibold text-[#d8d4dc]">
              {story.name}
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
    <article className="pt-5 text-[#d8d4dc]">
      <header className="flex items-center gap-3 px-3.5 pb-4">
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
          <h2 className="truncate text-sm font-bold leading-tight">
            {post.author}
          </h2>
          <p className="mt-1 text-xs leading-none text-[#b8b4bd]">
            {post.time}
          </p>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-[#c9c5ce]"
          aria-label="Mais opcoes"
        >
          <MoreVertical aria-hidden="true" className="size-5" />
        </button>
      </header>

      <div className="relative aspect-[4/4.65] w-full bg-zinc-950">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="430px"
          className="object-cover"
        />
      </div>

      <div className="px-6 pb-4 pt-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onToggleLike}
            className={cn(
              "text-[#d8d4dc] transition",
              liked && "text-[#ff5a65]"
            )}
            aria-label={liked ? "Remover curtida" : "Curtir"}
          >
            <Heart
              aria-hidden="true"
              className={cn("size-6", liked && "fill-current")}
            />
          </button>

          <button
            type="button"
            className="text-[#d8d4dc]"
            aria-label="Comentar"
          >
            <MessageCircle aria-hidden="true" className="size-6" />
          </button>

          <button
            type="button"
            className="text-[#d8d4dc]"
            aria-label="Compartilhar"
          >
            <Share2 aria-hidden="true" className="size-6" />
          </button>
        </div>

        <p className="mt-4 flex items-center gap-4 text-xs font-semibold text-[#bcb8c1]">
          <span>{post.likes + (liked ? 1 : 0)} curtidas</span>
          <span className="inline-flex items-center gap-1.5">
            <Eye aria-hidden="true" className="size-3.5" />
            {post.views}
          </span>
        </p>
      </div>
    </article>
  )
}

export function LudareDemo() {
  const [activeNav, setActiveNav] = useState("home")
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})

  const selectedTabLabel = useMemo(
    () => navItems.find((item) => item.id === activeNav)?.label ?? "Inicio",
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
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 px-4 py-3 lg:grid lg:grid-cols-[0.75fr_1fr] lg:items-center lg:px-8">
        <section className="hidden space-y-5 lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white transition hover:bg-white/[0.07]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Portfolio
          </Link>

          <div className="max-w-md space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#ff5a65]">
              Demo mobile
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Feed do Ludare em uma experiencia mobile no navegador.
            </h1>
            <p className="text-sm leading-6 text-zinc-300">
              Ajustado para se aproximar da tela real: tema escuro, stories no
              topo, post com midia grande, acoes sociais e navegacao inferior.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3">
            {[
              ["Tema", "Dark"],
              ["Aba ativa", selectedTabLabel],
              ["Tela", "Feed"],
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

        <section className="mx-auto w-full max-w-[360px] lg:ml-auto">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-zinc-950 p-1.5 shadow-2xl shadow-black/50">
            <div className="relative overflow-hidden rounded-[1.35rem] bg-[#202020] text-[#d8d4dc]">
              <div className="flex h-[min(720px,calc(100svh-1.5rem))] min-h-[560px] flex-col">
                <StatusBar />

                <header className="px-5 pb-3 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-[2.05rem] font-light leading-none tracking-wide text-[#e8e4ec]">
                      Ludare
                    </h1>

                    <div className="flex items-center gap-5 text-[#d8d4dc]">
                      <button type="button" aria-label="Buscar usuarios">
                        <Search aria-hidden="true" className="size-6" />
                      </button>
                      <button type="button" aria-label="Notificacoes">
                        <Bell aria-hidden="true" className="size-6" />
                      </button>
                      <span className="relative block size-10 overflow-hidden rounded-full border-2 border-[#123a87] bg-[#123a87]">
                        <Image
                          src="/images/profile.jpg"
                          alt="Avatar de Leonardo Padilha"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                    </div>
                  </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto pb-22 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <StoryStrip />

                  {feedPosts.map((post) => (
                    <FeedCard
                      key={post.id}
                      post={post}
                      liked={Boolean(likedPosts[post.id])}
                      onToggleLike={() => toggleLike(post.id)}
                    />
                  ))}
                </div>

                <nav className="absolute inset-x-0 bottom-0 z-20 bg-[#202020] px-2 pb-3 pt-1.5">
                  <div className="grid grid-cols-5 gap-1">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const active = activeNav === item.id

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveNav(item.id)}
                          className="flex flex-col items-center gap-0.5 rounded-xl px-0.5 py-1 text-[10px] font-bold text-[#d8d4dc]"
                        >
                          <span
                            className={cn(
                              "grid size-8 place-items-center rounded-lg",
                              active
                                ? "border-2 border-[#ff5a65] text-[#ff5a65]"
                                : "text-[#d8d4dc]"
                            )}
                          >
                            <Icon aria-hidden="true" className="size-5" />
                          </span>
                          <span className="truncate">{item.label}</span>
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
