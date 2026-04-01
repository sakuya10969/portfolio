import { API_BASE_URL } from '@/shared/config/site';
import type { SkillCategory } from '../model/types';

export async function getSkills(): Promise<SkillCategory[]> {
  const res = await fetch(`${API_BASE_URL}/api/skills`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
