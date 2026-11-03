"use client";

import { motion } from "framer-motion";
import { Reveal, EASE } from "./Reveal";

interface SectionHeadingProps {
  num: string;
  kicker: string;
  title: string;
  note?: string;
}

/** Нумерованный заголовок раздела: 01 — линия — kicker, затем крупный серифный титул */
export function SectionHeading({ num, kicker, title, note }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal y={24}>
        <div className="mb-7 flex items-center gap-5">
          <span className="font-mono text-[11px] tracking-[0.35em] text-accent">{num}</span>
          <motion.span
            aria-hidden
            className="h-px w-16 origin-left bg-accent/60 md:w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            {kicker}
          </span>
        </div>
      </Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.1} y={32}>
          <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {title}
          </h2>
        </Reveal>
        {note ? (
          <Reveal delay={0.25} y={20}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
