# Indexação no Search Console — diagnóstico e correções

**Domínio:** leonardopadilha.com  
**Relatório:** *Indexação das páginas* (última atualização 08/11/2026, detecção em 10/11/2026)  
**Branch:** `fix/seo-indexacao-gsc`

---

## 1. O que o relatório mostrava

| Status | Páginas | URLs de exemplo |
| --- | --- | --- |
| **Página com redirecionamento** | 2 | `http://leonardopadilha.com/`, `https://www.leonardopadilha.com/` |
| **Rastreada, mas não indexada** | 8 | `/`, `/contato`, `/blog`, `/projetos`, `/uses`, `/politica-de-privacidade` e 2 artigos |

---

## 2. Diagnóstico

### 2.1 A produção está rodando um build antigo (causa raiz)

Comparação feita em 12/11/2026 entre `main` (build local de produção) e o que está no ar:

| Verificação | `main` (local `next build`) | Produção |
| --- | --- | --- |
| `/blog/este-post-nao-existe-abc123` | **404** | **200** (soft-404) |
| `<link rel="canonical">` em `/demo/fintrack` | ausente | `https://leonardopadilha.com` (herdado da home) |

Evidências complementares:

- `https://leonardopadilha.com/demo/fintrack` responde com `age: 242585` (~2,8 dias) e `x-nextjs-prerender: 1` — HTML estático gerado no build de **09/11**, anterior ao merge do PR #23 (`957d945`, 10/11).
- `/blog/<slug-inexistente>` responde `x-vercel-cache: MISS` e `cache-control: private, no-cache, no-store`: o **servidor**, e não o cache, devolveu 200. O código atual devolve 404.
- O redirect de `padilhadev.vercel.app` está no ar, mas ele é feito pelo próprio Vercel (headers sem assinatura do Next e HSTS diferente), então **não** serve de prova de que o PR #23 foi publicado.
- O PR #22 (monetização, 09/11) **está** publicado: os marcadores de anúncio/afiliado aparecem nos artigos.

**Conclusão:** o merge mais recente de `main` nunca chegou à produção. O build falhou ou não foi disparado no Vercel — é preciso verificar a aba *Deployments* do projeto.

Isso explica boa parte do relatório:

- **Soft-404:** enquanto `blog/loading.tsx` existia, qualquer URL de artigo inexistente respondia `200` com o shell de carregamento. O Google trata 200 com conteúdo vazio como "página de erro disfarçada" e passa a desconfiar do conteúdo do blog — inclusive dos artigos reais.
- **Canonical herdado:** o layout raiz declarava `alternates.canonical: "/"`. Toda página sem `createPageMetadata` (as demos, o 404 e o admin) apontava para a home, mandando ao crawler URLs distintas dizendo "o valor está na home".

### 2.2 O que já era esperado (não é bug)

`http://` e `https://www.` **precisam** redirecionar para `https://` + domínio sem `www`. Hoje os dois respondem `308` permanente para a URL canônica — comportamento correto. O Search Console continua listando essas URLs como "Página com redirecionamento" enquanto ainda as rastrear; isso é informativo, não é erro. O que se garante por código (e agora por teste) é que:

- nenhum redirect deixou de ser permanente;
- o sitemap só anuncia `https://leonardopadilha.com/...`;
- o domínio antigo redireciona preservando caminho e query.

### 2.3 Sinais on-page corrigidos neste branch

| Problema | Onde | Correção |
| --- | --- | --- |
| `/contato` sem `<h1>` (o título principal era um `<h2>`) | `src/components/sections/contact-cta.tsx` | `<h1>` quando `variant="page"`; a home mantém `<h2>` (o `<h1>` é do hero) |
| Demos repetiam `<title>` e `description` da home | `src/app/(demo)/layout.tsx` + páginas em `(demo)/demo/*` | título e descrição próprios por demo |
| 404 genérico em inglês, sem caminhos de saída | `src/app/not-found.tsx` (novo) | 404 em português com links para início, projetos, blog e contato |

---

## 3. Rede de segurança: `tests/e2e/seo.spec.ts`

16 testes Playwright que falham **antes do deploy** se qualquer sinal de indexação regredir:

- cada página pública do sitemap responde `200`, com `index, follow`, canonical próprio e **exatamente um `<h1>`**;
- slug de artigo e rota inexistente respondem **404** (anti soft-404) e não emitem canonical;
- demos respondem `noindex` e não repetem o título da home;
- redirects internos (`/blog/`, `/sobre`, `/experimentos`) e o domínio antigo respondem `308` com o destino correto;
- `robots.txt` aponta o sitemap certo e o sitemap só anuncia o domínio canônico;
- os artigos anunciados no sitemap são rastreáveis, com canonical e `<h1>` próprios.

```bash
npx playwright test tests/e2e/seo.spec.ts
```

---

## 4. Plano de ação

1. **Publicar a `main` atual** — abrir o Vercel, aba *Deployments*, entender por que o merge de 10/11 não virou deploy e reimplantar. Enquanto isso não acontecer, nenhuma correção de código está valendo para o Google.
2. **Merge deste branch** e novo deploy.
3. No Search Console, em *Inspeção de URL*, pedir a indexação de `/`, `/blog`, `/projetos`, `/uses` e `/contato` (o botão "Solicitar indexação" só aparece para URLs já inspecionadas).
4. Reenviar o sitemap em *Sitemaps* depois do deploy.
5. Acompanhar o relatório por 1–2 semanas. "Rastreada, mas não indexada" também é decisão de qualidade/autoridade do Google: páginas curtas (`/uses`, `/politica-de-privacidade`) podem continuar fora do índice mesmo com sinal técnico limpo — nesse caso o caminho é conteúdo e links externos, não mais HTML.
6. Configurar CI (GitHub Actions) rodando `npm run lint` e `npx playwright test` em todo PR para que a suite de SEO seja bloqueante.

---

## 5. Fora de escopo proposital

- Bloquear `/demo/*` no `robots.txt`: isso impediria o Google de **ver** o `noindex` das demos, o que poderia levá-las a serem indexadas sem a tag. Manter rastreável + `noindex`.
- Publicar categorias e tags no sitemap: são 18 URLs com quase o mesmo conteúdo (decisão já registrada em `src/app/sitemap.ts`).
- Trocar `308` por `301`: ambos são permanentes; o Vercel usa `308` e o comportamento é equivalente para o crawler.
