import { API_BASE_URL } from '@/shared/config/site';
import type { Profile } from '../model/types';

export async function getProfile(): Promise<Profile | null> {
  const res = await fetch(`${API_BASE_URL}/api/profile`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}
