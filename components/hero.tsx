"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PlasmaBlade } from "@/components/plasma-blade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero({ resourceCount, pathCount }: { resourceCount: number; pathCount: number }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/resources?q=${encodeURIComponent(value)}` : "/resources");
  }

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.7fr)] lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">Developer atlas</p>
          <h1 className="display mt-4 max-w-3xl text-[clamp(3.4rem,10vw,6.6rem)] text-balance">
            From first spark to master of the craft.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            ITstar is a curated library of courses, docs, books, channels, and tools, plus {pathCount} roadmaps for people learning to build software.
          </p>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row" role="search">
            <label htmlFor="hero-search" className="sr-only">
              Search resources
            </label>
            <Input
              id="hero-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try accessibility, Rust, or LLMs"
              className="h-12 bg-card/80 sm:max-w-md"
            />
            <Button type="submit" className="h-12 px-5">
              Search the atlas
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="h-11">
              <Link href="/paths">Choose a path</Link>
            </Button>
            <Button asChild variant="ghost" className="h-11">
              <Link href="/resources">Browse {resourceCount} resources</Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            <Stat value={String(resourceCount)} label="Real resources" />
            <Stat value={String(pathCount)} label="Career paths" />
            <Stat value="4" label="Ranks" />
          </dl>
          <div className="mt-8 h-16 lg:hidden">
            <PlasmaBlade orientation="horizontal" />
          </div>
        </motion.div>
        <div className="relative hidden h-[min(68vh,620px)] lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 bottom-6 h-10 rounded-full bg-primary/25 blur-2xl"
          />
          <PlasmaBlade />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card/70 px-3 py-3 ring-1 ring-foreground/10">
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="font-heading text-3xl leading-none">{value}</dd>
    </div>
  );
}
