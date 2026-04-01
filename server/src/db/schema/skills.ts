import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { proficiencyEnum } from './enums';

export const skillCategories = pgTable('SkillCategory', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const skills = pgTable('Skill', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  categoryId: text('categoryId').notNull(),
  technologyId: text('technologyId'),
  proficiency: proficiencyEnum('proficiency'),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
