"use server";
import { generateFormContent } from "@/lib/openai";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveForm } from "./mutateForm";

export async function generateForm(
  prevState: { message: string },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(1),
  });

  // Parse description
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  //Error Handling
  if (!parse.success) {
    console.error(parse.error);
    return {
      message: "Failed to parse data",
    };
  }

  const { data } = parse;

  try {
    const formContent = await generateFormContent(data.description);

    const dbFormId = await saveForm({
      name: JSON.parse(formContent.choices[0].message.content).name,
      description: JSON.parse(formContent.choices[0].message.content)
        .description,
      questions: JSON.parse(formContent.choices[0].message.content).questions,
    });
    revalidatePath("/");

    return {
      message: "Success",
      data: { formId: dbFormId as number },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate form",
    };
  }
}
