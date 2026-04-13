import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.local";

config({ path: envFile });

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
