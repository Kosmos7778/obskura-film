import type { NextConfig } from "next";

/**
 * Обычная сборка (dev / standalone-сервер) — как в песочнице.
 * Статический экспорт для GitHub Pages включается переменной окружения:
 *   NEXT_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/имя-репозитория next build
 */
const isStaticExport = process.env.NEXT_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        distDir: ".next-export", // не трогаем .next у dev-сервера
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        images: { unoptimized: true }, // GitHub Pages не оптимизирует картинки
        trailingSlash: true,
      }
    : {
        output: "standalone",
      }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
