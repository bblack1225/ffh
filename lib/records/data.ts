"use server";
import { drizzle } from "@xata.io/drizzle";
import { pgTable, integer, text, date, pgEnum } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";
import { and, asc, gte, lt, lte } from "drizzle-orm";
import { getCalendarRange } from "@/utils/dateUtil";

const xata = getXataClient();

export const typeEnum = pgEnum("type", ["IN", "OUT"]);

const transaction_record = pgTable("transaction_record", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  category_id: text("category_id").notNull(),
  transaction_date: date("transaction_date").notNull(),
  member_id: text("member_id").notNull(),
  book_id: text("book_id").notNull(),
  description: text("description"),
  type: typeEnum("type").notNull(),
});

const db = drizzle(xata);

export async function fetchAllRecords() {
  const record = await db.select().from(transaction_record).execute();
  return record;
}

export async function fetchRecordsBetweenDate(
  startDate: string,
  endDate: string
) {
  const records = await db
    .select()
    .from(transaction_record)
    .where(
      and(
        gte(transaction_record.transaction_date, startDate),
        lte(transaction_record.transaction_date, endDate)
      )
    )
    .orderBy(asc(transaction_record.transaction_date));
  return records;
}

export async function fetchRecordsByMonth(
  start?: string | null,
  end?: string | null
) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  let startDate;
  let endDate;
  if (start && end) {
    startDate = start;
    endDate = end;
  } else {
    const { start: startRange, end: endRange } = getCalendarRange(year, month);
    startDate = startRange;
    endDate = endRange;
  }

  const records = await db
    .select()
    .from(transaction_record)
    .where(
      and(
        gte(transaction_record.transaction_date, startDate),
        lte(transaction_record.transaction_date, endDate)
      )
    )
    .orderBy(asc(transaction_record.transaction_date));

  return records;
}
