"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HERO_FRAMES } from "@/lib/content";
import { stopScroll, resumeScroll } from "./SmoothScroll";
import { EASE } from "./Reveal";

type Phase =
  | { kind: "title"; duration: number }
  | { kind: "frame"; index: number; duration: number }
  | { kind: "end"; duration: number };

const PHASES: Phase[] = [
  { kind: "title", duration: 2400 },
  ...HERO_FRAMES.map((_, i) => ({ kind: "frame" as const, index: i, duration: 3200 })),
  { kind: "end", duration: 3000 },
];

const pad = (n: number) => String(n).padStart(2, "0");

interface ShowreelModalProps {
  onClose: () => void;
}

/** Трейлер-шоурил: титры-карточки + кадры фильмов, циклично. Монтируется только в открытом состоянии */
export function ShowreelModal({ onClose }: ShowreelModalProps) {
  const [phase, setPhase] = useState(0);

  // Блокируем скролл страницы, пока трейлер смонтирован
  useEffect(() => {
    stopScroll();
    return () => resumeScroll();
  }, []);

  // Таймер фаз + Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, PHASES[phase].duration);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, onClose]);

  const current = PHASES[phase];

  return (
    <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Трейлер кинокомпании"
          className="fixed inset-0 z-[70] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* —— Сцена 16:9 по центру —— */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative aspect-video w-full max-h-full overflow-hidden">
              <AnimatePresence mode="sync">
                {current.kind === "title" && (
                  <motion.div
                    key="title"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <motion.p
                      className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                    >
                      Кинокомпания
                    </motion.p>
                    <motion.h2
                      className="font-display text-5xl font-light tracking-[0.18em] text-foreground md:text-7xl"
                      initial={{ opacity: 0, letterSpacing: "0.5em" }}
                      animate={{ opacity: 1, letterSpacing: "0.18em" }}
                      transition={{ delay: 0.5, duration: 1.6, ease: EASE }}
                    >
                      ОБСКУРА
                    </motion.h2>
                    <motion.p
                      className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 1 }}
                    >
                      представляет
                    </motion.p>
                  </motion.div>
                )}

                {current.kind === "frame" && (
                  <motion.div
                    key={`frame-${current.index}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1.02 }}
                      transition={{ duration: PHASES[phase].duration / 1000 + 1.5, ease: "linear" }}
                    >
                      <Image
                        src={HERO_FRAMES[current.index].src}
                        alt={`Кадр: ${HERO_FRAMES[current.index].caption}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-14">
                      <motion.p
                        className="font-display text-3xl font-light text-white md:text-5xl"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
                      >
                        {HERO_FRAMES[current.index].caption}
                      </motion.p>
                    </div>
                  </motion.div>
                )}

                {current.kind === "end" && (
                  <motion.div
                    key="end"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <motion.h2
                      className="font-display text-4xl font-light tracking-[0.2em] text-foreground md:text-6xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
                    >
                      Независимое кино
                    </motion.h2>
                    <motion.p
                      className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 1 }}
                    >
                      Обскура · с 2014 года · obskura.film
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* —— Прогресс фаз + счётчик —— */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-black/70 backdrop-blur-[2px]">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 tabular-nums">
                {pad(phase + 1)} / {pad(PHASES.length)}
              </span>
              <div className="flex flex-1 items-center gap-1 px-6" aria-hidden>
                {PHASES.map((_, i) => (
                  <span key={i} className="relative h-px flex-1 overflow-hidden bg-white/15">
                    {i < phase && <span className="absolute inset-0 bg-white/60" />}
                    {i === phase && (
                      <motion.span
                        key={`p-${phase}`}
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: PHASES[phase].duration / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white transition-colors hover:text-accent"
                aria-label="Закрыть трейлер"
              >
                <X className="h-4 w-4" aria-hidden />
                Закрыть
              </button>
            </div>
          </div>
        </motion.div>
  );
}
