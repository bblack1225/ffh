"use server";
import { drizzle } from "@xata.io/drizzle";
import { desc, eq } from "drizzle-orm";
import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";
import { XataFile } from "@xata.io/client";
import { z } from "zod";

export type State = {
  errors?: {
    // category_id?: string[];
    // transaction_date?: string[];
    // member_id?: string[];
    // book_id?: string[];
    // description?: string[];
    category?: string[];
    amount?: string[];
    member?: string[];
    // images: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  amount: z.coerce.number().gt(0, { message: "金額必須大於0" }),
  member: z.string({
    invalid_type_error: "請選擇成員",
  }),
});

const xata = getXataClient();

const transaction_record = pgTable("transaction_record", {
  id: text("id").primaryKey(),
  amount: integer("amount"),
  category_id: text("category_id"),
  transaction_date: date("transaction_date"),
  member_id: text("member_id"),
  book_id: text("book_id"),
  description: text("description"),
  type: text("type"),
});

const db = drizzle(xata);

export async function fetchAllRecords() {
  const record = await db.select().from(transaction_record).execute();
  return record;
}

const CreateRecord = FormSchema.omit({ id: true, description: true });

export async function createRecord(prevState: State, formData: FormData) {
  console.log("formData", formData);

  const validatedData = CreateRecord.safeParse({
    amount: formData.get("amount"),
    type: formData.get("type"),
    // description: formData.get("description"),
    member_id: formData.get("member"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Error!",
    };
  }

  // const record = await xata.db.transaction_record.create({
  //   amount: 3,
  //   category_id: "rec_xyz",
  //   transaction_date: new Date("2000-01-01T00:00:00Z"),
  //   member_id: "rec_xyz",
  //   book_id: "rec_xyz",
  //   description: "string",
  //   type: "string",
  //   images: [XataFile.fromBase64("SGVsbG8gV29ybGQ=")],
  // });
  return { message: "test" };
}
