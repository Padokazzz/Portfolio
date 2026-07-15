"use client"

import { useActionState, useState } from "react"
import type { TaxonomyFormState } from "@/app/(admin)/%5Fcontrol/painel/taxonomy-actions"
import type { BlogCategory, BlogTag } from "@/types/blog"

type Item = BlogCategory | BlogTag
type Action = (state: TaxonomyFormState, data: FormData) => Promise<TaxonomyFormState>
type Props = { kind: "category" | "tag"; items: Item[]; createAction: Action; updateAction: (id: string) => Action; deleteAction: (id: string) => Action }
const input = "rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm"
const initial: TaxonomyFormState = { success: false, message: "" }

function Feedback({ state }: { state: TaxonomyFormState }) {
  return state.message ? <p role="status" className={`text-xs ${state.success ? "text-emerald-400" : "text-red-300"}`}>{state.message}</p> : null
}
function TaxonomyRow({ kind, item, updateAction, deleteAction }: Omit<Props, "items" | "createAction"> & { item: Item }) {
  const [editing, setEditing] = useState(false)
  const [updateState, updateForm, updating] = useActionState(updateAction(item.id), initial)
  const [deleteState, deleteForm, deleting] = useActionState(deleteAction(item.id), initial)
  const description = "description" in item ? item.description : null
  return <li className="border-t border-white/10 px-5 py-4">
    {editing ? <form action={updateForm} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"><input className={input} name="name" required defaultValue={item.name} maxLength={kind === "category" ? 100 : 80} /><input className={input} name="slug" required defaultValue={item.slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={kind === "category" ? 120 : 100} /><div className="flex gap-2"><button disabled={updating} className="rounded-md bg-[#e7c78f] px-3 py-2 text-xs text-[#191713]">Salvar</button><button type="button" onClick={() => setEditing(false)} className="rounded-md border border-white/10 px-3 py-2 text-xs">Cancelar</button></div>{kind === "category" && <textarea className={`${input} md:col-span-2`} name="description" defaultValue={description ?? ""} maxLength={300} />}{<Feedback state={updateState} />}</form> : <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-medium">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">/{item.slug} · {item.postCount} post(s)</p>{description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}</div><div className="flex gap-2"><button type="button" onClick={() => setEditing(true)} className="rounded-md border border-white/10 px-3 py-2 text-xs">Editar</button><form action={deleteForm}><input type="hidden" name="confirmation" value={item.id} /><button disabled={deleting} onClick={(event) => { if (!window.confirm(`Excluir ${item.name}?`)) event.preventDefault() }} className="rounded-md border border-red-400/20 px-3 py-2 text-xs text-red-300">Excluir</button></form></div></div>}
    <Feedback state={deleteState} />
  </li>
}
export function TaxonomyManager({ kind, items, createAction, updateAction, deleteAction }: Props) {
  const [state, formAction, pending] = useActionState(createAction, initial)
  return <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]"><form action={formAction} className="surface h-fit space-y-4 rounded-lg border p-5"><h2 className="font-semibold">{kind === "category" ? "Nova categoria" : "Nova tag"}</h2><input className={`${input} w-full`} name="name" required placeholder="Nome" maxLength={kind === "category" ? 100 : 80} /><input className={`${input} w-full`} name="slug" required placeholder="slug-do-item" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={kind === "category" ? 120 : 100} />{kind === "category" && <textarea className={`${input} w-full`} name="description" placeholder="Descrição opcional" maxLength={300} rows={3} />}<Feedback state={state} /><button disabled={pending} className="rounded-md bg-[#e7c78f] px-4 py-2 text-sm font-medium text-[#191713]">Criar</button></form><section className="surface overflow-hidden rounded-lg border"><h2 className="px-5 py-4 font-semibold">Itens cadastrados</h2>{items.length ? <ul>{items.map(item => <TaxonomyRow key={item.id} kind={kind} item={item} updateAction={updateAction} deleteAction={deleteAction} />)}</ul> : <p className="border-t border-white/10 p-8 text-sm text-muted-foreground">Nenhum item cadastrado.</p>}</section></div>
}
