import { fetchRecordsByMonth } from "@/lib/records/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const monthQuery = searchParams.get("month");
  const yearQuery = searchParams.get("year");
  const currentYear = yearQuery ? Number(yearQuery) : new Date().getFullYear();
  const currentMonth = monthQuery
    ? Number(monthQuery)
    : new Date().getMonth() + 1;
  const records = await fetchRecordsByMonth(currentYear, currentMonth);
  console.log("records in route handler", records);
  return Response.json({ data: records });
}
