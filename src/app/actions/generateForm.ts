"use server";
import { generateFormContent } from "@/lib/openai";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
    revalidatePath("/");
    console.log("Form Content");
    console.log(formContent);
    return {
      message: "Success",
      data: formContent,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate form",
    };
  }
}
