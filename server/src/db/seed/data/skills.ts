export interface SkillCategorySeedData {
  name: string;
  slug: string;
  sortOrder: number;
  skills: { name: string; proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'; sortOrder: number }[];
}

export const skillCategoriesData: SkillCategorySeedData[] = [
  {
    name: '言語',
    slug: 'languages',
    sortOrder: 1,
    skills: [
      { name: 'TypeScript', proficiency: 'advanced', sortOrder: 1 },
      { name: 'Python', proficiency: 'advanced', sortOrder: 2 },
      { name: 'PHP', proficiency: 'intermediate', sortOrder: 3 },
      { name: 'Go', proficiency: 'intermediate', sortOrder: 4 },
      { name: 'SQL', proficiency: 'advanced', sortOrder: 5 },
    ],
  },
  {
    name: 'フロントエンド',
    slug: 'frontend',
    sortOrder: 2,
    skills: [
      { name: 'React', proficiency: 'advanced', sortOrder: 1 },
      { name: 'Next.js', proficiency: 'advanced', sortOrder: 2 },
      { name: 'React Router', proficiency: 'advanced', sortOrder: 3 },
      { name: 'Mantine UI', proficiency: 'advanced', sortOrder: 4 },
      { name: 'Tailwind CSS', proficiency: 'advanced', sortOrder: 5 },
      { name: 'shadcn/ui', proficiency: 'advanced', sortOrder: 6 },
      { name: 'Framer Motion', proficiency: 'intermediate', sortOrder: 7 },
      { name: 'GSAP', proficiency: 'intermediate', sortOrder: 8 },
      { name: 'Storybook', proficiency: 'intermediate', sortOrder: 9 },
      { name: 'TanStack Query', proficiency: 'advanced', sortOrder: 10 },
    ],
  },
  {
    name: 'バックエンド',
    slug: 'backend',
    sortOrder: 3,
    skills: [
      { name: 'Node.js', proficiency: 'advanced', sortOrder: 1 },
      { name: 'Hono', proficiency: 'advanced', sortOrder: 2 },
      { name: 'NestJS', proficiency: 'advanced', sortOrder: 3 },
      { name: 'FastAPI', proficiency: 'advanced', sortOrder: 4 },
      { name: 'Django', proficiency: 'intermediate', sortOrder: 5 },
      { name: 'Laravel', proficiency: 'intermediate', sortOrder: 6 },
      { name: 'GraphQL', proficiency: 'advanced', sortOrder: 7 },
      { name: 'Hasura', proficiency: 'intermediate', sortOrder: 8 },
      { name: 'Bun', proficiency: 'intermediate', sortOrder: 9 },
    ],
  },
  {
    name: 'データベース / ORM',
    slug: 'database',
    sortOrder: 4,
    skills: [
      { name: 'PostgreSQL', proficiency: 'advanced', sortOrder: 1 },
      { name: 'MySQL', proficiency: 'intermediate', sortOrder: 2 },
      { name: 'SQL Server', proficiency: 'intermediate', sortOrder: 3 },
      { name: 'Drizzle ORM', proficiency: 'advanced', sortOrder: 4 },
      { name: 'Prisma', proficiency: 'advanced', sortOrder: 5 },
      { name: 'TypeORM', proficiency: 'intermediate', sortOrder: 6 },
      { name: 'SQLAlchemy', proficiency: 'intermediate', sortOrder: 7 },
      { name: 'Alembic', proficiency: 'intermediate', sortOrder: 8 },
    ],
  },
  {
    name: 'クラウド / インフラ',
    slug: 'cloud-infra',
    sortOrder: 5,
    skills: [
      { name: 'AWS', proficiency: 'beginner', sortOrder: 1 },
      { name: 'Microsoft Azure', proficiency: 'intermediate', sortOrder: 2 },
      { name: 'Google Cloud', proficiency: 'intermediate', sortOrder: 3 },
      { name: 'Neon', proficiency: 'intermediate', sortOrder: 4 },
      { name: 'Docker', proficiency: 'intermediate', sortOrder: 5 },
    ],
  },
  {
    name: 'テスト / ツール',
    slug: 'testing-tools',
    sortOrder: 6,
    skills: [
      { name: 'Jest', proficiency: 'intermediate', sortOrder: 1 },
      { name: 'pytest', proficiency: 'intermediate', sortOrder: 2 },
      { name: 'Zod', proficiency: 'advanced', sortOrder: 3 },
      { name: 'Orval', proficiency: 'advanced', sortOrder: 4 },
      { name: 'Biome', proficiency: 'intermediate', sortOrder: 5 },
    ],
  },
  {
    name: 'AI / ML',
    slug: 'ai-ml',
    sortOrder: 7,
    skills: [
      { name: 'YOLO', proficiency: 'beginner', sortOrder: 1 },
      { name: 'Microsoft Foundry AI', proficiency: 'beginner', sortOrder: 2 },
    ],
  },
];
