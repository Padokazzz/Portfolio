"use client"
/* eslint-disable @next/next/no-img-element -- a origem das imagens e configurada em runtime. */

import { useActionState, useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { PostFormState } from "@/app/(admin)/%5Fcontrol/painel/posts/actions"
import type { TaxonomyFormState } from "@/app/(admin)/%5Fcontrol/painel/taxonomy-actions"
import type { ImageFormState } from "@/app/(admin)/%5Fcontrol/painel/imagens/actions"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { ADMIN_POST_STATUS, type AdminPost } from "@/types/admin"
import type { BlogCategory, BlogImage, BlogTag } from "@/types/blog"

type Props = {
  post?: AdminPost
  categories: BlogCategory[]
  tags: BlogTag[]
  images: BlogImage[]
  action: (state: PostFormState, data: FormData) => Promise<PostFormState>
  createCategoryAction: (state: TaxonomyFormState, data: FormData) => Promise<TaxonomyFormState>
  createTagAction: (state: TaxonomyFormState, data: FormData) => Promise<TaxonomyFormState>
  uploadImageAction: (state: ImageFormState, data: FormData) => Promise<ImageFormState>
}

const input = "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/10"
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

export function PostForm({ post, categories, tags, images, action, createCategoryAction, createTagAction, uploadImageAction }: Props) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(action, { message: "", success: false })
  const [auxiliaryPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [cover, setCover] = useState(post?.coverImageUrl ?? "")
  const [contentHtml, setContentHtml] = useState(post?.contentHtml ?? "")
  const [contentJson, setContentJson] = useState(post?.contentJson ?? "")
  const [editorKey, setEditorKey] = useState(0)
  const [dirty, setDirty] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [tagName, setTagName] = useState("")
  const [coverAlt, setCoverAlt] = useState("")
  const coverInput = useRef<HTMLInputElement>(null)
  const [selectedCategories, setSelectedCategories] = useState(() => new Set(post?.categoryIds ?? []))
  const [selectedTags, setSelectedTags] = useState(() => new Set(post?.tagIds ?? []))
  const draftKey = `portfolio-post-draft:${post?.id ?? "new"}`
  const hasContent = contentHtml.replace(/<[^>]*>/g, "").trim().length > 0
  const canPublish = Boolean(title.trim() && slug && excerpt.trim() && hasContent && selectedCategories.size)

  function toggleSelection(kind: "category" | "tag", id: string, checked: boolean) {
    const update = kind === "category" ? setSelectedCategories : setSelectedTags
    update(current => { const next = new Set(current); if (checked) next.add(id); else next.delete(id); return next })
    setDirty(true)
  }

  useEffect(() => {
    if (post) window.localStorage.removeItem("portfolio-post-draft:new")
    const stored = window.localStorage.getItem(draftKey)
    if (!stored) return
    const timer = window.setTimeout(() => {
      try {
        const draft = JSON.parse(stored) as { version?: string; title?: string; slug?: string; excerpt?: string; cover?: string; contentHtml?: string; contentJson?: string; categoryIds?: string[]; tagIds?: string[] }
        if (post && draft.version !== post.version) { window.localStorage.removeItem(draftKey); return }
        setTitle(draft.title ?? ""); setSlug(draft.slug ?? ""); setExcerpt(draft.excerpt ?? ""); setCover(draft.cover ?? "")
        setContentHtml(draft.contentHtml ?? ""); setContentJson(draft.contentJson ?? "")
        if (draft.categoryIds) setSelectedCategories(new Set(draft.categoryIds))
        if (draft.tagIds) setSelectedTags(new Set(draft.tagIds))
        setEditorKey(value => value + 1); setMessage("Rascunho local recuperado."); setDirty(true)
      } catch { window.localStorage.removeItem(draftKey) }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [draftKey, post])

  useEffect(() => {
    if (!dirty) return
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify({ version: post?.version, title, slug, excerpt, cover, contentHtml, contentJson, categoryIds: [...selectedCategories], tagIds: [...selectedTags] }))
    }, 500)
    return () => window.clearTimeout(timer)
  }, [cover, contentHtml, contentJson, dirty, draftKey, excerpt, post?.version, selectedCategories, selectedTags, slug, title])

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault() }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  function createTaxonomy(kind: "category" | "tag") {
    const name = (kind === "category" ? categoryName : tagName).trim()
    if (!name) return
    const data = new FormData()
    data.set("name", name)
    data.set("slug", slugify(name))
    if (kind === "category") data.set("description", "")
    startTransition(async () => {
      const result = await (kind === "category" ? createCategoryAction : createTagAction)({ success: false, message: "" }, data)
      setMessage(result.message)
      if (result.success) {
        if (kind === "category") setCategoryName(""); else setTagName("")
        router.refresh()
      }
    })
  }

  function uploadCover() {
    const file = coverInput.current?.files?.[0]
    if (!file) return
    const data = new FormData()
    data.set("file", file)
    data.set("altText", coverAlt.trim())
    startTransition(async () => {
      const result = await uploadImageAction({ success: false, message: "" }, data)
      setMessage(result.message)
      if (result.success && result.imageUrl) {
        setCover(result.imageUrl)
        setDirty(true)
        setCoverAlt("")
        if (coverInput.current) coverInput.current.value = ""
      }
    })
  }

  return <form action={formAction} className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
    <input type="hidden" name="version" value={post?.version ?? ""} />
    <input type="hidden" name="slug" value={slug} />
    <input type="hidden" name="coverImageUrl" value={cover} />

    <div className="space-y-5">
      <section className="surface rounded-xl border p-5 sm:p-6">
        <label className="block">
          <span className="text-xs font-medium text-sky-200">Título</span>
          <input autoFocus required maxLength={200} name="title" value={title} onChange={event => { const value = event.target.value; setTitle(value); setDirty(true); if (!post) setSlug(slugify(value)) }} className="mt-2 w-full border-0 bg-transparent p-0 text-2xl font-semibold outline-none placeholder:text-white/25 sm:text-3xl" placeholder="Título da publicação" />
        </label>
        <label className="mt-5 block">
          <span className="text-xs font-medium text-sky-200">Resumo</span>
          <textarea name="excerpt" maxLength={500} rows={2} value={excerpt} onChange={event => { setExcerpt(event.target.value); setDirty(true) }} className={`${input} mt-2 resize-none`} placeholder="Uma frase curta para apresentar o artigo" />
        </label>
        <p className="mt-2 truncate text-[11px] text-muted-foreground">/blog/{slug || "endereco-do-post"} · SEO gerado automaticamente</p>
      </section>

      <section className="surface rounded-xl border p-4 sm:p-5">
        <RichTextEditor key={editorKey} initialHtml={contentHtml} initialJson={contentJson} images={images} uploadImageAction={uploadImageAction} onContentChange={(html, json) => { setContentHtml(html); setContentJson(json); setDirty(true) }} />
      </section>

      <details className="surface rounded-xl border p-4 sm:p-5">
        <summary className="cursor-pointer text-sm font-medium">Categorias e tags</summary>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <fieldset>
            <legend className="text-xs font-medium text-sky-200">Categorias</legend>
            <div className="mt-2 flex gap-2"><input value={categoryName} onChange={event => setCategoryName(event.target.value)} maxLength={100} className={input} placeholder="Nova categoria" /><button type="button" onClick={() => createTaxonomy("category")} disabled={auxiliaryPending || !categoryName.trim()} className="rounded-lg border border-sky-400/20 px-3 text-xs text-sky-200 disabled:opacity-40">Criar</button></div>
            <div className="mt-3 flex flex-wrap gap-2">{categories.map(item => <label key={item.id} className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs has-checked:border-sky-400/40 has-checked:bg-sky-400/10"><input className="sr-only" type="checkbox" name="categoryIds" value={item.id} checked={selectedCategories.has(item.id)} onChange={event => toggleSelection("category", item.id, event.target.checked)} />{item.name}</label>)}</div>
          </fieldset>
          <fieldset>
            <legend className="text-xs font-medium text-sky-200">Tags</legend>
            <div className="mt-2 flex gap-2"><input value={tagName} onChange={event => setTagName(event.target.value)} maxLength={80} className={input} placeholder="Nova tag" /><button type="button" onClick={() => createTaxonomy("tag")} disabled={auxiliaryPending || !tagName.trim()} className="rounded-lg border border-sky-400/20 px-3 text-xs text-sky-200 disabled:opacity-40">Criar</button></div>
            <div className="mt-3 flex flex-wrap gap-2">{tags.map(item => <label key={item.id} className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs has-checked:border-sky-400/40 has-checked:bg-sky-400/10"><input className="sr-only" type="checkbox" name="tagIds" value={item.id} checked={selectedTags.has(item.id)} onChange={event => toggleSelection("tag", item.id, event.target.checked)} />#{item.name}</label>)}</div>
          </fieldset>
        </div>
      </details>
    </div>

    <aside className="space-y-4">
      <section className="surface rounded-xl border p-4">
        <h2 className="text-sm font-medium">Imagem de capa</h2>
        {cover ? <div className="mt-3 overflow-hidden rounded-lg border border-white/10"><img src={cover} alt="Capa selecionada" className="aspect-video w-full object-cover" /><button type="button" onClick={() => setCover("")} className="w-full border-t border-white/10 py-2 text-[11px] text-muted-foreground hover:text-red-300">Remover</button></div> : <div className="mt-3 rounded-lg border border-dashed border-white/15 p-6 text-center text-xs text-muted-foreground">Sem imagem de capa</div>}
        <div className="mt-3 space-y-2"><input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" className="block w-full text-[11px] text-muted-foreground file:mr-2 file:rounded file:border-0 file:bg-sky-400/10 file:px-2 file:py-1.5 file:text-sky-200" /><input value={coverAlt} onChange={event => setCoverAlt(event.target.value)} maxLength={300} className={input} placeholder="Descrição da imagem" /><button type="button" onClick={uploadCover} disabled={auxiliaryPending} className="w-full rounded-lg border border-sky-400/20 py-2 text-xs text-sky-200 disabled:opacity-40">{auxiliaryPending ? "Enviando..." : cover ? "Trocar capa" : "Enviar capa"}</button></div>
      </section>

      {(message || state.message) && <p role="status" className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-muted-foreground">{state.message || message}</p>}
      <section className="surface rounded-xl border p-4">
        <button name="intent" value="publish" disabled={pending || !canPublish} className="w-full rounded-lg bg-[#f2d16b] px-4 py-2.5 text-sm font-semibold text-[#171a20] transition hover:bg-[#f6dc89] disabled:opacity-50">{pending ? "Salvando..." : post?.status === ADMIN_POST_STATUS.published ? "Atualizar publicação" : "Publicar"}</button>
        <button name="intent" value="save" disabled={pending || !title || !slug} className="mt-2 w-full rounded-lg border border-white/10 px-4 py-2 text-xs text-muted-foreground hover:border-sky-400/20 hover:text-sky-200 disabled:opacity-50">{post ? "Salvar sem publicar" : "Salvar rascunho"}</button>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground">{canPublish ? "SEO gerado automaticamente pelo título e resumo." : "Para publicar, informe título, resumo, conteúdo e ao menos uma categoria."}</p>
      </section>
    </aside>
  </form>
}
