"use client"

import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { Table } from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"
import { useRef, useState, useTransition } from "react"
import type { ImageFormState } from "@/app/(admin)/%5Fcontrol/painel/imagens/actions"
import type { BlogImage } from "@/types/blog"

type Props = {
  initialHtml?: string | null
  initialJson?: string | null
  images?: BlogImage[]
  uploadImageAction?: (state: ImageFormState, data: FormData) => Promise<ImageFormState>
  onContentChange?: (html: string, json: string) => void
}
const button = "rounded border border-white/10 px-2.5 py-1.5 text-xs hover:bg-white/[0.06] disabled:opacity-40"

export function RichTextEditor({ initialHtml, initialJson, images = [], uploadImageAction, onContentChange }: Props) {
  const [html, setHtml] = useState(initialHtml ?? "")
  const [json, setJson] = useState(initialJson ?? "")
  const [preview, setPreview] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [uploading, startUpload] = useTransition()
  const [imageAlt, setImageAlt] = useState("")
  const [uploadMessage, setUploadMessage] = useState("")
  const imageInput = useRef<HTMLInputElement>(null)
  let initialContent: string | object = initialHtml ?? ""
  if (initialJson) {
    try { initialContent = JSON.parse(initialJson) as object } catch { initialContent = initialHtml ?? "" }
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true }), Image.configure({ allowBase64: false }), Table.configure({ resizable: true }), TableRow, TableHeader, TableCell],
    content: initialContent,
    editorProps: { attributes: { class: "prose prose-invert min-h-80 max-w-none px-4 py-3 text-sm outline-none" } },
    onUpdate: ({ editor: current }) => {
      const nextHtml = current.getHTML()
      const nextJson = JSON.stringify(current.getJSON())
      setHtml(nextHtml)
      setJson(nextJson)
      onContentChange?.(nextHtml, nextJson)
    },
  })

  function setLink() {
    const previous = editor?.getAttributes("link").href as string | undefined
    const href = window.prompt("URL do link", previous ?? "https://")
    if (href === null || !editor) return
    if (!href.trim()) editor.chain().focus().extendMarkRange("link").unsetLink().run()
    else editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run()
  }

  function addImage(src: string, alt?: string | null) {
    editor?.chain().focus().setImage({ src, alt: alt ?? "" }).run()
    setShowImages(false)
  }

  function uploadInlineImage() {
    const file = imageInput.current?.files?.[0]
    if (!file || !uploadImageAction) return
    const data = new FormData()
    data.set("file", file)
    data.set("altText", imageAlt.trim())
    startUpload(async () => {
      const result = await uploadImageAction({ success: false, message: "" }, data)
      setUploadMessage(result.message)
      if (result.success && result.imageUrl) {
        addImage(result.imageUrl, imageAlt)
        setImageAlt("")
        if (imageInput.current) imageInput.current.value = ""
      }
    })
  }

  if (!editor) return <p className="text-sm text-muted-foreground">Carregando editor...</p>
  return <div>
    <input type="hidden" name="contentHtml" value={html} />
    <input type="hidden" name="contentJson" value={json} />
    <div className="editor-toolbar mb-3 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-black/20 p-3" role="toolbar" aria-label="Formatação do artigo">
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleBold().run()}>Negrito</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleItalic().run()}>Itálico</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>Título 2</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>Título 3</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleBulletList().run()}>Lista</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numerada</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Citação</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Código</button>
      <button type="button" className={button} onClick={setLink}>Link</button>
      <button type="button" className={button} onClick={() => setShowImages(value => !value)}>Inserir imagem</button>
      <button type="button" className={button} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Tabela</button>
      <button type="button" className={button} disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>Desfazer</button>
      <button type="button" className={button} disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>Refazer</button>
      <button type="button" className={button} onClick={() => setPreview(value => !value)}>{preview ? "Editar" : "Preview"}</button>
    </div>
    {showImages && <div className="mb-3 rounded-lg border border-white/10 bg-black/20 p-3">
      {uploadImageAction && <div className="mb-4 grid gap-2 rounded-lg border border-sky-400/15 bg-sky-400/[0.04] p-3 sm:grid-cols-[1fr_1fr_auto]">
        <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" className="text-xs text-muted-foreground file:mr-2 file:rounded file:border-0 file:bg-sky-400/10 file:px-2 file:py-1.5 file:text-sky-200" />
        <input value={imageAlt} onChange={event => setImageAlt(event.target.value)} maxLength={300} placeholder="Descrição da imagem" className="rounded border border-white/10 bg-black/20 px-2 py-1.5 text-xs outline-none focus:border-sky-400/40" />
        <button type="button" onClick={uploadInlineImage} disabled={uploading} className="rounded border border-sky-400/20 px-3 py-1.5 text-xs text-sky-200 disabled:opacity-40">{uploading ? "Enviando..." : "Enviar e inserir"}</button>
        {uploadMessage && <p className="text-[11px] text-muted-foreground sm:col-span-3">{uploadMessage}</p>}
      </div>}
      <p className="mb-3 text-xs font-medium">Ou escolha uma imagem da biblioteca</p>
      {images.length ? <div className="grid max-h-64 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4">{images.map(image => <button key={image.id} type="button" onClick={() => addImage(image.publicUrl, image.altText)} className="overflow-hidden rounded-md border border-white/10 text-left hover:border-[#e7c78f]/60">
        {/* eslint-disable-next-line @next/next/no-img-element -- biblioteca administrativa dinâmica */}
        <img src={image.publicUrl} alt={image.altText ?? ""} className="aspect-video w-full object-cover" />
        <span className="block truncate p-2 text-[11px] text-muted-foreground">{image.altText || "Sem descrição"}</span>
      </button>)}</div> : <p className="text-xs text-muted-foreground">Nenhuma imagem disponível. Envie imagens pela seção Imagens do painel.</p>}
    </div>}
    {preview ? <iframe title="Preview do artigo" sandbox="" className="min-h-96 w-full rounded-md border border-white/10 bg-white" srcDoc={`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>body{font:16px/1.7 system-ui;padding:2rem;max-width:760px;margin:auto;color:#191713}img{max-width:100%;height:auto}pre{overflow:auto;background:#111;color:#eee;padding:1rem}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:.5rem}</style></head><body>${html}</body></html>`} /> : <EditorContent editor={editor} className="overflow-hidden rounded-md border border-white/10 bg-black/20" />}
    <p className="mt-2 text-xs text-muted-foreground">O backend sanitiza novamente o conteúdo antes de armazená-lo.</p>
  </div>
}
