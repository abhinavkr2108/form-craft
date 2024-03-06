"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import {
  forms,
  questions as dbQuestions,
  fieldOptions,
} from "@/database/schema";
import { eq } from "drizzle-orm";

type FieldType = "RadioGroup" | "Select" | "Input" | "Textarea" | "Switch";
interface Question {
  id: string;
  text: string;
  fieldType: FieldType;
  fieldOptions?: { text: string; value: string }[];
}

interface SaveFormData {
  name: string;
  description: string;
  questions: Question[];
}

export async function saveForm(data: SaveFormData) {
  try {
    const { name, description, questions } = data;
    const session = await auth();
    const userId = session?.user?.id;

    console.log("DATA FROM GENERATE FORM");
    console.log({ data });

    const newForm = await db
      .insert(forms)
      .values({
        name: name as string,
        description: description as string,
        userId: userId as string,
        published: false,
      })
      .returning({ insertedId: forms.id });

    const formId = newForm[0].insertedId;

    const newQuestions = data.questions.map((question) => {
      console.log("New questions => ");
      console.log(question.text);
      console.log(question.fieldType);
      console.log(question.fieldOptions);
      return {
        question: question.text,
        fieldType: question.fieldType as FieldType,
        fieldOptions: question.fieldOptions,
        formId: formId,
      };
    });

    await db.transaction(async (tx) => {
      for (const question of newQuestions) {
        const [{ questionId }] = await tx
          .insert(dbQuestions)
          .values(question)
          .returning({ questionId: dbQuestions.id });

        if (question.fieldOptions && question.fieldOptions.length > 0) {
          await tx.insert(fieldOptions).values(
            question.fieldOptions.map((option) => {
              return {
                text: option.text,
                value: option.value,
                questionId: questionId,
              };
            })
          );
        }
        console.log("Question ID");
        console.log(questionId);
      }
    });
    return formId;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to save form",
      error: error,
    };
  }
}

export async function publishForm(formId: number) {
  try {
    await db.update(forms).set({ published: true }).where(eq(forms.id, formId));
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to publish form",
      error: error,
    };
  }
}
