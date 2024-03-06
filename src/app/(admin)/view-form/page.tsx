import { getUserForms } from "@/app/actions/getUserForm";
import { auth } from "@/auth";
import FormsList from "@/components/shared/FormsList";
import Navbar from "@/components/shared/Sidenav";
import { SessionProvider } from "next-auth/react";
import React from "react";

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
        <h1 className="text-2xl font-bold text-center py-8">Your Forms Here</h1>
        <FormsList forms={forms} />
      </div>
    </SessionProvider>
  );
}
