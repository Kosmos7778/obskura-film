import { defineConfig, devices } from "@playwright/test";

/**
 * Конфигурация тестов сайта «ОБСКУРА».
 * Если dev-сервер на :3000 не запущен — Playwright поднимет его сам
 * (команду можно поменять на `npm run dev`, если у вас нет bun).
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 7_000 },
  // Последовательно: тесты гоняют плавный скролл, параллель мешает таймингам
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1280, height: 720 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
