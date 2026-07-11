const CONTACT_FIELDS = ["name", "email", "company", "subject", "message"] as const

const API_FIELD_ERRORS: Record<ContactField, string> = {
  name: "Verifique o nome informado.",
  email: "Verifique o e-mail informado.",
  company: "Verifique a empresa informada.",
  subject: "Verifique o assunto informado.",
  message: "Verifique a mensagem informada.",
}

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
  if (!apiUrl) throw new ContactApiError("O serviço de contato não está configurado.")

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
  for (const field of Object.keys(body.errors ?? {})) {
    const normalized = normalizeFieldName(field)
    if (normalized) fieldErrors[normalized] = API_FIELD_ERRORS[normalized]
  }

  throw new ContactApiError(
    body.errors
      ? "Verifique os campos informados."
      : "Não foi possível enviar sua mensagem. Tente novamente.",
    fieldErrors,
  )
}
