"use client"

import { useActionState } from "react"
import type { AdminPost } from "@/types/admin"
import type { BlogCategory, BlogTag } from "@/types/blog"
import type { PostFormState } from "@/app/(admin)/%5Fcontrol/painel/posts/actions"

type Props = { post?: AdminPost; categories: BlogCategory[]; tags: BlogTag[]; action: (state: PostFormState, data: FormData) => Promise<PostFormState> }
const field = "mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[#e7c78f]/50"
export function PostForm({ post, categories, tags, action }: Props) {
  const [state, formAction, pending] = useActionState(action, { message: "", success: false })
  const selected = (values: string[] | undefined, id: string) => values?.includes(id)
  return (
    <form action={formAction} className="mt-8 space-y-8">
      <input type="hidden" name="version" value={post?.version ?? ""} />
      <section className="surface grid gap-5 rounded-lg border p-5 md:grid-cols-2">
        <label className="text-sm">Título<input className={field} name="title" required maxLength={200} defaultValue={post?.title} /></label>
        <label className="text-sm">Slug<input className={field} name="slug" required maxLength={220} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={post?.slug} /></label>
        <label className="text-sm md:col-span-2">Resumo<textarea className={field} name="excerpt" rows={3} maxLength={500} defaultValue={post?.excerpt ?? ""} /></label>
        <label className="text-sm md:col-span-2">Conteúdo HTML<textarea className={`${field} font-mono`} name="contentHtml" rows={16} defaultValue={post?.contentHtml ?? ""} /></label>
        <label className="text-sm md:col-span-2">Conteúdo JSON (opcional)<textarea className={`${field} font-mono`} name="contentJson" rows={5} defaultValue={post?.contentJson ?? ""} /></label>
      </section>
      <section className="surface grid gap-6 rounded-lg border p-5 md:grid-cols-2">
        <fieldset><legend className="text-sm font-medium">Categorias (até 5)</legend><div className="mt-3 grid gap-2">{categories.map(x => <label key={x.id} className="text-sm text-muted-foreground"><input type="checkbox" name="categoryIds" value={x.id} defaultChecked={selected(post?.categoryIds, x.id)} className="mr-2" />{x.name}</label>)}</div></fieldset>
        <fieldset><legend className="text-sm font-medium">Tags (até 10)</legend><div className="mt-3 grid gap-2">{tags.map(x => <label key={x.id} className="text-sm text-muted-foreground"><input type="checkbox" name="tagIds" value={x.id} defaultChecked={selected(post?.tagIds, x.id)} className="mr-2" />{x.name}</label>)}</div></fieldset>
      </section>
      <section className="surface grid gap-5 rounded-lg border p-5 md:grid-cols-2">
        <label className="text-sm md:col-span-2">URL da capa<input className={field} type="url" name="coverImageUrl" defaultValue={post?.coverImageUrl ?? ""} /></label>
        <label className="text-sm">Título SEO<input className={field} name="seoTitle" maxLength={70} defaultValue={post?.seoTitle ?? ""} /></label>
        <label className="text-sm">URL canônica<input className={field} type="url" name="canonicalUrl" defaultValue={post?.canonicalUrl ?? ""} /></label>
        <label className="text-sm md:col-span-2">Descrição SEO<textarea className={field} name="seoDescription" rows={3} maxLength={170} defaultValue={post?.seoDescription ?? ""} /></label>
      </section>
      {state.message && <p role="status" className={state.success ? "text-sm text-emerald-400" : "text-sm text-red-300"}>{state.message}</p>}
      <button disabled={pending} className="rounded-md bg-[#e7c78f] px-5 py-2.5 text-sm font-medium text-[#191713] disabled:opacity-60">{pending ? "Salvando…" : "Salvar post"}</button>
    </form>
  )
}
