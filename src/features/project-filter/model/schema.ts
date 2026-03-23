import { z } from 'zod/v3';

export const projectFilterSchema = z.object({
  category: z.string().optional(),
  technology: z.string().optional(),
});

export type ProjectFilterValues = z.infer<typeof projectFilterSchema>;
