"use server";
import { drizzle } from "@xata.io/drizzle";
import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
// Generated with CLI
import { getXataClient } from "@/utils/xata";
import { and, asc, gte, lt, lte } from "drizzle-orm";
import { getCalendarRange } from "@/utils/dateUtil";

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
  console.log("records", records);

  return records;
}

export async function fetchRecordsByMonth2(
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

  const data = await xata.db.transaction_record
    .filter({
      $all: [
        {
          id: "rec_cqsoj9ndjp8e3j9aapqg",
        },
        {
          transaction_date: {
            $ge: new Date(startDate),
            $le: new Date(endDate),
          },
        },
      ],
    })
    .sort("transaction_date", "asc")
    .getMany();
  const records = data.toSerializable();
  console.log("records", records);

  return records;
}
