import { pgTable, text, integer, boolean, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { projectLinkTypeEnum } from './enums';

export const projectCategories = pgTable('ProjectCategory', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const projects = pgTable('Project', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  background: text('background').notNull(),
  architecture: text('architecture').notNull(),
  highlights: text('highlights').notNull(),
  challenges: text('challenges').notNull(),
  futureWork: text('futureWork'),
  thumbnailUrl: text('thumbnailUrl'),
  isPublished: boolean('isPublished').notNull().default(false),
  sortOrder: integer('sortOrder').notNull(),
  categoryId: text('categoryId').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const projectLinks = pgTable('ProjectLink', {
  id: text('id').primaryKey(),
  projectId: text('projectId').notNull(),
  type: projectLinkTypeEnum('type').notNull(),
  url: text('url').notNull(),
  label: text('label'),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const technologies = pgTable('Technology', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  iconUrl: text('iconUrl'),
  officialUrl: text('officialUrl'),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const projectTechnologies = pgTable(
  'ProjectTechnology',
  {
    projectId: text('projectId').notNull(),
    technologyId: text('technologyId').notNull(),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.technologyId] })],
);
