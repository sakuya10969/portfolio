import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { socialPlatformEnum } from './enums';

export const profiles = pgTable('Profile', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  avatarUrl: text('avatarUrl'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const socialLinks = pgTable('SocialLink', {
  id: text('id').primaryKey(),
  profileId: text('profileId').notNull(),
  platform: socialPlatformEnum('platform').notNull(),
  url: text('url').notNull(),
  sortOrder: integer('sortOrder').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
