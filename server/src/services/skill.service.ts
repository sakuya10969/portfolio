import { db } from '../db';

export async function getSkills() {
  return db.query.skillCategories.findMany({
    with: {
      skills: {
        with: { technology: true },
        orderBy: (s, { asc }) => [asc(s.sortOrder)],
      },
    },
    orderBy: (c, { asc }) => [asc(c.sortOrder)],
  });
}
