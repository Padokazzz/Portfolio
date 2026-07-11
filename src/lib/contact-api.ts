const CONTACT_FIELDS = ["name", "email", "company", "subject", "message"] as const

export type ContactField = (typeof CONTACT_FIELDS)[number]
export type ContactFormData = Record<ContactField, string>

export class ContactApiError extends Error {
  constructor(
    message: string,
    readonly fieldErrors: Partial<Record<ContactField, string>> = {},
  ) {
    super(message)
    this.name = "ContactApiError"
  }
}

function normalizeFieldName(field: string): ContactField | undefined {
  const normalized = field.split(".").at(-1)?.toLowerCase()
  return CONTACT_FIELDS.find((candidate) => candidate === normalized)
}

export async function sendContactMessage(data: ContactFormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  if (!apiUrl) throw new ContactApiError("The contact service is not configured.")

  const response = await fetch(`${apiUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (response.ok) return

  let body: { detail?: string; title?: string; errors?: Record<string, string[]> } = {}
  try {
    body = await response.json()
  } catch {
    // The fallback below covers non-JSON responses.
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {}
  for (const [field, messages] of Object.entries(body.errors ?? {})) {
    const normalized = normalizeFieldName(field)
    if (normalized && messages[0]) fieldErrors[normalized] = messages[0]
  }

  throw new ContactApiError(
    body.detail ?? body.title ?? "Unable to send your message. Please try again.",
    fieldErrors,
  )
}
