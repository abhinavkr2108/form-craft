import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function createSubscription({ userId }: { userId: string }) {
  await db.update(users).set({ subscribed: true }).where(eq(users.id, userId));
}

export async function deleteSubscription({ userId }: { userId: string }) {
  await db.update(users).set({ subscribed: false }).where(eq(users.id, userId));
}

export async function getSubscription({ userId }: { userId: string }) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user?.subscribed;
}
