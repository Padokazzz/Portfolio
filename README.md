# Portfolio

Portfolio profissional desenvolvido como um produto digital: limpo, performatico, acessivel e orientado a conteudo.

O projeto apresenta experiencias, projetos, escrita tecnica e experimentos com foco em desenvolvimento de software, arquitetura de sistemas e design de interfaces.

## Stack

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React

## Principios

- Interface minimalista e responsiva
- Componentes reutilizaveis
- Acessibilidade desde a base
- SEO e performance como requisitos
- Conteudo estruturado para projetos e artigos
- Arquitetura simples, escalavel e facil de manter

## Estrutura

```txt
src/
  app/
    (site)/
    layout.tsx
    globals.css
  components/
    ui/
    layout/
    sections/
    project/
    blog/
    timeline/
    mdx/
  constants/
  content/
  hooks/
  lib/
  services/
  styles/
  types/
  utils/
  assets/
```

## Desenvolvimento

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente local:

```bash
npm run dev
```

A aplicacao ficara disponivel em:

```txt
http://127.0.0.1:3000
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Qualidade

Antes de publicar alteracoes, valide:

```bash
npm run lint
npm run build
npm run test:e2e
```

## Monetizacao

O site tem uma base opcional de monetizacao (publicidade, afiliados e
conversao comercial) que so se ativa mediante configuracao real e
consentimento do visitante. Detalhes em `docs/monetizacao-blog.md`.

### Variaveis de ambiente (`.env.local`)

Nomes completos e exemplos de formato em `.env.example`. Nenhuma tag de
terceiros e carregada enquanto as variaveis estiverem vazias:

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — ID real da conta AdSense (`ca-pub-...`),
  somente apos a aprovacao do site. O script so e carregado com consentimento
  da categoria "Publicidade".
- `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` — ID do bloco de anuncio dos artigos,
  criado no painel do AdSense.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Measurement ID do GA4 (`G-...`). A tag so
  e carregada com consentimento da categoria "Analise".

### Consentimento

- Banner na primeira visita com opcoes igualmente acessiveis de aceitar,
  rejeitar e personalizar; preferencias reabertas pelo rodapé.
- Registro em `localStorage` (categorias + versao da politica + data), em
  `src/lib/consent/`. Versao antiga ou dado invalido = ausencia de consentimento.
- `src/lib/consent/consent-types.ts` tem `CONSENT_POLICY_VERSION`, que deve
  ser atualizada sempre que a politica de cookies mudar.

### Passos pendentes do proprietario

- Conta AdSense: cadastrar o dominio, verificar, publicar `public/ads.txt`
  com a linha oficial da conta e solicitar revisao. Nao ha garantia de
  aprovacao; anuncios so podem ser exibidos depois da aprovacao.
- GA4: criar propriedade/fluxo e informar o Measurement ID.
- Afiliados: ao aderir a programas, preencher `AFFILIATE_HOSTS` em
  `src/lib/monetization/affiliate.ts` e atualizar a pagina de aviso.
- Search Console: criar propriedade para o dominio definitivo.
