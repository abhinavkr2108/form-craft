import FormGenerator from "@/components/shared/FormGenerator";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { db } from "@/database";
import FormsList from "@/components/shared/FormsList";

export default async function Home() {
  const forms = await db.query.forms.findMany();
  return (
    <SessionProvider>
      <Header />
      <div className="container mx-auto">
        <FormGenerator />
        <FormsList forms={forms} />
      </div>
    </SessionProvider>
  );
}
