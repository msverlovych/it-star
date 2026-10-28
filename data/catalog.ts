import { paths } from "@/data/paths";
import { resources } from "@/data/resources";
import { rankInfo, type LearningPath, type Resource, type Stage } from "@/data/types";

const slugSet = new Set<string>();

for (const resource of resources) {
  if (slugSet.has(resource.slug)) {
    throw new Error(`Duplicate resource slug: ${resource.slug}`);
  }
  slugSet.add(resource.slug);
  if (!resource.url.startsWith("https://")) {
    throw new Error(`Resource URL must be https: ${resource.slug}`);
  }
  try {
    void new URL(resource.url);
  } catch {
    throw new Error(`Bad resource URL: ${resource.slug}`);
  }
}

const pathSlugs = new Set<string>();

for (const path of paths) {
  if (pathSlugs.has(path.slug)) {
    throw new Error(`Duplicate path slug: ${path.slug}`);
  }
  pathSlugs.add(path.slug);
  if (path.ranks.length !== 4) {
    throw new Error(`Path ${path.slug} must have four ranks`);
  }
  for (const rank of path.ranks) {
    for (const stage of rank.stages) {
      if (stage.resources.length < 3) {
        throw new Error(`Stage ${stage.id} needs at least three resources`);
      }
      for (const slug of stage.resources) {
        if (!slugSet.has(slug)) {
          throw new Error(`Path ${path.slug} stage ${stage.id} is missing resource ${slug}`);
        }
      }
    }
  }
}

export function getResources() {
  return resources;
}

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export function getPaths() {
  return paths;
}

export function getPath(slug: string) {
  return paths.find((path) => path.slug === slug);
}

export type ResourceLink = Pick<Resource, "slug" | "title" | "url" | "type" | "level" | "cost" | "description">;

export type PresentedStage = Omit<Stage, "resources"> & {
  resources: ResourceLink[];
};

export type PresentedPath = Omit<LearningPath, "ranks"> & {
  ranks: Array<{
    id: LearningPath["ranks"][number]["id"];
    title: string;
    epithet: string;
    blurb: string;
    stages: PresentedStage[];
  }>;
};

function toLink(resource: Resource): ResourceLink {
  return {
    slug: resource.slug,
    title: resource.title,
    url: resource.url,
    type: resource.type,
    level: resource.level,
    cost: resource.cost,
    description: resource.description,
  };
}

export function presentPath(slug: string): PresentedPath | undefined {
  const path = getPath(slug);
  if (!path) return undefined;
  return {
    slug: path.slug,
    title: path.title,
    tagline: path.tagline,
    summary: path.summary,
    outcome: path.outcome,
    ranks: path.ranks.map((rank) => ({
      id: rank.id,
      title: rankInfo[rank.id].title,
      epithet: rankInfo[rank.id].epithet,
      blurb: rankInfo[rank.id].blurb,
      stages: rank.stages.map((stage) => ({
        id: stage.id,
        title: stage.title,
        summary: stage.summary,
        skills: stage.skills,
        milestone: stage.milestone,
        resources: stage.resources.map((resourceSlug) => {
          const resource = getResource(resourceSlug);
          if (!resource) {
            throw new Error(`Missing resource ${resourceSlug}`);
          }
          return toLink(resource);
        }),
      })),
    })),
  };
}

export function relatedResources(resource: Resource, limit = 4) {
  return resources
    .filter((candidate) => candidate.slug !== resource.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.tags.filter((tag) => resource.tags.includes(tag)).length + (candidate.type === resource.type ? 0.25 : 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export type PathMention = {
  pathSlug: string;
  pathTitle: string;
  stageId: string;
  stageTitle: string;
  rankTitle: string;
};

export function pathsUsing(slug: string): PathMention[] {
  const mentions: PathMention[] = [];
  for (const path of paths) {
    for (const rank of path.ranks) {
      for (const stage of rank.stages) {
        if (stage.resources.includes(slug)) {
          mentions.push({
            pathSlug: path.slug,
            pathTitle: path.title,
            stageId: stage.id,
            stageTitle: stage.title,
            rankTitle: rankInfo[rank.id].title,
          });
        }
      }
    }
  }
  return mentions;
}

export const resourceCount = resources.length;
export const pathCount = paths.length;
