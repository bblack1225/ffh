"use server";
import { drizzle } from "@xata.io/drizzle";
import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";
import { and, gte, lt, lte } from "drizzle-orm";
import { formatToDateStr } from "@/utils/dateUtil";

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
    );
  return records;
}

export async function fetchRecordsByMonth(
  requestYear?: number,
  requestMonth?: number
) {
  const year = requestYear || new Date().getFullYear();
  const month = requestMonth || new Date().getMonth() + 1;

  const startDate = formatToDateStr(new Date(year, month - 1, 1));
  const endDate = formatToDateStr(new Date(year, month, 1));

  const records = await db
    .select()
    .from(transaction_record)
    .where(
      and(
        gte(transaction_record.transaction_date, startDate),
        lt(transaction_record.transaction_date, endDate)
      )
    );

  return records;
}
