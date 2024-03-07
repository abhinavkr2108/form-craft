import { getUserForms } from "@/app/actions/getUserForm";
import FormPicker from "@/components/shared/FormPicker";
import { forms } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import Table from "./components/Table";
import ResultsDisplay from "./components/ResultsDisplay";

interface ResultsPageProps {
  searchParams: {
    formId?: string;
  };
}
export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const userForms = await getUserForms();

  if (!userForms?.length || userForms.length === 0) {
    return <div>Form Not Found</div>;
  }

  const selectOptions = userForms.map((form) => {
    return {
      value: form.id,
      label: form.name,
    };
  });
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Results</h1>

      <div className="container mx-auto">
        <FormPicker options={selectOptions} />
        <ResultsDisplay
          formId={
            searchParams?.formId
              ? parseInt(searchParams.formId as string)
              : userForms[0].id
          }
        />
      </div>
    </div>
  );
}
