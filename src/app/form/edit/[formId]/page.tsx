import { db } from "@/database";
import React from "react";
import { forms } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import SingleForm from "@/components/shared/SingleForm";

interface FormDetailPageProps {
  params: {
    formId: string;
  };
}
export default async function FormDetailPage(props: FormDetailPageProps) {
  const formId = props.params.formId;
  const session = await auth();

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

  if (!form) {
    return <div>Form Not Found</div>;
  }

  if (form?.userId !== session?.user?.id) {
    return <div>Unauthorized</div>;
  }
  return (
    <div>
      <SingleForm form={form} editMode={true} />
    </div>
  );
}
