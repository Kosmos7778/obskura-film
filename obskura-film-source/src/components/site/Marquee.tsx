"use client";

import { MARQUEE_ITEMS } from "@/lib/content";

/** Бегущая строка между первым экраном и «О компании» */
export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border bg-background py-5"
    >
      <div className="marquee-track items-center gap-12 pr-12">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-xl font-light italic text-foreground/60 md:text-2xl">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
