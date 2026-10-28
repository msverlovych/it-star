"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PresentedPath } from "@/data/catalog";
import { hostnameOf } from "@/lib/url";
import { costLabels, levelLabels, typeLabels } from "@/data/types";
import { Badge } from "@/components/ui/badge";

export function RoadmapView({ path }: { path: PresentedPath }) {
  const reduce = useReducedMotion();
  const initial = new Set(path.ranks.map((rank) => rank.stages[0]?.id).filter(Boolean) as string[]);
  const [open, setOpen] = useState<Set<string>>(initial);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[13rem_1fr]">
      <nav aria-label="Ranks" className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
          {path.ranks.map((rank) => (
            <li key={rank.id}>
              <a
                href={`#rank-${rank.id}`}
                className="inline-flex min-w-max items-baseline gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-sm lg:w-full"
              >
                <span className="font-heading text-xl leading-none">{rank.title}</span>
                <span className="text-muted-foreground">{rank.epithet}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[1.15rem] w-px origin-top bg-gradient-to-b from-primary via-primary to-transparent"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="space-y-12">
          {path.ranks.map((rank) => (
            <section key={rank.id} id={`rank-${rank.id}`} aria-labelledby={`rank-title-${rank.id}`}>
              <div className="relative pl-12">
                <span className="absolute top-2 left-[0.7rem] size-4 rounded-full bg-primary shadow-[0_0_16px_var(--saber)]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{rank.epithet}</p>
                <h2 id={`rank-title-${rank.id}`} className="font-heading text-5xl leading-none">
                  {rank.title}
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">{rank.blurb}</p>
              </div>
              <ol className="mt-6 space-y-4">
                {rank.stages.map((stage, index) => {
                  const expanded = open.has(stage.id);
                  const panelId = `${stage.id}-panel`;
                  return (
                    <li key={stage.id} id={stage.id} className="relative pl-12">
                      <span className="absolute top-5 left-[0.95rem] size-2.5 rounded-full bg-foreground/80" aria-hidden="true" />
                      <article className="rounded-2xl bg-card/90 ring-1 ring-foreground/10">
                        <h3 className="sr-only">{stage.title}</h3>
                        <button
                          type="button"
                          className="flex w-full items-start gap-4 px-4 py-4 text-left"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => toggle(stage.id)}
                        >
                          <span className="font-heading text-3xl leading-none text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block font-heading text-3xl leading-none">{stage.title}</span>
                            <span className="mt-2 block text-sm text-muted-foreground">{stage.milestone}</span>
                          </span>
                        </button>
                        <div id={panelId} hidden={!expanded} className="px-4 pb-5">
                          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{stage.summary}</p>
                          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                            {stage.skills.map((skill) => (
                              <li key={skill}>
                                <Badge variant="outline">{skill}</Badge>
                              </li>
                            ))}
                          </ul>
                          <h4 className="mt-5 text-sm font-medium">Resources</h4>
                          <ul className="mt-2 divide-y divide-border">
                            {stage.resources.map((resource) => (
                              <li key={resource.slug} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <Link href={`/resources/${resource.slug}`} className="font-medium hover:text-primary">
                                    {resource.title}
                                  </Link>
                                  <p className="text-xs text-muted-foreground">
                                    {typeLabels[resource.type]} · {levelLabels[resource.level]} · {costLabels[resource.cost]} · {hostnameOf(resource.url)}
                                  </p>
                                </div>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                                >
                                  Open
                                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                                  <span className="sr-only"> {resource.title} in a new tab</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
