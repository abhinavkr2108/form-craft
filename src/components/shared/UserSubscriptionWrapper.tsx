import { getSubscription } from "@/app/actions/userSubscriptions";
import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { MAX_FREE_FORMS } from "@/lib/constants";
import { eq } from "drizzle-orm";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

export default async function UserSubscriptionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    signIn();
    return null;
  }

  const subscription = await getSubscription({ userId: session?.user?.id });
  const userForms = await db.query.forms.findMany({
    where: eq(users.id, session?.user?.id),
  });
  const userFormsCount = userForms.length;
  if (subscription === true || userFormsCount < MAX_FREE_FORMS) {
    return <>{children}</>;
  }

  return <Button disabled>Upgrade to create more forms</Button>;
}
