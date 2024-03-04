import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable");
  throw new Error("Missing DATABASE_URL environment variable");
}

console.log("DATABASE_URL", process.env.DATABASE_URL);
export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@localhost:5432/postgres",
  },
} satisfies Config;
