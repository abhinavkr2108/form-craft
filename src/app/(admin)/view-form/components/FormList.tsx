import { forms } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Form = InferSelectModel<typeof forms>;
interface FormsListProps {
  forms: Form[];
}
export default function FormsList({ forms }: FormsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {forms.map((form: Form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle>{form.name}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>

          <CardFooter>
            <Link href={`/form/${form.id}`} className="w-full">
              <Button className="w-full">View Form</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
