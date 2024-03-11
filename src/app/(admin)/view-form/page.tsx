import { getUserForms } from "@/app/actions/getUserForm";
import { auth } from "@/auth";
import FormsList from "./components/FormList";
import Navbar from "@/components/shared/Sidenav";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { MAX_FREE_FORMS } from "@/lib/constants";

export default async function ViewFormPage() {
  const forms = await getUserForms();

  if (!forms) {
    return <div>Form Not Found</div>;
  }

  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>;
  }
  return (
    <SessionProvider>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">Your Forms Here</h1>
        <p className="font-semibold text-gray-500 text-lg text-center mt-4">
          {forms.length} forms genearted out of {MAX_FREE_FORMS} forms
        </p>
        <FormsList forms={forms} />
      </div>
    </SessionProvider>
  );
}
