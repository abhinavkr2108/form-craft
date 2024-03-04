import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL environment variable");
  throw new Error("Missing DATABASE_URL environment variable");
}
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
