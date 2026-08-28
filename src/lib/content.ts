import siteData from "../content/site.json";
import projectsData from "../content/projects.json";
import notesData from "../content/notes.json";

export interface SiteLink {
  label: string;
  handle: string;
  url: string;
}

export interface Principle {
  number: string;
  title: string;
  body: string;
}

export interface SiteData {
  name: string;
  shortName: string;
  handle: string;
  location: string;
  role: string;
  eyebrow: string;
  headline: string;
  intro: string;
  bio: string;
  availability: string;
  contactPrompt: string;
  capabilities: string[];
  principles: Principle[];
  links: SiteLink[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectProof {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  eyebrow: string;
  summary: string;
  status: string;
  problem: string;
  scope: string;
  approach: string[];
  proof: ProjectProof[];
  outcome: string;
  limits: string;
  tags: string[];
  visual: "signal" | "orbit" | "score";
  links: ProjectLink[];
}

export interface Note {
  slug: string;
  date: string;
  number: string;
  title: string;
  summary: string;
  body: string[];
  related: string;
}

export const site = siteData as SiteData;
export const projects = projectsData as Project[];
export const notes = notesData as Note[];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
