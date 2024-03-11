import { getSubscription } from "@/app/actions/userSubscriptions";
import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { MAX_FREE_FORMS } from "@/lib/constants";
import { eq } from "drizzle-orm";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import FormGenerator from "./FormGenerator";

export default async function UserSubscriptionWrapper() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return null;
  }

  const subscription = await getSubscription({ userId: session?.user?.id });
  const userForms = await db.query.forms.findMany({
    where: eq(users.id, session?.user?.id),
  });
  const userFormsCount = userForms.length;
  if (subscription === true || userFormsCount < MAX_FREE_FORMS) {
    return (
      <>
        <FormGenerator />
      </>
    );
  }

  return <Button disabled>Upgrade to create more forms</Button>;
}
