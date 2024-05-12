import { drizzle } from "@xata.io/drizzle";
import { eq } from "drizzle-orm";
import { pgTable, text, integer } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";

const xata = getXataClient();

const member = pgTable("member", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  book_id: text("book_id").notNull(),
  email: text("email").notNull(),
  share: integer("share").notNull(),
});

const db = drizzle(xata);

export async function fetchAllMembers() {
  const record = await db.select().from(member).execute();
  console.log("record", record);
  return record;
}
