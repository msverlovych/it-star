import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { hostnameOf } from "@/lib/url";
import { costLabels, levelLabels, typeLabels, type Resource } from "@/data/types";
import { Badge } from "@/components/ui/badge";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="card-auto group flex h-full flex-col rounded-2xl bg-card/90 p-5 ring-1 ring-foreground/10 transition motion-safe:hover:-translate-y-0.5 hover:ring-primary/45">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline">{typeLabels[resource.type]}</Badge>
        <Badge variant="outline">{levelLabels[resource.level]}</Badge>
        <Badge variant={resource.cost === "free" ? "secondary" : "outline"}>
          {costLabels[resource.cost]}
        </Badge>
      </div>
      <h3 className="mt-3 font-heading text-[1.65rem] leading-none tracking-tight">
        <Link href={`/resources/${resource.slug}`} className="hover:text-primary">
          {resource.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
        {resource.tags.slice(0, 4).map((tag) => (
          <li key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
        <span className="truncate text-muted-foreground">{hostnameOf(resource.url)}</span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-medium text-primary hover:underline"
        >
          Open
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
          <span className="sr-only"> {resource.title} in a new tab</span>
        </a>
      </div>
    </article>
  );
}
