import type { ReactNode } from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  category: string;
  title: string;
  role: string;
  roleSecondary: string;
  description: string;
  stats: [ProjectStat, ProjectStat];
  tech: string[];
  diagram: ReactNode;
  diagramAriaLabel: string;
  walkthroughHref: string;
}

export interface WhyItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface BlogPost {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}
