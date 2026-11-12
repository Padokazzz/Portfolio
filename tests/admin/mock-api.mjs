/**
 * API falsa para os testes do painel.
 *
 * Só existe para o Playwright poder exercitar o fluxo real de criação de
 * post sem tocar na API de produção e sem credenciais verdadeiras. Os
 * endpoints são os mesmos que `src/lib/api/admin-blog.server.ts` consome.
 *
 *   node tests/admin/mock-api.mjs
 */
import { createServer } from "node:http"

const PORT = Number(process.env.MOCK_API_PORT ?? 4010)

const categories = [
  { id: "cat-1", name: "Programação", slug: "programacao", postCount: 0, description: null },
]

let sequence = 0
const posts = []

function json(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  })
  res.end(payload)
}

function readJson(req) {
  return new Promise((resolve) => {
    let raw = ""
    req.on("data", (chunk) => { raw += chunk })
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}) } catch { resolve({}) }
    })
  })
}

function hasBearer(req) {
  return String(req.headers.authorization ?? "").startsWith("Bearer ")
}

function toAdminPost(input, status) {
  const now = new Date().toISOString()
  sequence += 1
  return {
    id: `post-${sequence}`,
    authorId: "author-1",
    title: input.title ?? "",
    slug: input.slug ?? "",
    excerpt: input.excerpt ?? null,
    contentJson: input.contentJson ?? null,
    contentHtml: input.contentHtml ?? null,
    status,
    isFeatured: Boolean(input.isFeatured),
    coverImageUrl: input.coverImageUrl ?? null,
    seoTitle: input.seoTitle ?? null,
    seoDescription: input.seoDescription ?? null,
    canonicalUrl: input.canonicalUrl ?? null,
    publishedAtUtc: status === 2 ? now : null,
    createdAtUtc: now,
    updatedAtUtc: now,
    version: String(sequence),
    categoryIds: input.categoryIds ?? [],
    tagIds: input.tagIds ?? [],
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`)
  const { pathname } = url
  const method = req.method ?? "GET"

  if (pathname === "/health") return json(res, 200, { ok: true })

  if (pathname === "/api/v1/auth/login" && method === "POST") {
    const body = await readJson(req)
    return json(res, 200, {
      accessToken: "access-de-teste",
      tokenType: "Bearer",
      expiresAtUtc: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      refreshToken: "refresh-de-teste",
      refreshTokenExpiresAtUtc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: { id: "author-1", email: String(body.email ?? "admin@teste.dev"), displayName: "Admin de teste", role: "Admin" },
    })
  }

  if (!hasBearer(req)) return json(res, 401, { title: "Não autenticado." })

  if (pathname === "/api/v1/auth/me" && method === "GET") {
    return json(res, 200, { id: "author-1", email: "admin@teste.dev", displayName: "Admin de teste", role: "Admin" })
  }

  if (pathname === "/api/v1/admin/posts" && method === "GET") {
    return json(res, 200, posts)
  }

  if (pathname === "/api/v1/admin/posts" && method === "POST") {
    const post = toAdminPost(await readJson(req), 1)
    posts.unshift(post)
    return json(res, 201, post)
  }

  if (pathname === "/api/v1/admin/posts/publish" && method === "POST") {
    const post = toAdminPost(await readJson(req), 2)
    posts.unshift(post)
    return json(res, 201, post)
  }

  if (pathname === "/api/v1/admin/categories" && method === "GET") return json(res, 200, categories)
  if (pathname === "/api/v1/admin/tags" && method === "GET") return json(res, 200, [])
  if (pathname === "/api/v1/admin/images" && method === "GET") return json(res, 200, [])

  return json(res, 404, { title: `Endpoint não mockado: ${method} ${pathname}` })
})

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[mock-api] escutando em http://127.0.0.1:${PORT}`)
})
