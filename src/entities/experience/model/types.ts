export type Experience = {
  id: string;
  type: "work" | "education" | "activity";
  organization: string;
  role: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  sortOrder: number;
};
