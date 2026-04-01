import { relations } from 'drizzle-orm';
import { profiles, socialLinks } from './profiles';
import {
  projectCategories,
  projects,
  projectLinks,
  technologies,
  projectTechnologies,
} from './projects';
import { skillCategories, skills } from './skills';

export const profilesRelations = relations(profiles, ({ many }) => ({
  socialLinks: many(socialLinks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  profile: one(profiles, {
    fields: [socialLinks.profileId],
    references: [profiles.id],
  }),
}));

export const projectCategoriesRelations = relations(projectCategories, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  category: one(projectCategories, {
    fields: [projects.categoryId],
    references: [projectCategories.id],
  }),
  links: many(projectLinks),
  technologies: many(projectTechnologies),
}));

export const projectLinksRelations = relations(projectLinks, ({ one }) => ({
  project: one(projects, {
    fields: [projectLinks.projectId],
    references: [projects.id],
  }),
}));

export const technologiesRelations = relations(technologies, ({ many }) => ({
  projects: many(projectTechnologies),
  skills: many(skills),
}));

export const projectTechnologiesRelations = relations(projectTechnologies, ({ one }) => ({
  project: one(projects, {
    fields: [projectTechnologies.projectId],
    references: [projects.id],
  }),
  technology: one(technologies, {
    fields: [projectTechnologies.technologyId],
    references: [technologies.id],
  }),
}));

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
  technology: one(technologies, {
    fields: [skills.technologyId],
    references: [technologies.id],
  }),
}));
