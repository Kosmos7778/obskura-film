"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, SOCIALS, type SectionId } from "@/lib/content";
import { scrollToId } from "./SmoothScroll";
import { EASE } from "./Reveal";

interface SideMenuProps {
  active: SectionId | null;
}

/** Постоянное боковое меню: рейка слева на десктопе, оверлей на мобильных */
export function SideMenu({ active }: SideMenuProps) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    // Даём оверлею начать закрытие, затем скроллим
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* —— Мобильный верхний бар —— */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference lg:hidden">
        <button
          onClick={() => go("about")}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-white"
          aria-label="Наверх, к началу"
        >
          Обскура
        </button>
        <button
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] text-white"
          aria-label="Открыть меню"
        >
          <span className="h-px w-7 bg-white" />
          <span className="h-px w-7 bg-white" />
        </button>
      </header>

      {/* —— Десктопная рейка —— */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-24 flex-col items-center justify-between border-r border-white/5 bg-background/40 py-8 backdrop-blur-sm lg:flex xl:w-28">
        <button
          onClick={() => go("about")}
          className="group flex flex-col items-center gap-3"
          aria-label="ОБСКУРА — к началу"
        >
          <span className="block h-8 w-8 rounded-full border border-foreground/60 transition-colors duration-500 group-hover:border-accent" />
          <span className="block h-2 w-2 rounded-full bg-accent" />
        </button>

        <nav aria-label="Разделы сайта">
          <ul className="flex flex-col items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="group flex flex-col items-center gap-2"
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`h-px w-5 transition-all duration-500 ${
                        isActive ? "bg-accent" : "bg-foreground/25 group-hover:bg-foreground/60"
                      }`}
                    />
                    <span
                      className={`font-mono text-[9px] tracking-[0.25em] transition-colors duration-500 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-colors duration-500 [writing-mode:vertical-rl] ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4">
          <span className="h-16 w-px bg-foreground/10" aria-hidden />
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground">©26</span>
        </div>
      </aside>

      {/* —— Мобильное оверлей-меню —— */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground">
                Обскура
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-foreground"
                aria-label="Закрыть меню"
              >
                <span className="relative block h-7 w-7">
                  <span className="absolute left-0 top-1/2 h-px w-7 rotate-45 bg-foreground" />
                  <span className="absolute left-0 top-1/2 h-px w-7 -rotate-45 bg-foreground" />
                </span>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Разделы сайта">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.6, delay: 0.06 * i + 0.1, ease: EASE }}
                  >
                    <button
                      onClick={() => go(item.id)}
                      className="group flex w-full items-baseline gap-4 py-2 text-left"
                    >
                      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                        {item.num}
                      </span>
                      <span className="font-display text-4xl font-light text-foreground transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        className="ml-auto h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 px-8 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
