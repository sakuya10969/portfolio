CREATE TYPE "public"."ExperienceType" AS ENUM('work', 'education', 'activity');--> statement-breakpoint
CREATE TYPE "public"."Proficiency" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');--> statement-breakpoint
CREATE TYPE "public"."ProjectLinkType" AS ENUM('github', 'demo', 'docs', 'other');--> statement-breakpoint
CREATE TYPE "public"."SocialPlatform" AS ENUM('github', 'twitter', 'linkedin', 'website', 'other');--> statement-breakpoint
CREATE TABLE "Profile" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"bio" text NOT NULL,
	"avatarUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SocialLink" (
	"id" text PRIMARY KEY NOT NULL,
	"profileId" text NOT NULL,
	"platform" "SocialPlatform" NOT NULL,
	"url" text NOT NULL,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectCategory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ProjectCategory_name_unique" UNIQUE("name"),
	CONSTRAINT "ProjectCategory_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ProjectLink" (
	"id" text PRIMARY KEY NOT NULL,
	"projectId" text NOT NULL,
	"type" "ProjectLinkType" NOT NULL,
	"url" text NOT NULL,
	"label" text,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectTechnology" (
	"projectId" text NOT NULL,
	"technologyId" text NOT NULL,
	CONSTRAINT "ProjectTechnology_projectId_technologyId_pk" PRIMARY KEY("projectId","technologyId")
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"background" text NOT NULL,
	"architecture" text NOT NULL,
	"highlights" text NOT NULL,
	"challenges" text NOT NULL,
	"futureWork" text,
	"thumbnailUrl" text,
	"isPublished" boolean DEFAULT false NOT NULL,
	"sortOrder" integer NOT NULL,
	"categoryId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Project_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Technology" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"iconUrl" text,
	"officialUrl" text,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Technology_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "SkillCategory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "SkillCategory_name_unique" UNIQUE("name"),
	CONSTRAINT "SkillCategory_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Skill" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"categoryId" text NOT NULL,
	"technologyId" text,
	"proficiency" "Proficiency",
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Experience" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "ExperienceType" NOT NULL,
	"organization" text NOT NULL,
	"role" text NOT NULL,
	"description" text NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp,
	"sortOrder" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Contact" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
