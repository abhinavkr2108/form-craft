import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function FormSubmitPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="shadow-lg max-w-xl">
        <CardHeader>
          <CardTitle>Form Submitted</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p className="text-lg font-semibold">
              Thank you for filling the form. Your form has been submitted
              successfully!
            </p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Home </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
