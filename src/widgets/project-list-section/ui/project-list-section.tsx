import { Suspense } from 'react';
import { getProjects } from '@/entities/project';
import { ProjectCard } from '@/entities/project';
import { prisma } from '@/shared/lib/prisma';
import { ProjectFilter } from '@/features/project-filter';
import type { ProjectFilter as ProjectFilterType } from '@/entities/project';

type Props = {
  filter?: ProjectFilterType;
};

export async function ProjectListSection({ filter }: Props) {
  const [projects, categories] = await Promise.all([
    getProjects(filter),
    prisma.projectCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  return (
    <div className="space-y-8">
      <Suspense>
        <ProjectFilter categories={categories} technologies={[]} />
      </Suspense>
      {projects.length === 0 ? (
        <div className="text-muted-foreground py-16 text-center">
          <p>該当するプロジェクトがありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
