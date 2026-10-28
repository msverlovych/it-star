import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getResource, pathsUsing, relatedResources } from "@/data/catalog";
import { hostnameOf } from "@/lib/url";
import { resources } from "@/data/resources";
import { costLabels, levelLabels, typeLabels } from "@/data/types";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "Resource" };
  return { title: resource.title, description: resource.description };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  const related = relatedResources(resource);
  const mentions = pathsUsing(resource.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/resources" className="hover:text-foreground">Atlas</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{resource.title}</li>
        </ol>
      </nav>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="outline">{typeLabels[resource.type]}</Badge>
        <Badge variant="outline">{levelLabels[resource.level]}</Badge>
        <Badge variant={resource.cost === "free" ? "secondary" : "outline"}>{costLabels[resource.cost]}</Badge>
      </div>
      <h1 className="display mt-4 text-[clamp(3rem,7vw,5rem)]">{resource.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{resource.description}</p>
      <p className="mt-3 text-sm text-muted-foreground">{hostnameOf(resource.url)}</p>
      <div className="mt-6">
        <Button asChild className="h-11">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Open resource
            <ArrowUpRightIcon aria-hidden="true" />
            <span className="sr-only"> in a new tab</span>
          </a>
        </Button>
      </div>
      <h2 className="mt-10 font-heading text-3xl">Tags</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <li key={tag}>
            <Link href={`/resources?tag=${encodeURIComponent(tag)}`} className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-primary/15">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      {mentions.length > 0 ? (
        <section className="mt-10" aria-labelledby="on-paths">
          <h2 id="on-paths" className="font-heading text-3xl">On these paths</h2>
          <ul className="mt-3 space-y-2">
            {mentions.map((mention) => (
              <li key={`${mention.pathSlug}-${mention.stageTitle}`}>
                <Link href={`/paths/${mention.pathSlug}#${mention.stageId}`} className="hover:text-primary">
                  {mention.pathTitle}
                </Link>
                <span className="text-muted-foreground"> · {mention.rankTitle} · {mention.stageTitle}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="mt-10" aria-labelledby="related">
          <h2 id="related" className="font-heading text-3xl">Nearby in the atlas</h2>
          <ul className="mt-3 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/resources/${item.slug}`} className="font-medium hover:text-primary">
                  {item.title}
                </Link>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
