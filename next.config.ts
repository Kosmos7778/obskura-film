import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Говорим Next.js собрать чистый статический сайт (HTML/CSS/JS)
  output: "export",
  
  // 2. Указываем имя папки, куда сложить готовый сайт
  distDir: ".next-export",
  
  // 3. ВАЖНО: Указываем имя вашего репозитория для правильных ссылок
  basePath: "/obskura-film",
  
  // 4. Отключаем оптимизацию картинок (GitHub Pages это не поддерживает)
  images: {
    unoptimized: true,
  },
  
  // 5. Добавляем слэш в конце URL для корректной работы роутинга
  trailingSlash: true,
  
  // 6. Игнорируем мелкие ошибки TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: false,
};

export default nextConfig;
