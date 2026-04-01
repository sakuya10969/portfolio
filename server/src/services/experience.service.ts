import { db } from '../db';

export async function getExperiences() {
  return db.query.experiences.findMany({
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });
}
