"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/site/SmoothScroll";
import { SideMenu } from "@/components/site/SideMenu";
import { Hero } from "@/components/site/Hero";
import { ShowreelModal } from "@/components/site/ShowreelModal";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Filmography } from "@/components/site/Filmography";
import { Projects } from "@/components/site/Projects";
import { Press } from "@/components/site/Press";
import { AiProduction } from "@/components/site/AiProduction";
import { Contacts } from "@/components/site/Contacts";
import { EASE } from "@/components/site/Reveal";
import { NAV_ITEMS, type SectionId } from "@/lib/content";

/** Интро-заставка: слово «Обскура», как начало фильма */
function Intro() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
    >
      <motion.h1
        className="font-display text-4xl font-light tracking-[0.35em] text-foreground md:text-6xl"
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        ОБСКУРА
      </motion.h1>
      <motion.span
        className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        кинокомпания
      </motion.span>
      <motion.span
        className="mt-4 block h-px w-24 origin-center bg-accent/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.4, ease: EASE }}
        aria-hidden
      />
    </motion.div>
  );
}

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState<SectionId | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);

  // Скрываем интро
  useEffect(() => {
    const t = window.setTimeout(() => setIntro(false), 2400);
    return () => window.clearTimeout(t);
  }, []);

  // Scroll-spy: подсветка активного раздела в боковом меню
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence>{intro && <Intro key="intro" />}</AnimatePresence>

      <SideMenu active={active} />

      <main className="relative lg:pl-24 xl:pl-28">
        <Hero onOpenShowreel={() => setShowreelOpen(true)} />
        <Marquee />
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <About />
          <Filmography />
          <Projects />
          <Press />
        </div>
        <AiProduction />
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <Contacts />
        </div>
      </main>

      {/* Плёночное зерно поверх всего */}
      <div className="film-grain" aria-hidden />

      <AnimatePresence>
        {showreelOpen && <ShowreelModal key="showreel" onClose={() => setShowreelOpen(false)} />}
      </AnimatePresence>
    </SmoothScroll>
  );
}
