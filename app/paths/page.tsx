import type { Metadata } from "next";
import { PathGrid } from "@/components/path-grid";
import { getPaths } from "@/data/catalog";
import { rankInfo, rankOrder } from "@/data/types";

export const metadata: Metadata = {
  title: "Paths",
  description: "Roadmaps from first ignition to a professional role in AI, web development, frontend, backend, and mobile.",
};

export default function PathsPage() {
  const paths = getPaths().map((path) => ({
    slug: path.slug,
    title: path.title,
    tagline: path.tagline,
    summary: path.summary,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Career paths</p>
      <h1 className="display mt-3 max-w-3xl text-[clamp(3.2rem,8vw,5.5rem)]">Five roads. The same four ranks.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Each path is a sequence you can open stage by stage. The ranks are Spark, Apprentice, Knight, and Master: a pace for study, not a credential.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-4">
        {rankOrder.map((id) => (
          <li key={id} className="rounded-2xl bg-card/75 p-4 ring-1 ring-foreground/10">
            <h2 className="font-heading text-3xl leading-none">{rankInfo[id].title}</h2>
            <p className="mt-1 text-sm text-primary">{rankInfo[id].epithet}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <PathGrid paths={paths} />
      </div>
    </div>
  );
}
