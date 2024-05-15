"use server";
import { drizzle } from "@xata.io/drizzle";
import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";
import { XataFile } from "@xata.io/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    date?: string[];
    category?: string[];
    amount?: string[];
    member?: string[];
    image?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  category: z.string().min(1, { message: "請選擇類別" }),
  description: z.string(),
  amount: z.coerce.number().gt(0, { message: "金額必須大於0" }),
  member: z.string().min(1, { message: "請選擇成員" }),
  date: z.string().min(1, { message: "請選擇日期" }),
  image: z.custom<File>(),
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

const CreateRecord = FormSchema.omit({ id: true });

export async function createRecord(prevState: State, formData: FormData) {
  const validatedData = CreateRecord.safeParse({
    amount: formData.get("amount"),
    category: formData.get("category"),
    description: formData.get("description"),
    member: formData.get("member"),
    date: formData.get("date"),
    image: formData.get("image"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Error!",
    };
  }

  const { amount, category, member, date, description, image } =
    validatedData.data;
  const transactionDate = new Date(date);

  try {
    const record = await xata.db.transaction_record.create({
      amount,
      category_id: category,
      transaction_date: transactionDate,
      member_id: member,
      book_id: "rec_cngt7uudo4p4h81ufnmg",
      description,
      type: "OUT",
      images: image.size > 0 ? [XataFile.fromBlob(image)] : [],
    });
  } catch (e) {
    console.error("createRecord error", e);
    return { message: "Database Error: Failed to create record" };
  }

  revalidatePath("/records");
  redirect("/records");
}

export async function createEmptyRecord() {
  const record = await xata.db.transaction_record.create(
    {
      images: [{ name: "", mediaType: "image/*", base64Content: "" }],
    },
    ["images.uploadUrl"]
  );
  if (!record.images) {
    return { message: "Failed to create record" };
  }
  return { myUploadUrl: record.images[0].uploadUrl };
}
