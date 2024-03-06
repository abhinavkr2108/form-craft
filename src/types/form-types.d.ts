import { forms, questions, fieldOptions } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type FormSelectModel = InferSelectModel<typeof forms>;
export type QuestionSelectModel = InferSelectModel<typeof questions>;
export type FieldSelectModel = InferSelectModel<typeof fieldOptions>;
