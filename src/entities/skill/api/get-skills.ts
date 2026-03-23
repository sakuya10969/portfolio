import { prisma } from '@/shared/lib/prisma';
import type { SkillCategory } from '../model/types';

export async function getSkills(): Promise<SkillCategory[]> {
  const categories = await prisma.skillCategory.findMany({
    include: {
      skills: {
        include: { technology: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });
  return categories;
}
