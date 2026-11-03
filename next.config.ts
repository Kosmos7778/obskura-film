import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт для GitHub Pages
  output: "export",
  distDir: "out", // создаем папку ./out для артефакта
  basePath: "/obskura-film", // важно для GitHub Pages
  images: { unoptimized: true }, // GitHub Pages не оптимизирует картинки
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
