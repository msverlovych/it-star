"use client";

import Link from "next/link";
import { BrainIcon, GlobeIcon, LayoutIcon, ServerIcon, SmartphoneIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const icons = {
  ai: BrainIcon,
  web: GlobeIcon,
  frontend: LayoutIcon,
  backend: ServerIcon,
  mobile: SmartphoneIcon,
} as const;

const constellations: Record<string, string> = {
  ai: "M8 58 L28 18 L58 34 L40 64 L18 48",
  web: "M12 20 L48 12 L68 40 L36 68 L14 46 Z",
  frontend: "M10 16 H62 V40 H28 V66 H10 Z",
  backend: "M16 14 V66 M40 14 V66 M64 14 V66 M16 40 H64",
  mobile: "M24 10 H56 V70 H24 Z M34 18 H46",
};

export function PathGrid({
  paths,
}: {
  paths: Array<{ slug: string; title: string; tagline: string; summary: string }>;
}) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {paths.map((path, index) => {
        const Icon = icons[path.slug as keyof typeof icons] ?? GlobeIcon;
        const wide = index < 2 ? "xl:col-span-3" : "xl:col-span-2";
        return (
          <motion.li
            key={path.slug}
            className={wide}
            initial={reduce ? false : { opacity: 1, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.05 }}
          >
            <Link
              href={`/paths/${path.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card/85 p-5 ring-1 ring-foreground/10 transition hover:ring-primary/50"
            >
              <svg viewBox="0 0 80 80" className="pointer-events-none absolute top-3 right-3 size-24 opacity-30" aria-hidden="true">
                <path d={constellations[path.slug]} className="fill-none stroke-primary" strokeWidth="1.4" />
              </svg>
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-6 font-heading text-4xl leading-none tracking-tight">{path.title}</h3>
              <p className="mt-2 text-sm font-medium text-primary">{path.tagline}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{path.summary}</p>
              <span className="mt-6 text-sm font-medium group-hover:underline">Open the path</span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
