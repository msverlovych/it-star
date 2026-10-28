import {
  costLabels,
  levelLabels,
  typeLabels,
  type Cost,
  type Level,
  type Resource,
  type ResourceType,
} from "@/data/types";

export type AtlasQuery = {
  q?: string;
  type?: ResourceType | "all";
  level?: Level | "all";
  cost?: Cost | "all";
  tag?: string;
};

export function filterResources(list: Resource[], query: AtlasQuery) {
  const q = query.q?.trim().toLowerCase() ?? "";
  const filtered = list.filter((resource) => {
    if (query.type && query.type !== "all" && resource.type !== query.type) return false;
    if (query.level && query.level !== "all" && resource.level !== query.level) return false;
    if (query.cost && query.cost !== "all" && resource.cost !== query.cost) return false;
    if (query.tag && query.tag !== "all" && !resource.tags.includes(query.tag)) return false;
    if (!q) return true;
    const haystack = [
      resource.title,
      resource.description,
      resource.tags.join(" "),
      typeLabels[resource.type],
      levelLabels[resource.level],
      costLabels[resource.cost],
      resource.url,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  if (!q) return filtered;

  const score = (resource: Resource) => {
    const title = resource.title.toLowerCase();
    if (title === q) return 0;
    if (title.startsWith(q)) return 1;
    if (title.includes(q)) return 2;
    return 3;
  };

  return filtered.toSorted((a, b) => score(a) - score(b) || a.title.localeCompare(b.title));
}
