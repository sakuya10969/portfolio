import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { experienceTypeEnum } from './enums';

export const experiences = pgTable('Experience', {
  id: text('id').primaryKey(),
  type: experienceTypeEnum('type').notNull(),
  organization: text('organization').notNull(),
  role: text('role').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate'),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
