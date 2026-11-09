/**
 * Carregamento do script oficial do Google AdSense.
 *
 * Regras:
 * - nada é carregado sem identificador real da conta (formato ca-pub-*);
 * - o script é inserido no máximo uma vez na página;
 * - a chamada só deve acontecer depois do consentimento de publicidade
 *   (o componente AdSlot é quem consulta o consentimento centralizado).
 */
const ADSENSE_SCRIPT_ID = "google-adsense-script"

const loadedClients = new Set<string>()

export function isAdSenseClientIdValid(
  clientId: string | null | undefined,
): clientId is string {
  return typeof clientId === "string" && /^ca-pub-\d+$/.test(clientId)
}

export function loadAdSenseScript(clientId: string): boolean {
  if (!isAdSenseClientIdValid(clientId)) return false
  if (typeof document === "undefined") return false
  if (loadedClients.has(clientId)) return true

  const existing = document.getElementById(ADSENSE_SCRIPT_ID)
  if (existing) {
    loadedClients.add(clientId)
    return true
  }

  const script = document.createElement("script")
  script.id = ADSENSE_SCRIPT_ID
  script.async = true
  script.crossOrigin = "anonymous"
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
  document.head.appendChild(script)

  loadedClients.add(clientId)
  return true
}
