"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ABOUT_STATEMENT,
  ABOUT_PARAGRAPHS,
  STATS,
  PRODUCERS,
} from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, EASE } from "./Reveal";

/** Счётчик с плавным набором значения при появлении */
function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" aria-label="О компании" className="relative py-28 md:py-40">
      <SectionHeading
        num="01"
        kicker="О компании"
        title="Кинокомпания «Обскура»"
        note="Независимое продюсирование авторского кино с 2014 года"
      />

      {/* —— Заявление —— */}
      <Reveal>
        <p className="max-w-4xl font-display text-3xl font-light leading-[1.25] text-foreground md:text-5xl">
          {ABOUT_STATEMENT.before}{" "}
          <em className="text-accent">{ABOUT_STATEMENT.italic}</em>{" "}
          {ABOUT_STATEMENT.after}
        </p>
      </Reveal>

      {/* —— Текст + статистика —— */}
      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          {ABOUT_PARAGRAPHS.map((text, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-6 max-w-xl text-[15px] leading-[1.9] text-foreground/80 md:text-base">
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 border-l border-t border-border">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08} className="border-b border-r border-border">
                <div className="flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                  <span className="font-display text-4xl font-light text-accent md:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* —— Продюсеры —— */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <h3 className="mb-10 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Продюсеры
            <span className="h-px flex-1 bg-border" aria-hidden />
          </h3>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {PRODUCERS.map((producer, i) => (
            <Reveal key={producer.name} delay={i * 0.12} y={48}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-card">
                  <Image
                    src={producer.image}
                    alt={`${producer.name} — ${producer.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <motion.blockquote
                    className="absolute inset-x-0 bottom-0 translate-y-4 p-6 font-display text-lg font-light italic leading-snug text-white/95 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    «{producer.quote}»
                  </motion.blockquote>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                  <h4 className="font-display text-xl font-normal text-foreground">{producer.name}</h4>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    {producer.role}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
