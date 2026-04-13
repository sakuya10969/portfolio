import { z } from '@hono/zod-openapi';

// ── 共通エラー ──

export const apiErrorDetailSchema = z
  .object({
    message: z.string().openapi({ example: '入力内容に誤りがあります' }),
    code: z.string().openapi({ example: 'VALIDATION_ERROR' }),
  })
  .openapi('ApiErrorDetail');

export const apiErrorResponseSchema = z
  .object({ error: apiErrorDetailSchema })
  .openapi('ApiErrorResponse');

// ── Enum ──

export const socialPlatformSchema = z
  .enum(['github', 'twitter', 'linkedin', 'website', 'other'])
  .openapi('SocialPlatform');

export const projectLinkTypeSchema = z
  .enum(['github', 'demo', 'docs', 'other'])
  .openapi('ProjectLinkType');

export const experienceTypeSchema = z
  .enum(['work', 'education', 'activity'])
  .openapi('ExperienceType');

export const proficiencySchema = z
  .enum(['beginner', 'intermediate', 'advanced', 'expert'])
  .openapi('Proficiency');

// ── Profile ──

export const socialLinkSchema = z
  .object({
    id: z.string(),
    profileId: z.string(),
    platform: socialPlatformSchema,
    url: z.string(),
    sortOrder: z.number(),
  })
  .openapi('SocialLink');

export const profileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    avatarUrl: z.string().nullable(),
    socialLinks: z.array(socialLinkSchema),
  })
  .openapi('Profile');

// ── Project ──

export const projectCategorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    sortOrder: z.number(),
  })
  .openapi('ProjectCategory');

export const technologySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    iconUrl: z.string().nullable(),
    officialUrl: z.string().nullable(),
    sortOrder: z.number(),
  })
  .openapi('Technology');

export const projectLinkSchema = z
  .object({
    id: z.string(),
    projectId: z.string(),
    type: projectLinkTypeSchema,
    url: z.string(),
    label: z.string().nullable(),
    sortOrder: z.number(),
  })
  .openapi('ProjectLink');

export const projectSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    background: z.string(),
    architecture: z.string(),
    highlights: z.string(),
    challenges: z.string(),
    futureWork: z.string().nullable(),
    thumbnailUrl: z.string().nullable(),
    isPublished: z.boolean(),
    sortOrder: z.number(),
    categoryId: z.string(),
    category: projectCategorySchema,
    links: z.array(projectLinkSchema),
    technologies: z.array(technologySchema),
  })
  .openapi('Project');

// ── Skill ──

export const skillSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    categoryId: z.string(),
    technologyId: z.string().nullable(),
    proficiency: proficiencySchema.nullable(),
    sortOrder: z.number(),
    technology: technologySchema.nullable(),
  })
  .openapi('Skill');

export const skillCategoryWithSkillsSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    sortOrder: z.number(),
    skills: z.array(skillSchema),
  })
  .openapi('SkillCategoryWithSkills');

// ── Experience ──

export const experienceSchema = z
  .object({
    id: z.string(),
    type: experienceTypeSchema,
    organization: z.string(),
    role: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    sortOrder: z.number(),
  })
  .openapi('Experience');

// ── Contact ──

export const contactRequestSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ example: 'Sakuya' }),
    email: z.string().email().openapi({ example: 'sakuya@example.com' }),
    subject: z.string().min(1).max(200).openapi({ example: 'ポートフォリオについて' }),
    message: z.string().min(1).max(2000).openapi({ example: 'プロジェクトの詳細について相談したいです。' }),
  })
  .openapi('ContactRequest');

export const contactCreateResponseSchema = z
  .object({ data: z.object({ success: z.literal(true) }) })
  .openapi('ContactCreateResponse');

// ── 共通エンベロープヘルパー ──

export function dataEnvelope<T extends z.ZodTypeAny>(schema: T, name: string) {
  return z.object({ data: schema }).openapi(name);
}

// ── OpenAPI ドキュメント設定 ──

export const openAPIDocumentConfig = {
  openapi: '3.0.0' as const,
  info: {
    title: 'Portfolio API',
    version: '1.0.0',
    description: 'ポートフォリオサイトの API。Orval で型安全なクライアントを自動生成する。',
  },
};
