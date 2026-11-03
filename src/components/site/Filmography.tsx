"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FILMS, type Film } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

interface FilmCardProps {
  film: Film;
  index: number;
}

/** Карточка фильма: параллакс кадра + плавный зум при наведении */
function FilmCard({ film, index }: FilmCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <Reveal delay={(index % 2) * 0.12} y={56} className={film.span}>
      <article ref={ref} className="group">
        <div className="relative aspect-[16/9] overflow-hidden bg-card">
          {/* Параллакс-слой с запасом по вертикали */}
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
            <div className="relative h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
              <Image
                src={film.image}
                alt={`Кадр из фильма «${film.title}» (${film.year})`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Затемнение и служебные метки */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
          <div className="absolute left-5 top-5 flex items-center gap-3">
            <span className="bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-[2px]">
              {film.genre}
            </span>
            <span className="bg-black/50 px-2.5 py-1 font-mono text-[9px] tracking-[0.25em] text-white/90 backdrop-blur-[2px]">
              {film.duration}
            </span>
          </div>
          <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.3em] text-white/70">
            {film.year}
          </span>

          {/* Название */}
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
            <h3 className="font-display text-3xl font-light text-white md:text-4xl">
              «{film.title}»
            </h3>
            <motion.span
              aria-hidden
              className="hidden h-px flex-1 bg-white/25 md:block"
              initial={false}
              whileHover={{}}
            />
          </div>
        </div>

        {/* Синопсис и лавры */}
        <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {film.synopsis}
          </p>
          <ul className="flex shrink-0 flex-col gap-1.5 md:items-end">
            {film.laurels.map((laurel) => (
              <li
                key={laurel}
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/90"
              >
                ✦ {laurel}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Filmography() {
  return (
    <section id="filmography" aria-label="Фильмография" className="relative py-28 md:py-40">
      <SectionHeading
        num="02"
        kicker="Фильмография"
        title="Вышедшие фильмы"
        note="Девять картин за двенадцать лет — от чёрно-белого дебюта до гран-при"
      />

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
        {FILMS.map((film, i) => (
          <FilmCard key={film.title} film={film} index={i} />
        ))}
      </div>
    </section>
  );
}
