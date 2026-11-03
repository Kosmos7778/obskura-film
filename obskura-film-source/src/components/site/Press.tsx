"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Mail } from "lucide-react";
import {
  PRESS_QUOTES,
  PRESS_KITS,
  MEDIA_NAMES,
  PRESS_EMAIL,
} from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, EASE } from "./Reveal";

const ROTATE_MS = 6500;

export function Press() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % PRESS_QUOTES.length), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  const quote = PRESS_QUOTES[index];

  return (
    <section id="press" aria-label="Пресса" className="relative py-28 md:py-40">
      <SectionHeading
        num="04"
        kicker="Пресса"
        title="СМИ и критики"
        note="Рецензии, материалы для СМИ и аккредитация"
      />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* —— Ротация цитат —— */}
        <div
          className="lg:col-span-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <div className="relative flex min-h-[280px] flex-col justify-between border-l-2 border-accent/60 pl-8 md:min-h-[320px] md:pl-12">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="max-w-2xl"
                >
                  <p className="font-display text-2xl font-light italic leading-[1.35] text-foreground md:text-4xl">
                    {quote.text}
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                      {quote.source}
                    </span>
                    <span className="h-px w-10 bg-border" aria-hidden />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {quote.film}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              {/* Управление */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIndex((index - 1 + PRESS_QUOTES.length) % PRESS_QUOTES.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                    aria-label="Предыдущая цитата"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    onClick={() => setIndex((index + 1) % PRESS_QUOTES.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                    aria-label="Следующая цитата"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(PRESS_QUOTES.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>

          {/* СМИ */}
          <Reveal delay={0.15}>
            <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8">
              {MEDIA_NAMES.map((name) => (
                <span
                  key={name}
                  className="font-display text-lg font-light text-foreground/45 transition-colors duration-500 hover:text-foreground md:text-xl"
                >
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* —— Пресс-киты —— */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <h3 className="mb-8 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Пресс-киты
              <span className="h-px flex-1 bg-border" aria-hidden />
            </h3>
            <ul className="flex flex-col">
              {PRESS_KITS.map((kit) => (
                <li key={kit.title} className="border-t border-border last:border-b">
                  <a
                    href={`mailto:${PRESS_EMAIL}?subject=${encodeURIComponent(`Запрос: ${kit.title}`)}`}
                    className="group flex items-center gap-5 py-6 transition-colors duration-300"
                    aria-label={`Запросить: ${kit.title}`}
                  >
                    <Download
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                    <span className="flex flex-col gap-1.5">
                      <span className="text-[15px] text-foreground transition-colors duration-300 group-hover:text-accent">
                        {kit.title}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {kit.meta}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 bg-card p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Аккредитация и запросы
              </p>
              <a
                href={`mailto:${PRESS_EMAIL}`}
                className="mt-4 flex items-center gap-3 font-display text-xl font-light text-foreground transition-colors duration-300 hover:text-accent md:text-2xl"
              >
                <Mail className="h-5 w-5 text-accent" aria-hidden />
                {PRESS_EMAIL}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Отвечаем в течение одного рабочего дня. Кадры и постеры доступны в печатном
                качестве по запросу.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
