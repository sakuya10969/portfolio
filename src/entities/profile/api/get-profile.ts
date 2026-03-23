import { prisma } from '@/shared/lib/prisma';
import type { Profile } from '../model/types';

export async function getProfile(): Promise<Profile | null> {
  const profile = await prisma.profile.findFirst({
    include: {
      socialLinks: { orderBy: { sortOrder: 'asc' } },
    },
  });
  return profile;
}
