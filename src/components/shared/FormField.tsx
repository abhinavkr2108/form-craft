import { QuestionSelectModel } from "@/types/form-types";
import React from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldSelectModel } from "@/types/form-types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FormControl } from "../ui/form";
import { Label } from "../ui/label";

interface FormFieldProps {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldSelectModel>;
  };
  value: string;
  onChange: (value: string) => void;
}
export default function FormField({
  element,
  value,
  onChange,
}: FormFieldProps) {
  if (!element) {
    return null;
  }

  const components = {
    Input: () => (
      <Input type="text" onChange={(e) => onChange(e.target.value)} />
    ),
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <div>
            {element.fieldOptions.map((option) => (
              <SelectItem key={option.value} value={`answerId_${option.id}`}>
                {option.text}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    ),

    RadioGroup: () => (
      <RadioGroup onValueChange={onChange}>
        {element.fieldOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <FormControl>
              <RadioGroupItem
                key={option.id}
                value={`answerId_${option.id}`}
                id={option.value?.toString()}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label htmlFor={option.value?.toString()}>{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };
  if (element.fieldType) {
    return components[element.fieldType]();
  } else {
    return null;
  }

  //   return components[element.fieldType] ? components[element.fieldType]() : null;
}
