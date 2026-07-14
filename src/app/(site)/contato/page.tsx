import { ContactCta } from "@/components/sections/contact-cta"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata(
  "Contato",
  "Entre em contato com Leonardo Padilha para conversar sobre desenvolvimento de software, projetos e oportunidades.",
  "/contato",
)

export default function ContatoPage() {
  return <ContactCta variant="page" />
}
