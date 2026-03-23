export type SkillCategory = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  skills: Skill[];
};

export type Skill = {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert" | null;
  sortOrder: number;
  technology: {
    id: string;
    name: string;
    iconUrl: string | null;
  } | null;
};
