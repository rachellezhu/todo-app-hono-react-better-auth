import "./compression-polyfill"; // comment or remove this line if you face error while running drizzle studio
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/db/migrations/drizzle",
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
