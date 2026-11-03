"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { HERO_FRAMES } from "@/lib/content";
import { EASE } from "./Reveal";

const FRAME_DURATION = 6500; // мс на кадр
const pad = (n: number) => String(n).padStart(2, "0");

/** Живой таймкод как на плёнке: HH:MM:SS:FF (24 кадра/с) */
function Timecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const frames = Math.floor(((performance.now() - t0) / 1000) * 24);
      const ff = frames % 24;
      const s = Math.floor(frames / 24);
      setTc(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(ff)}`);
    }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[10px] tracking-[0.25em] text-white/85 tabular-nums">
      TC {tc}
    </span>
  );
}

interface HeroProps {
  onOpenShowreel: () => void;
}

export function Hero({ onOpenShowreel }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Смена кадров — «шоурил» на первом экране
  useEffect(() => {
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % HERO_FRAMES.length),
      FRAME_DURATION
    );
    return () => window.clearTimeout(t);
  }, [index]);

  // Параллакс-выход при скролле
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const barOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const frame = HERO_FRAMES[index];

  return (
    <section
      ref={ref}
      aria-label="Первый экран: кадры из фильмов кинокомпании"
      className="relative h-[100svh] overflow-hidden bg-black"
    >
      {/* —— Кадры с медленным наездом камеры (Ken Burns) —— */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? { scale: 1.06 } : { scale: 1.07, x: index % 2 === 0 ? 14 : -14 }}
            animate={reduce ? { scale: 1.06 } : { scale: 1.17, x: index % 2 === 0 ? -14 : 14 }}
            transition={{ duration: FRAME_DURATION / 1000 + 2, ease: "linear" }}
          >
            <Image
              src={frame.src}
              alt={`Кадр: ${frame.caption}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        {/* Градиенты для читаемости служебных подписей */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/70 to-transparent" />
      </motion.div>

      {/* —— Рамка видоискателя —— */}
      <div aria-hidden className="pointer-events-none absolute inset-10 hidden md:block">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
          (pos) => (
            <span key={pos} className={`absolute h-6 w-6 border-white/25 ${pos}`} />
          )
        )}
        <span className="pulse-soft absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
      </div>

      {/* —— Верхний letterbox (десктоп: на мобильных его заменяет фиксированный хедер) —— */}
      <motion.div
        style={{ opacity: barOpacity }}
        className="absolute inset-x-0 top-0 z-10 hidden items-center justify-between bg-black/80 px-10 py-4 backdrop-blur-[2px] md:flex"
      >
        <div className="flex items-center gap-4">
          <span className="pulse-soft block h-1.5 w-1.5 rounded-full bg-red-500/80" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/85">
            Обскура · шоурил
          </span>
        </div>
        <Timecode />
      </motion.div>

      {/* —— Нижний letterbox: подпись кадра, прогресс, кнопка трейлера —— */}
      <motion.div
        style={{ opacity: barOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 bg-black/80 backdrop-blur-[2px]"
      >
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/85"
            >
              <span className="mr-3 text-accent">{pad(index + 1)} / {pad(HERO_FRAMES.length)}</span>
              {frame.caption}
            </motion.p>
          </AnimatePresence>

          {/* Сегментный прогресс текущего кадра */}
          <div className="hidden items-center gap-1.5 md:flex" aria-hidden>
            {HERO_FRAMES.map((_, i) => (
              <span key={i} className="relative h-px w-10 overflow-hidden bg-white/20">
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: FRAME_DURATION / 1000, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-white/50" />}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenShowreel}
            className="group flex items-center gap-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white transition-colors hover:text-accent"
            aria-label="Смотреть трейлер-шоурил кинокомпании"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 group-hover:border-accent">
              <Play className="h-3 w-3 translate-x-[1px]" aria-hidden />
            </span>
            <span className="hidden sm:inline">Трейлер</span>
          </button>
        </div>
      </motion.div>

      {/* —— Индикатор скролла —— */}
      <motion.div
        style={{ opacity: barOpacity }}
        className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/60">
          Листайте
        </span>
        <motion.span
          className="block h-10 w-px origin-top bg-gradient-to-b from-white/70 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
