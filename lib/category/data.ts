import { drizzle } from "@xata.io/drizzle";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";

const xata = getXataClient();

const transaction_category = pgTable("transaction_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  type: text("type").notNull(),
  book_id: text("book_id").notNull(),
});

const db = drizzle(xata);

export async function fetchCategoriesByType(type: "OUT" | "IN") {
  const record = await db
    .select()
    .from(transaction_category)
    .where(eq(transaction_category.type, type))
    .execute();
  console.log(record);
  return record;
}

export async function fetchAllCategories() {
  const records = await db.select().from(transaction_category).execute();
  const inCategories = records.filter((record) => record.type === "IN");
  const outCategories = records.filter((record) => record.type === "OUT");

  return { inCategories, outCategories };
}
