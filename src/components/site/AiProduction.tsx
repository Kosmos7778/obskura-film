"use client";

import { useRef } from "react";
import { asset } from "@/lib/asset";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import { AI_SERVICES, AI_PROCESS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** Пара параллакс-изображений: генеративные прототипы на реальной площадке */
function AiVisuals() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div ref={ref} className="flex flex-col gap-8">
      <Reveal y={48}>
        <figure>
          <div className="relative aspect-[16/10] overflow-hidden bg-card">
            <motion.div style={{ y: y1 }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
              <div className="relative h-full w-full">
                <Image
                  src={asset("/v2/ai-1.jpg")}
                  alt="Визуализация: кинокадр, разложенный на частицы нейросетью"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Fig. 01 — Генеративный прототип: кадр как поле вероятностей
          </figcaption>
        </figure>
      </Reveal>

      <Reveal y={48} delay={0.12} className="lg:ml-16">
        <figure>
          <div className="relative aspect-[16/10] overflow-hidden bg-card">
            <motion.div style={{ y: y2 }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
              <div className="relative h-full w-full">
                <Image
                  src={asset("/v2/ai-2.jpg")}
                  alt="Съёмочная площадка с цифровой превиз-сеткой поверх декорации"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Fig. 02 — Превиз на площадке: цифровой дублёр декорации
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}

export function AiProduction() {
  return (
    <section
      id="ai"
      aria-label="Производство AI-контента"
      className="relative border-y border-border bg-[#0c0b0a] py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden />

      <SectionHeading
        num="05"
        kicker="Технологии"
        title="Производство AI-контента"
        note="Нейросети внутри полного цикла кинопроизводства"
      />

      <Reveal>
        <p className="max-w-3xl font-display text-2xl font-light leading-[1.4] text-foreground md:text-3xl">
          Нейросеть — <em className="text-accent">инструмент</em>, а не автор. Мы используем её
          там, где она усиливает замысел, — и не используем там, где она его подменяет.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-12">
        {/* —— Услуги —— */}
        <div className="lg:col-span-7">
          <ul className="flex flex-col">
            {AI_SERVICES.map((service, i) => (
              <Reveal key={service.num} delay={i * 0.05} y={32}>
                <li className="group grid grid-cols-[auto_1fr] items-baseline gap-5 border-t border-border py-7 transition-colors duration-500 last:border-b hover:bg-white/[0.015] md:gap-8 md:py-8">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                    {service.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light text-foreground transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-[1.85] text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* —— Визуалы —— */}
        <div className="lg:col-span-5">
          <AiVisuals />
        </div>
      </div>

      {/* —— Процесс —— */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <h3 className="mb-10 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Как мы работаем
            <span className="h-px flex-1 bg-border" aria-hidden />
          </h3>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AI_PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08} className="h-full">
              <div className="group relative flex h-full flex-col justify-between gap-8 bg-background p-6 transition-colors duration-500 hover:bg-card md:p-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{step.num}</span>
                <div>
                  <p className="font-display text-xl font-light text-foreground md:text-2xl">
                    {step.title}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
                    {step.note}
                  </p>
                </div>
                <MoveRight
                  className="absolute right-6 top-6 h-4 w-4 text-muted-foreground/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent md:right-8 md:top-8"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
