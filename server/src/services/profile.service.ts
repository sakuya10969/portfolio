import { db } from '../db';

export async function getProfile() {
  const profile = await db.query.profiles.findFirst({
    with: {
      socialLinks: {
        orderBy: (sl, { asc }) => [asc(sl.sortOrder)],
      },
    },
  });
  return profile ?? null;
}
