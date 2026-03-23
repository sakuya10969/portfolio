export type ProjectCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Technology = {
  id: string;
  name: string;
  iconUrl: string | null;
  officialUrl: string | null;
};

export type ProjectLink = {
  id: string;
  type: "github" | "demo" | "docs" | "other";
  url: string;
  label: string | null;
  sortOrder: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  background: string;
  architecture: string;
  highlights: string;
  challenges: string;
  futureWork: string;
  thumbnailUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  category: ProjectCategory;
  links: ProjectLink[];
  technologies: Technology[];
};

export type ProjectFilter = {
  category?: string;
  technology?: string;
};
