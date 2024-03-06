"use client";
import {
  FieldSelectModel,
  FormSelectModel,
  QuestionSelectModel,
} from "@/types/form-types";
import React, { useState } from "react";

import {
  Form as ShadCnForm,
  FormField as ShadCnFormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import FormField from "./FormField";
import { publishForm } from "@/app/actions/mutateForm";
import FormPublishToast from "./FormPublishToast";
import { submitForm } from "@/app/actions/submitForm";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SingleFormProps {
  form: Form;
  editMode?: boolean;
}

interface Form extends FormSelectModel {
  questions: Array<
    QuestionSelectModel & {
      fieldOptions: Array<FieldSelectModel>;
    }
  >;
}

//element error resolve
type QuestionsWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldSelectModel>;
};

export type Answer = {
  questionId: number;
  value?: string | null;
  fieldOptionsId?: number | null;
};
export default function SingleForm(props: SingleFormProps) {
  const form = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const formData = props.form;

  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (props.editMode) {
      await publishForm(formData.id);
      setOpenDialog(true);
    } else {
      let answers = [];
      for (const [questionId, value] of Object.entries(data)) {
        const id = parseInt(questionId.replace("Question-", ""));

        let fieldOptionsId = null;
        let textValue = null;
        if (typeof value === "string" && value.includes("answerId_")) {
          fieldOptionsId = parseInt(value.replace("answerId_", ""));
        } else {
          textValue = value as string;
        }

        answers.push({
          questionId: id,
          fieldOptionsId,
          value: textValue,
        });
      }

      const response = await axios.post("/api/form/new", {
        formId: formData.id,
        answers: answers,
      });

      if (response.status === 200) {
        router.push(`/form/success`);
      } else {
        alert("Failed to submit form");
      }
    }
    console.log(data);
  };

  const onOpenChange = (open: boolean) => {
    setOpenDialog(open);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{formData.name}</h1>
      <h3 className="text-gray-500 font-semibold">{formData.description}</h3>

      <ShadCnForm {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl place-content-center my-4 gap-4"
        >
          {formData.questions.map(
            (question: QuestionsWithOptionsModel, index) => (
              <ShadCnFormField
                control={form.control}
                name={`Question-${question.id}`}
                key={question.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {index + 1}
                      {":"}
                      {question.question}
                    </FormLabel>
                    <FormControl>
                      <FormField
                        element={question}
                        key={question.id}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          )}
          <Button type="submit">{props.editMode ? "Publish" : "Submit"}</Button>
        </form>
      </ShadCnForm>

      <FormPublishToast
        formId={formData.id}
        open={openDialog}
        setOpen={() => onOpenChange(!openDialog)}
      />
    </div>
  );
}
