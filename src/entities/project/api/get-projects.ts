import { prisma } from '@/shared/lib/prisma';
import type { Project, ProjectFilter } from '../model/types';

export async function getProjects(filter?: ProjectFilter): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
      ...(filter?.category && {
        category: { slug: filter.category },
      }),
      ...(filter?.technology && {
        technologies: {
          some: { technology: { name: filter.technology } },
        },
      }),
    },
    include: {
      category: true,
      links: { orderBy: { sortOrder: 'asc' } },
      technologies: {
        include: { technology: true },
        orderBy: { technology: { sortOrder: 'asc' } },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return projects.map((p) => ({
    ...p,
    technologies: p.technologies.map((pt) => pt.technology),
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { slug, isPublished: true },
    include: {
      category: true,
      links: { orderBy: { sortOrder: 'asc' } },
      technologies: {
        include: { technology: true },
        orderBy: { technology: { sortOrder: 'asc' } },
      },
    },
  });

  if (!project) return null;

  return {
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
  };
}
