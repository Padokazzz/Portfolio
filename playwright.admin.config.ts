import { defineConfig, devices } from "@playwright/test"

/**
 * Config separada para os testes do painel admin.
 *
 * Eles rodam contra a API falsa de `tests/admin/mock-api.mjs` e um dev server
 * próprio (porta 3010), para nunca tocar na API de produção nem na suite
 * pública. Uso: `npm run test:admin`.
 */
const ADMIN_PORT = 3010
const MOCK_API_PORT = 4010

export default defineConfig({
  testDir: "./tests/admin",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${ADMIN_PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node tests/admin/mock-api.mjs",
      url: `http://127.0.0.1:${MOCK_API_PORT}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      env: { MOCK_API_PORT: String(MOCK_API_PORT) },
    },
    {
      command: `npx next dev -p ${ADMIN_PORT}`,
      url: `http://127.0.0.1:${ADMIN_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        API_BASE_URL: `http://127.0.0.1:${MOCK_API_PORT}`,
        NEXT_PUBLIC_API_URL: `http://127.0.0.1:${MOCK_API_PORT}`,
      },
    },
  ],
})
