import { db } from "@/database";
import { formSubmissions, answers as dbAnswers } from "@/database/schema";

export async function POST(req: Request, res: Response): Promise<Response> {
  try {
    const body = await req.json();
    const newFormSubmission = await db
      .insert(formSubmissions)
      .values({
        formId: body.formId,
      })
      .returning({ insertedId: formSubmissions.id });

    const [{ insertedId }] = newFormSubmission;

    await db.transaction(async (tx) => {
      for (const answer of body.answers) {
        const [{ answerId }] = await tx
          .insert(dbAnswers)
          .values({ formSubmissionId: insertedId, ...answer })
          .returning({ answerId: dbAnswers.id });
      }
    });
    return Response.json({ formSubmissionsId: insertedId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
