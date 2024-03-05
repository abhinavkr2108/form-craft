import { db } from "@/database";
import React from "react";
import { forms } from "@/database/schema";
import { eq } from "drizzle-orm";

interface FormDetailPageProps {
  params: {
    formId: string;
  };
}
export default async function FormDetailPage(props: FormDetailPageProps) {
  const formId = props.params.formId;
  if (!formId) {
    return <div>Form Not Found</div>;
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  console.log(form);
  return <div>FormDetailPage: {props.params.formId}</div>;
}
