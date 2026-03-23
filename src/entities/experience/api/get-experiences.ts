import { prisma } from '@/shared/lib/prisma';
import type { Experience } from '../model/types';

export async function getExperiences(): Promise<Experience[]> {
  return prisma.experience.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}
