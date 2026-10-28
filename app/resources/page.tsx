import { Suspense } from "react";
import type { Metadata } from "next";
import { ResourceBrowser } from "@/components/resource-browser";
import { resourceCount } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Atlas",
  description: "Search and filter a curated database of courses, lessons, docs, books, channels, and tools for learning software development.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">The atlas</p>
      <h1 className="display mt-3 max-w-3xl text-[clamp(3.2rem,8vw,5.5rem)]">
        {resourceCount} resources, none invented.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Courses, lessons, articles, docs, channels, tools, and books. Free is marked free. Paid is marked paid. Every link goes to the real source.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-muted-foreground">Opening the atlas…</p>}>
          <ResourceBrowser />
        </Suspense>
      </div>
    </div>
  );
}
