import { auth } from "@/auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import ManageSubscription from "./ManageSubscription";
import { db } from "@/database";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session?.user?.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id),
  });

  const plan = user?.subscribed ? "Pro" : "Free";

  return (
    <div>
      You are currently on the {plan} plan
      <ManageSubscription />
    </div>
  );
}
