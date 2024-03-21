import { drizzle } from "@xata.io/drizzle";
import { eq } from "drizzle-orm";
import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";

const xata = getXataClient();

const transaction_record = pgTable("transaction_record", {
  id: text("id").primaryKey(),
  amount: integer("amount"),
  catrgory_id: text("catrgory_id"),
  transaction_date: date("transaction_date"),
  member_id: text("member_id"),
  book_id: text("book_id"),
  description: text("description"),
  type: text("type"),
});

const db = drizzle(xata);

export async function fetchAllRecords() {
  const record = await db.select().from(transaction_record).execute();
  console.log("record", record);
  return record;
}
