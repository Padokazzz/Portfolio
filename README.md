# Portfolio

Meu site pessoal e hub profissional, desenvolvido para reunir projetos, experiências, artigos técnicos e experimentos em um único lugar.

Mais do que uma página de apresentação, o projeto funciona como uma aplicação de conteúdo: possui páginas próprias para diferentes tipos de informação e uma estrutura pensada para facilitar navegação, publicação e evolução.

**Acesse:** [www.leonardopadilha.com](https://www.leonardopadilha.com)

## Objetivos do projeto

- Apresentar projetos e experiências de forma organizada.
- Publicar artigos técnicos e conteúdos autorais.
- Manter uma navegação responsiva e acessível.
- Trabalhar SEO e performance desde a estrutura da aplicação.
- Experimentar soluções de frontend e backend em um projeto utilizado no dia a dia.

## Stack

- Next.js com App Router
- React e TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React
- Playwright para testes end-to-end

## Áreas do site

O portfólio reúne seções para:

- Projetos e experimentos.
- Blog e artigos técnicos.
- Linha do tempo profissional.
- Ferramentas e tecnologias utilizadas.
- Contato.

## Organização do projeto

```text
src/
├── app/
│   ├── (site)/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── project/
│   ├── blog/
│   ├── timeline/
│   └── mdx/
├── constants/
├── content/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
├── utils/
└── assets/
```

A estrutura separa rotas, componentes visuais, conteúdo e utilitários para manter as responsabilidades identificáveis sem adicionar camadas desnecessárias.

## Executar localmente

### Pré-requisitos

- Node.js.
- npm.
- Git.

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Padokazzz/Portfolio.git
cd Portfolio
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run test:e2e
```

## Qualidade

Antes de publicar mudanças, a validação recomendada é:

```bash
npm run lint
npm run build
npm run test:e2e
```

Os testes end-to-end ajudam a verificar os fluxos da aplicação no navegador, complementando as verificações estáticas e a build.

## Privacidade e consentimento

O projeto possui uma estrutura opcional para integrações de análise e publicidade. Essas integrações dependem de configuração e do consentimento correspondente do visitante.

Variáveis documentadas no `.env.example`:

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: identificador da conta AdSense.
- `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE`: identificador do bloco de anúncio.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: identificador de medição do Google Analytics 4.

As integrações não devem ser consideradas ativas apenas por existirem no código. É necessário configurar identificadores válidos e cumprir as etapas de aprovação e consentimento aplicáveis.

### Consentimento

- O visitante pode aceitar, rejeitar ou personalizar as categorias de consentimento.
- As preferências podem ser revistas posteriormente pelo site.
- A versão da política é controlada por `CONSENT_POLICY_VERSION`.
- Dados inválidos ou versões antigas não devem ser tratados como consentimento válido.

Detalhes adicionais estão em `docs/monetizacao-blog.md`.

## Próximos passos operacionais

- Configurar e validar as integrações externas quando aplicável.
- Manter os metadados e o sitemap alinhados ao domínio definitivo.
- Continuar evoluindo testes de navegação e acessibilidade.
- Revisar performance e experiência mobile conforme novas páginas forem adicionadas.

---

Desenvolvido por [Leonardo Padilha](https://www.leonardopadilha.com).
