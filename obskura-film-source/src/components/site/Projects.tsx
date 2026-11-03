"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, type Project, type ProjectStatus } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, EASE } from "./Reveal";

const STATUS_DOT: Record<ProjectStatus, string> = {
  production: "bg-accent",
  post: "bg-foreground/70",
  development: "bg-muted-foreground/60",
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Reveal y={44} delay={index * 0.06}>
      <article
        ref={ref}
        className="group grid gap-6 border-t border-border py-10 transition-colors duration-700 md:grid-cols-12 md:gap-8 md:py-14"
      >
        {/* Номер и название */}
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-3xl font-light leading-tight text-foreground transition-colors duration-500 group-hover:text-accent md:text-4xl">
              «{project.title}»
            </h3>
          </div>
          <p className="mt-3 pl-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {project.genre}
          </p>
        </div>

        {/* Описание */}
        <div className="md:col-span-4">
          <p className="max-w-md text-sm leading-[1.85] text-foreground/75">{project.description}</p>
        </div>

        {/* Статус и прогресс */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-2.5">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]} pulse-soft`} aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground">
              {project.statusLabel}
            </span>
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            {project.premiere}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <div className="relative h-px flex-1 bg-foreground/10" aria-hidden>
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {project.progress}%
            </span>
          </div>
        </div>

        {/* Кадр-превью */}
        <div className="relative aspect-[16/9] overflow-hidden bg-card md:col-span-12 md:mt-4 lg:aspect-[21/9]">
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
            <div className="relative h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
              <Image
                src={project.image}
                alt={`Концепт-кадр проекта «${project.title}»`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">
            Концепт-кадр · {project.title}
          </span>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-label="Проекты в производстве" className="relative py-28 md:py-40">
      <SectionHeading
        num="03"
        kicker="Проекты"
        title="В производстве"
        note="Три картины на разных стадиях — от сценария до монтажа"
      />

      <div className="border-b border-border">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
