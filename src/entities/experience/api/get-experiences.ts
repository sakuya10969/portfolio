import { API_BASE_URL } from '@/shared/config/site';
import type { Experience } from '../model/types';

export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${API_BASE_URL}/api/experiences`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
