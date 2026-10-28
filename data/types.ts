export const resourceTypes = [
  "course",
  "lesson",
  "article",
  "docs",
  "channel",
  "tool",
  "book",
] as const;

export type ResourceType = (typeof resourceTypes)[number];

export const levels = ["beginner", "intermediate", "advanced"] as const;

export type Level = (typeof levels)[number];

export const costs = ["free", "paid", "freemium"] as const;

export type Cost = (typeof costs)[number];

export const rankOrder = ["spark", "apprentice", "knight", "master"] as const;

export type RankId = (typeof rankOrder)[number];

export type Resource = {
  slug: string;
  title: string;
  url: string;
  description: string;
  type: ResourceType;
  level: Level;
  cost: Cost;
  tags: string[];
  featured?: boolean;
};

export type Stage = {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  milestone: string;
  resources: string[];
};

export type PathRank = {
  id: RankId;
  stages: Stage[];
};

export type LearningPath = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  outcome: string;
  ranks: PathRank[];
};

export const typeLabels: Record<ResourceType, string> = {
  course: "Course",
  lesson: "Lesson",
  article: "Article",
  docs: "Docs",
  channel: "Channel",
  tool: "Tool",
  book: "Book",
};

export const levelLabels: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const costLabels: Record<Cost, string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Freemium",
};

export const rankInfo: Record<
  RankId,
  { title: string; epithet: string; blurb: string }
> = {
  spark: {
    title: "Spark",
    epithet: "First ignition",
    blurb: "You can set up a workshop and explain the basics out loud.",
  },
  apprentice: {
    title: "Apprentice",
    epithet: "Training arc",
    blurb: "You build small things on purpose and repair them when they break.",
  },
  knight: {
    title: "Knight",
    epithet: "Field ready",
    blurb: "You can ship a real project with other people watching.",
  },
  master: {
    title: "Master",
    epithet: "Teach and ship",
    blurb: "You judge tradeoffs, leave a trail, and raise the next person.",
  },
};

export const filterTags = [
  "javascript",
  "typescript",
  "react",
  "css",
  "python",
  "java",
  "backend",
  "sql",
  "mobile",
  "flutter",
  "machine-learning",
  "llm",
  "devops",
  "accessibility",
  "algorithms",
  "computer-science",
  "git",
] as const;
