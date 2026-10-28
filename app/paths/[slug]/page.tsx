import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RoadmapView } from "@/components/roadmap-view";
import { getPaths, presentPath } from "@/data/catalog";

export function generateStaticParams() {
  return getPaths().map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = presentPath(slug);
  if (!path) return { title: "Path" };
  return { title: path.title, description: path.summary };
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = presentPath(slug);
  if (!path) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/paths" className="hover:text-foreground">Paths</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{path.title}</li>
        </ol>
      </nav>
      <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-primary uppercase">{path.tagline}</p>
      <h1 className="display mt-3 max-w-4xl text-[clamp(3.2rem,8vw,5.8rem)]">{path.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{path.summary}</p>
      <p className="mt-4 max-w-2xl rounded-2xl bg-card/80 p-4 text-sm leading-6 ring-1 ring-foreground/10">
        <span className="font-medium text-foreground">Outcome. </span>
        {path.outcome}
      </p>
      <div className="mt-12">
        <RoadmapView path={path} />
      </div>
    </div>
  );
}
