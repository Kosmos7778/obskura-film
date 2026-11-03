/**
 * Префикс для статических файлов с учётом basePath.
 *
 * GitHub Pages отдаёт сайт из подпапки (/имя-репозитория), поэтому
 * ссылки вида "/v2/hero-1.jpg" нужно переписывать в
 * "/имя-репозитория/v2/hero-1.jpg". NEXT_PUBLIC_BASE_PATH подставляется
 * при сборке (next.config.ts → build:static / GitHub Actions).
 */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
