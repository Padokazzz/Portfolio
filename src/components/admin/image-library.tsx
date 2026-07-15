"use client"

import { useActionState, useState } from "react"
import type { ImageFormState } from "@/app/(admin)/%5Fcontrol/painel/imagens/actions"
import type { BlogImage } from "@/types/blog"

type Action = (state: ImageFormState, data: FormData) => Promise<ImageFormState>
type ItemAction = (id: string, state: ImageFormState, data: FormData) => Promise<ImageFormState>
const initial: ImageFormState = { success: false, message: "" }
const field = "rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm"
function Feedback({ state }: { state: ImageFormState }) { return state.message ? <p role="status" className={`text-xs ${state.success ? "text-emerald-400" : "text-red-300"}`}>{state.message}</p> : null }
function ImageCard({ image, updateAction, deleteAction }: { image: BlogImage; updateAction: ItemAction; deleteAction: ItemAction }) {
  const [copied, setCopied] = useState(false)
  const [updateState, updateForm, updating] = useActionState(updateAction.bind(null, image.id), initial)
  const [deleteState, deleteForm, deleting] = useActionState(deleteAction.bind(null, image.id), initial)
  return <li className="surface overflow-hidden rounded-lg border"><div className="aspect-video bg-black/30">
    {/* eslint-disable-next-line @next/next/no-img-element -- origem dinâmica da biblioteca privada */}
    <img src={image.publicUrl} alt={image.altText ?? ""} className="size-full object-cover" />
  </div><div className="space-y-4 p-4"><div><p className="truncate text-xs text-muted-foreground" title={image.publicUrl}>{image.publicUrl}</p><p className="mt-1 text-xs text-muted-foreground">{image.width}×{image.height} · {(image.sizeBytes / 1024).toFixed(0)} KB · {image.mimeType}</p></div><form action={updateForm} className="space-y-2"><input className={`${field} w-full`} name="altText" defaultValue={image.altText ?? ""} placeholder="Texto alternativo" /><Feedback state={updateState} /><button disabled={updating} className="rounded-md border border-white/10 px-3 py-2 text-xs">Salvar texto alternativo</button></form><div className="flex flex-wrap gap-2"><button type="button" onClick={async () => { await navigator.clipboard.writeText(image.publicUrl); setCopied(true) }} className="rounded-md border border-white/10 px-3 py-2 text-xs">{copied ? "Copiada" : "Copiar URL"}</button><form action={deleteForm}><input type="hidden" name="confirmation" value={image.id} /><button disabled={deleting} onClick={(event) => { if (!window.confirm("Excluir esta imagem permanentemente?")) event.preventDefault() }} className="rounded-md border border-red-400/20 px-3 py-2 text-xs text-red-300">Excluir</button></form></div><Feedback state={deleteState} /></div></li>
}
export function ImageLibrary({ images, uploadAction, updateAction, deleteAction }: { images: BlogImage[]; uploadAction: Action; updateAction: ItemAction; deleteAction: ItemAction }) {
  const [state, formAction, pending] = useActionState(uploadAction, initial)
  return <><form action={formAction} className="surface mt-8 grid gap-4 rounded-lg border p-5 md:grid-cols-[1fr_1fr_auto] md:items-end"><label className="text-sm">Arquivo<input className={`${field} mt-2 w-full`} type="file" name="file" accept="image/jpeg,image/png,image/webp" required /></label><label className="text-sm">Texto alternativo<input className={`${field} mt-2 w-full`} name="altText" placeholder="Descreva a imagem" /></label><button disabled={pending} className="rounded-md bg-[#e7c78f] px-4 py-2 text-sm font-medium text-[#191713]">{pending ? "Enviando…" : "Enviar imagem"}</button><Feedback state={state} /></form>{images.length ? <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{images.map(image => <ImageCard key={image.id} image={image} updateAction={updateAction} deleteAction={deleteAction} />)}</ul> : <p className="surface mt-8 rounded-lg border p-8 text-sm text-muted-foreground">Nenhuma imagem enviada.</p>}</>
}
