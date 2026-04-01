import { API_BASE_URL } from '@/shared/config/site';
import type { Project, ProjectFilter } from '../model/types';

export async function getProjects(filter?: ProjectFilter): Promise<Project[]> {
  const params = new URLSearchParams();
  if (filter?.category) params.set('category', filter.category);
  if (filter?.technology) params.set('technology', filter.technology);

  const query = params.toString();
  const url = `${API_BASE_URL}/api/projects${query ? `?${query}` : ''}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_BASE_URL}/api/projects/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}
