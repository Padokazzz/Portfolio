"use client"

export function DeletePostButton() {
  return <button type="submit" onClick={(event) => { if (!window.confirm("Excluir este post permanentemente? Esta ação não pode ser desfeita.")) event.preventDefault() }} className="rounded border border-red-400/20 px-3 py-1.5 text-xs text-red-300">Excluir</button>
}
