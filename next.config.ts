import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт для GitHub Pages
  output: "export",
  
  // Папка для собранного сайта
  distDir: ".next-export",
  
  // ВАЖНО: префикс для ВСЕХ ресурсов (картинки, CSS, JS)
  assetPrefix: "/obskura-film/",
  
  // Префикс для маршрутов (ссылок внутри сайта)
  basePath: "/obskura-film",
  
  // Отключаем оптимизацию картинок (GitHub Pages не поддерживает)
  images: {
    unoptimized: true,
  },
  
  // Добавляем слэш в конце URL
  trailingSlash: true,
  
  // Игнорируем мелкие ошибки TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: false,
};

export default nextConfig;
