type JsonLdProps = {
  data: Record<string, unknown>
}

/** Injeta um bloco de dados estruturados (JSON-LD) sem efeito visual. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
