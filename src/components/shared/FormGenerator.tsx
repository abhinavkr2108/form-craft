"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { generateForm } from "@/app/actions/generateForm";
import { useFormState, useFormStatus } from "react-dom";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { navigate } from "@/app/actions/navigateToForm";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};
export default function FormGenerator() {
  const [open, setOpen] = useState<boolean>(false);

  const [state, formAction] = useFormState(generateForm, initialState);
  const session = useSession();

  useEffect(() => {
    if (state.message === "Success") {
      setOpen(false);
      navigate(state.data.formId);
    }
  }, [state.message, state.data]);
  console.log(state.data);

  const onFormCreate = () => {
    if (session?.data?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={onFormCreate}>Create Form</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <Textarea
            id="description"
            name="description"
            required={true}
            placeholder="Enter Form Description and let AI do the magic"
          />

          <DialogFooter>
            <SubmitButton />
            <Button variant={"link"}>Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
