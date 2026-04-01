import { pgEnum } from 'drizzle-orm/pg-core';

export const socialPlatformEnum = pgEnum('SocialPlatform', [
  'github',
  'twitter',
  'linkedin',
  'website',
  'other',
]);

export const projectLinkTypeEnum = pgEnum('ProjectLinkType', [
  'github',
  'demo',
  'docs',
  'other',
]);

export const experienceTypeEnum = pgEnum('ExperienceType', [
  'work',
  'education',
  'activity',
]);

export const proficiencyEnum = pgEnum('Proficiency', [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);
