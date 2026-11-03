"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import {
  CONTACT_EMAIL,
  PRESS_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  SOCIALS,
} from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { scrollToTop } from "./SmoothScroll";

export function Contacts() {
  return (
    <section id="contacts" aria-label="Контакты" className="relative pb-0 pt-28 md:pt-40">
      <SectionHeading
        num="06"
        kicker="Контакты"
        title="Свяжитесь с нами"
        note="Съёмки, копродукция, фестивали и пресса"
      />

      {/* —— Крупный e-mail —— */}
      <Reveal>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group inline-flex flex-wrap items-baseline gap-x-8 font-display text-[11vw] font-light leading-none tracking-tight text-foreground transition-colors duration-500 hover:text-accent sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {CONTACT_EMAIL}
          <ArrowUpRight
            className="h-[0.55em] w-[0.55em] text-accent opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100"
            aria-hidden
          />
          <span
            aria-hidden
            className="mt-4 block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
        </a>
      </Reveal>

      {/* —— Реквизиты и соцсети —— */}
      <div className="mt-20 grid gap-12 border-t border-border pt-14 md:grid-cols-12 md:mt-28">
        <Reveal className="md:col-span-4">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Офис
            </h3>
            <p className="mt-5 max-w-xs text-[15px] leading-[1.85] text-foreground/85">
              {CONTACT_ADDRESS}
            </p>
            <p className="mt-4 font-mono text-sm tracking-wide text-foreground/85 tabular-nums">
              {CONTACT_PHONE}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-4">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Для прессы
            </h3>
            <a
              href={`mailto:${PRESS_EMAIL}`}
              className="mt-5 inline-block text-[15px] text-foreground/85 underline decoration-border underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
            >
              {PRESS_EMAIL}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Аккредитация, интервью и запрос материалов — в течение рабочего дня.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="md:col-span-4">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Соцсети
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[15px] text-foreground/85 transition-colors duration-300 hover:text-accent"
                  >
                    {social.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* —— Футер —— */}
      <footer className="mt-20 border-t border-border md:mt-28">
        <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
              © 2026 Кинокомпания «Обскура»
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/70">
              Демонстрационный сайт · изображения сгенерированы нейросетями
            </p>
          </div>

          <div className="flex items-center gap-8">
            <span className="hidden font-display text-lg font-light italic text-foreground/40 md:inline">
              «Кино, которое остаётся»
            </span>
            <button
              onClick={scrollToTop}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              aria-label="Наверх"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
