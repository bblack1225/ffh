import { drizzle } from "@xata.io/drizzle";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";

const xata = getXataClient();

const transaction_category = pgTable("transaction_category", {
  id: text("id").primaryKey(),
  name: text("name"),
  icon: text("icon"),
  type: text("type"),
  book_id: text("book_id"),
});

const db = drizzle(xata);

export default async function fetchCategoriesByType(type: "OUT" | "IN") {
  const record = await db
    .select()
    .from(transaction_category)
    .where(eq(transaction_category.type, type))
    .execute();
  console.log(record);
  return record;
}
