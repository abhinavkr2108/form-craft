import { auth } from "@/auth";
import { db } from "@/database";
import { forms } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getUserForms() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return [];
    }

    const userForms = await db
      .select()
      .from(forms)
      .where(eq(forms.userId, userId));

    const usersForms = await db.query.forms.findMany({
      where: eq(forms.userId, userId),
    });
    return usersForms;
  } catch (error) {
    console.error(error);
    // return {
    //   message: "Failed to retrieve form",
    // };
  }
}
