import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

/** Users Schema from Auth.js website */
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  stripeCustomerId: text("stripe_customer_id"),
  subscribed: boolean("subscribed"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

/** Forms Schema */
export const formElements = pgEnum("field_type", [
  "RadioGroup",
  "Select",
  "Input",
  "Textarea",
  "Switch",
]);

export const forms = pgTable("forms", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("userId").notNull(),
  published: boolean("published"),
});

export const questions = pgTable("questions", {
  id: serial("id").notNull().primaryKey(),
  question: text("question").notNull(),
  fieldType: formElements("fieldType"),
  formId: integer("form_id").notNull(),
});

export const fieldOptions = pgTable("field_options", {
  id: serial("id").notNull().primaryKey(),
  text: text("option"),
  value: text("value"),
  questionId: integer("question_id").notNull(),
});

/**
 * Forms Relations: Specifies how forms relate to other entities:
 * A form belongs to one user.
 * A form can have many questions.
 */
export const formRelations = relations(forms, ({ many, one }) => ({
  questions: many(questions), // many to one
  users: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }), // one to many
  submissions: many(formSubmissions),
}));

/**
 *  Questions Relations: Specifies how questions relate to other entities:
 *  A question belongs to one form.
 *  A question can have many field options.
 */
export const questionsRelations = relations(questions, ({ many, one }) => ({
  form: one(forms, {
    fields: [questions.formId],
    references: [forms.id],
  }),
  fieldOptions: many(fieldOptions), // one to many
  answers: many(answers),
}));

/**
 * Field Options Relations: Describes the relationship between field options and questions:
 * A field option belongs to one question.
 */
export const fieldOptionsRelations = relations(fieldOptions, ({ one }) => ({
  question: one(questions, {
    fields: [fieldOptions.questionId],
    references: [questions.id],
  }),
}));

/**
 * 
    Stores individual answers to questions within a form submission.
    Columns:
        id: A unique identifier for each answer.
        formSubmissionId: Links each answer to its corresponding form submission.
        questionId: Links each answer to the question it addresses.
        value: The text of the answer.
        fieldOptionsId: Optionally links each answer to predefined options for the question.

 */

export const answers = pgTable("answers", {
  id: serial("id").notNull().primaryKey(),
  formSubmissionId: integer("form_submission_id").notNull(),
  questionId: integer("question_id").notNull(),
  value: text("value"),
  fieldOptionsId: integer("field_options_id"),
});

/**
 * 
    answerRelations:
        Defines relationships between the answers table and other tables.
        Relationships:
            formSubmission: Each answer is linked to a form submission.
            question: Each answer is linked to a specific question.
            fieldOptions: Each answer can optionally be linked to predefined field options.

 */
export const answerRelations = relations(answers, ({ one }) => ({
  formSubmission: one(formSubmissions, {
    fields: [answers.formSubmissionId],
    references: [formSubmissions.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  fieldOptions: one(fieldOptions, {
    fields: [answers.fieldOptionsId],
    references: [fieldOptions.id],
  }),
}));

/**
 * 
    formSubmissions Table:
        Stores information about form submissions.
        Columns:
            id: A unique identifier for each form submission.
            formId: Links each submission to the form it was submitted to.

 */

export const formSubmissions = pgTable("formSubmissions", {
  id: serial("id").notNull().primaryKey(),
  formId: integer("form_id").notNull(),
});

/**
 * 
    formSubmissionRelations:
        Defines relationships between the formSubmissions table and other tables.
        Relationships:
            form: Each form submission is linked to a form.
            answers: Each form submission can have multiple answers.

 */
export const formSubmissionRelations = relations(
  formSubmissions,
  ({ one, many }) => ({
    form: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id],
    }),
    answers: many(answers),
  })
);
