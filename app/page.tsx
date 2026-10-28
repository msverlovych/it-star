import Link from "next/link";
import { Hero } from "@/components/hero";
import { PathGrid } from "@/components/path-grid";
import { ResourceCard } from "@/components/resource-card";
import { getPaths, getResources, pathCount, resourceCount } from "@/data/catalog";
import { rankInfo, rankOrder } from "@/data/types";

export default function HomePage() {
  const featured = getResources().filter((resource) => resource.featured).slice(0, 6);
  const paths = getPaths().map((path) => ({
    slug: path.slug,
    title: path.title,
    tagline: path.tagline,
    summary: path.summary,
  }));

  return (
    <>
      <Hero resourceCount={resourceCount} pathCount={pathCount} />
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6" aria-labelledby="paths-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Five ways in</p>
            <h2 id="paths-heading" className="font-heading text-5xl leading-none">
              Pick a sky to cross
            </h2>
          </div>
          <Link href="/paths" className="text-sm font-medium text-primary hover:underline">
            All paths
          </Link>
        </div>
        <PathGrid paths={paths} />
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="ranks-heading">
        <h2 id="ranks-heading" className="font-heading text-5xl leading-none">
          Four ranks, one blade
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every path uses the same order. Move on when the milestone is true, not when a timer expires. The ranks are a study pace, not a certificate.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rankOrder.map((id, index) => (
            <li key={id} className="rounded-2xl bg-card/80 p-4 ring-1 ring-foreground/10">
              <p className="font-heading text-4xl text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-heading text-3xl leading-none">{rankInfo[id].title}</h3>
              <p className="mt-1 text-sm text-primary">{rankInfo[id].epithet}</p>
              <p className="mt-2 text-sm text-muted-foreground">{rankInfo[id].blurb}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-8 pb-16 sm:px-6" aria-labelledby="featured-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Start here</p>
            <h2 id="featured-heading" className="font-heading text-5xl leading-none">
              Six places worth opening first
            </h2>
          </div>
          <Link href="/resources" className="text-sm font-medium text-primary hover:underline">
            Full atlas
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((resource) => (
            <li key={resource.slug}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
