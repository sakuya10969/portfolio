import { Suspense } from 'react';
import { getProjects, type Project } from '@/entities/project';
import { ProjectCard } from '@/entities/project';
import { ProjectFilter } from '@/features/project-filter';
import type { ProjectFilter as ProjectFilterType, ProjectCategory } from '@/entities/project';
import { API_BASE_URL } from '@/shared/config/site';

type Props = {
  filter?: ProjectFilterType;
};

async function getCategories(): Promise<ProjectCategory[]> {
  const res = await fetch(`${API_BASE_URL}/api/projects/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function ProjectListSection({ filter }: Props) {
  const [projects, categories] = await Promise.all([getProjects(filter), getCategories()]);

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
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
