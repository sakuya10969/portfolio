import { eq, and, inArray } from 'drizzle-orm';
import { db } from '../db';
import { projects, projectCategories, projectTechnologies, technologies } from '../db/schema';

export type ProjectFilter = {
  category?: string;
  technology?: string;
};

export async function getProjects(filter?: ProjectFilter) {
  let categoryId: string | undefined;
  if (filter?.category) {
    const cat = await db.query.projectCategories.findFirst({
      where: (c, { eq }) => eq(c.slug, filter.category!),
    });
    if (!cat) return [];
    categoryId = cat.id;
  }

  let projectIdsWithTech: string[] | undefined;
  if (filter?.technology) {
    const tech = await db.query.technologies.findFirst({
      where: (t, { eq }) => eq(t.name, filter.technology!),
    });
    if (!tech) return [];
    const rows = await db
      .select({ projectId: projectTechnologies.projectId })
      .from(projectTechnologies)
      .where(eq(projectTechnologies.technologyId, tech.id));
    projectIdsWithTech = rows.map((r) => r.projectId);
    if (projectIdsWithTech.length === 0) return [];
  }

  const rows = await db.query.projects.findMany({
    where: (p, { eq, and, inArray }) => {
      const conditions = [eq(p.isPublished, true)];
      if (categoryId) conditions.push(eq(p.categoryId, categoryId));
      if (projectIdsWithTech) conditions.push(inArray(p.id, projectIdsWithTech));
      return and(...conditions);
    },
    with: {
      category: true,
      links: {
        orderBy: (l, { asc }) => [asc(l.sortOrder)],
      },
      technologies: {
        with: { technology: true },
        orderBy: (pt, { asc }) => [asc(pt.technologyId)],
      },
    },
    orderBy: (p, { asc }) => [asc(p.sortOrder)],
  });

  return rows.map((p) => ({
    ...p,
    technologies: p.technologies.map((pt) => pt.technology),
  }));
}

export async function getProjectBySlug(slug: string) {
  const project = await db.query.projects.findFirst({
    where: (p, { eq, and }) => and(eq(p.slug, slug), eq(p.isPublished, true)),
    with: {
      category: true,
      links: {
        orderBy: (l, { asc }) => [asc(l.sortOrder)],
      },
      technologies: {
        with: { technology: true },
        orderBy: (pt, { asc }) => [asc(pt.technologyId)],
      },
    },
  });
  if (!project) return null;
  return {
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
  };
}

export async function getProjectCategories() {
  return db.query.projectCategories.findMany({
    orderBy: (c, { asc }) => [asc(c.sortOrder)],
  });
}
