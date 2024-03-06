"use server";

import { db } from "@/database";
import { formSubmissions, answers as dbAnswers } from "@/database/schema";

interface SubmitFormData {
  formId: number;
  answers: {
    questionId: number;
    value?: string | null;
    fieldOptionsId?: number | null;
  }[];
}

export async function submitForm({ formId, answers }: SubmitFormData) {
  try {
    const newFormSubmission = await db
      .insert(formSubmissions)
      .values({
        formId,
      })
      .returning({ insertedId: formSubmissions.id });

    const [{ insertedId }] = newFormSubmission;

    await db.transaction(async (tx) => {
      for (const answer of answers) {
        // const {questionId, value, fieldOptions} = answer;
        await tx
          .insert(dbAnswers)
          .values({
            formSubmissionId: insertedId,
            questionId: answer.questionId,
            value: answer.value,
            fieldOptionsId: answer.fieldOptionsId,
          })
          .returning({ answerId: dbAnswers.id });
      }
    });

    return {
      message: "Success",
      insertedId: insertedId,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Fail",
      error: error,
    };
  }
}
