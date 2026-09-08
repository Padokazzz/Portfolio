import "server-only"

export function getApiBaseUrl() {
  const value = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL
  if (!value) throw new Error("A API não está configurada.")
  return value.replace(/\/$/, "")
}
