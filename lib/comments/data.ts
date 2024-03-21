import { drizzle } from "@xata.io/drizzle";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";

const xata = getXataClient();

const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  content: text("content"),
  member_id: text("member_id"),
  book_id: text("book_id"),
});

const db = drizzle(xata);

export async function fetchAllComments() {
  const record = await db.select().from(comments).execute();
  console.log("record", record);
  return record;
}
