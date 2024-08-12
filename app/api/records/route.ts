import { fetchRecordsByMonth, fetchRecordsByMonth2 } from "@/lib/records/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startQuery = searchParams.get("start");
  const endQuery = searchParams.get("end");

  const records = await fetchRecordsByMonth2(startQuery, endQuery);
  return Response.json({ data: records });
}
