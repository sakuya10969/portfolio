import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import {
  profiles,
  socialLinks,
  technologies,
  projectCategories,
  projects,
  projectLinks,
  projectTechnologies,
  skillCategories,
  skills,
  experiences,
  contacts,
} from './schema';
import {
  profileData,
  socialLinksData,
  technologiesData,
  projectCategoriesData,
  projectsData,
  skillCategoriesData,
  experiencesData,
} from './seed/data';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client, schema });

function uuid() {
  return crypto.randomUUID();
}

async function main() {
  console.log('Cleaning existing data...');
  await db.delete(contacts);
  await db.delete(experiences);
  await db.delete(skills);
  await db.delete(skillCategories);
  await db.delete(projectTechnologies);
  await db.delete(projectLinks);
  await db.delete(projects);
  await db.delete(projectCategories);
  await db.delete(technologies);
  await db.delete(socialLinks);
  await db.delete(profiles);

  // Profile
  const profileId = uuid();
  await db.insert(profiles).values({ id: profileId, ...profileData, updatedAt: new Date() });
  await db.insert(socialLinks).values(
    socialLinksData.map((link) => ({ id: uuid(), profileId, ...link, updatedAt: new Date() })),
  );
  console.log('Created profile');

  // Technologies
  const techRows = technologiesData.map((t) => ({ id: uuid(), ...t, updatedAt: new Date() }));
  await db.insert(technologies).values(techRows);
  const techMap = Object.fromEntries(techRows.map((t) => [t.name, t]));
  console.log(`Created ${techRows.length} technologies`);

  // Project Categories
  const catRows = projectCategoriesData.map((c) => ({ id: uuid(), ...c, updatedAt: new Date() }));
  await db.insert(projectCategories).values(catRows);
  const catMap = Object.fromEntries(catRows.map((c) => [c.slug, c]));
  console.log(`Created ${catRows.length} categories`);

  // Projects
  for (const p of projectsData) {
    const category = catMap[p.categorySlug];
    if (!category) throw new Error(`Category not found: ${p.categorySlug}`);

    const projectId = uuid();
    await db.insert(projects).values({
      id: projectId,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      background: p.background,
      architecture: p.architecture,
      highlights: p.highlights,
      challenges: p.challenges,
      futureWork: p.futureWork,
      isPublished: p.isPublished,
      sortOrder: p.sortOrder,
      categoryId: category.id,
      updatedAt: new Date(),
    });

    // Project links
    if (p.links?.length) {
      await db.insert(projectLinks).values(
        p.links.map((link) => ({
          id: uuid(),
          projectId,
          type: link.type,
          url: link.url,
          label: link.label,
          sortOrder: link.sortOrder,
          updatedAt: new Date(),
        })),
      );
    }

    // Project technologies
    const techEntries = p.technologies
      .map((name) => techMap[name])
      .filter(Boolean);
    if (techEntries.length) {
      await db.insert(projectTechnologies).values(
        techEntries.map((tech) => ({ projectId, technologyId: tech.id })),
      );
    }
  }
  console.log(`Created ${projectsData.length} projects`);

  // Skill Categories & Skills
  for (const cat of skillCategoriesData) {
    const catId = uuid();
    await db.insert(skillCategories).values({
      id: catId,
      name: cat.name,
      slug: cat.slug,
      sortOrder: cat.sortOrder,
      updatedAt: new Date(),
    });

    await db.insert(skills).values(
      cat.skills.map((skill) => ({
        id: uuid(),
        name: skill.name,
        categoryId: catId,
        technologyId: techMap[skill.name]?.id ?? null,
        proficiency: skill.proficiency,
        sortOrder: skill.sortOrder,
        updatedAt: new Date(),
      })),
    );
  }
  console.log(`Created ${skillCategoriesData.length} skill categories`);

  // Experiences
  await db.insert(experiences).values(
    experiencesData.map((exp) => ({
      id: uuid(),
      type: exp.type,
      organization: exp.organization,
      role: exp.role,
      description: exp.description,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : null,
      sortOrder: exp.sortOrder,
      updatedAt: new Date(),
    })),
  );
  console.log(`Created ${experiencesData.length} experiences`);

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => client.end());
