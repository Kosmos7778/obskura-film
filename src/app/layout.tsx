import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sans = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "ОБСКУРА — кинокомпания независимого кино",
  description:
    "Независимая кинокомпания «Обскура». Фильмография, проекты в производстве, пресса и производство AI-контента. Кино, которое остаётся после титров.",
  keywords: [
    "кинокомпания",
    "независимое кино",
    "авторское кино",
    "фильмография",
    "продюсеры",
    "AI-контент",
  ],
  authors: [{ name: "Кинокомпания «Обскура»" }],
  // Фавиконка подключается через src/app/icon.svg — Next.js сам сгенерирует
  // <link rel="icon"> с корректным basePath (важно для GitHub Pages).
  openGraph: {
    title: "ОБСКУРА — кинокомпания независимого кино",
    description:
      "Независимая кинокомпания. Фильмография, проекты, пресса, производство AI-контента.",
    siteName: "ОБСКУРА",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
