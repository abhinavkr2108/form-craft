"use server";
import { redirect } from "next/navigation";

export async function navigate(formId: number) {
  redirect(`/form/edit/${formId}`);
}
