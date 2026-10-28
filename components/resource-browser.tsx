"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/resource-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resources } from "@/data/resources";
import { filterResources } from "@/lib/filter";
import {
  costs,
  costLabels,
  filterTags,
  levels,
  levelLabels,
  resourceTypes,
  typeLabels,
  type Cost,
  type Level,
  type ResourceType,
} from "@/data/types";

function one(value: string | null) {
  return value ?? "";
}

export function ResourceBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = one(params.get("q"));
  const type = (params.get("type") ?? "all") as ResourceType | "all";
  const level = (params.get("level") ?? "all") as Level | "all";
  const cost = (params.get("cost") ?? "all") as Cost | "all";
  const tag = params.get("tag") ?? "all";
  const [draft, setDraft] = useState(q);
  const [syncedQuery, setSyncedQuery] = useState(q);
  if (q !== syncedQuery) {
    setSyncedQuery(q);
    setDraft(q);
  }

  const results = useMemo(
    () => filterResources(resources, { q, type, level, cost, tag }),
    [q, type, level, cost, tag],
  );

  function update(next: Record<string, string | null>) {
    const search = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === "all") search.delete(key);
      else search.set(key, value);
    }
    const query = search.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    update({ q: draft.trim() || null });
  }

  const activeFilters = [type, level, cost, tag].some((value) => value !== "all") || q.length > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <form onSubmit={onSearch} className="space-y-6 lg:sticky lg:top-24 lg:self-start" role="search">
        <div>
          <label htmlFor="atlas-search" className="text-sm font-medium">
            Search
          </label>
          <Input
            id="atlas-search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="React, SQL, Flutter…"
            className="mt-2 h-11 bg-card/80"
          />
        </div>
        <FilterGroup
          legend="Type"
          value={type}
          options={[["all", "All"], ...resourceTypes.map((item) => [item, typeLabels[item]] as const)]}
          onChange={(value) => update({ type: value })}
        />
        <FilterGroup
          legend="Level"
          value={level}
          options={[["all", "All"], ...levels.map((item) => [item, levelLabels[item]] as const)]}
          onChange={(value) => update({ level: value })}
        />
        <FilterGroup
          legend="Cost"
          value={cost}
          options={[["all", "All"], ...costs.map((item) => [item, costLabels[item]] as const)]}
          onChange={(value) => update({ cost: value })}
        />
        <fieldset>
          <legend className="text-sm font-medium">Tag</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <FilterChip active={tag === "all"} onClick={() => update({ tag: null })}>
              All
            </FilterChip>
            {filterTags.map((item) => (
              <FilterChip key={item} active={tag === item} onClick={() => update({ tag: tag === item ? null : item })}>
                {item}
              </FilterChip>
            ))}
          </div>
        </fieldset>
        {activeFilters ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDraft("");
              router.replace(pathname, { scroll: false });
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </form>
      <div>
        <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "resource" : "resources"}
        </p>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <h2 className="font-heading text-3xl">No signals on this frequency</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Nothing in the atlas matches that combination. Clear a filter or try a broader word.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {results.map((resource) => (
              <li key={resource.slug}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={legend}>
        {options.map(([option, label]) => (
          <FilterChip key={option} active={value === option} onClick={() => onChange(option)}>
            {label}
          </FilterChip>
        ))}
      </div>
    </fieldset>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-xs font-medium text-muted-foreground aria-pressed:border-primary/50 aria-pressed:bg-primary/15 aria-pressed:text-foreground"
    >
      {children}
    </button>
  );
}
