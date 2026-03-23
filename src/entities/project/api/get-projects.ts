import type {
  Project as PrismaProject,
  ProjectLink as PrismaProjectLink,
  ProjectCategory as PrismaProjectCategory,
  Technology as PrismaTechnology,
  ProjectTechnology as PrismaProjectTechnology,
} from '@/shared/lib/generated/client';
import { prisma } from '@/shared/lib/prisma';
import type { Project, ProjectFilter } from '../model/types';

type ProjectWithRelations = PrismaProject & {
  category: PrismaProjectCategory;
  links: PrismaProjectLink[];
  technologies: (PrismaProjectTechnology & { technology: PrismaTechnology })[];
};

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

  return (projects as ProjectWithRelations[]).map((p) => ({
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
    ...(project as ProjectWithRelations),
    technologies: (project as ProjectWithRelations).technologies.map((pt) => pt.technology),
  };
}
