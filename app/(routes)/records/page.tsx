import MainContent from "@/components/records/mainContent";
// import fetchCategoriesByType from "@/lib/category/data";
import { fetchAllMembers } from "@/lib/members/data";
import { fetchRecordsByMonth } from "@/lib/records/data";
import { getCurrentDateString } from "@/utils/dateUtil";
// import { fetchRecordsAtDate, fetchRecordsBetweenDate } from "@/lib/records/data";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    year?: string;
    month?: string;
  };
}) {
  const { year, month } = searchParams;
  console.log("currentYear", year);
  console.log("currentMonth", month);
  const currentYear = year ? Number(year) : new Date().getFullYear();
  const currentMonth = month ? Number(month) : new Date().getMonth() + 1;

  const records = await fetchRecordsByMonth(currentYear, currentMonth);
  // console.log("records!!!!", records);

  // const data = await fetchAllMembers();
  // const category = await fetchCategoriesByType("OUT");
  // const records = await fetchRecordsBy();

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">收支紀錄</h1>
        <Link
          href="/records/create"
          className="bg-primary	py-1 text-white font-bold rounded-lg px-4 hover:bg-slate-950 shadow-md"
        >
          新增紀錄
        </Link>
      </div>
      <MainContent />
    </div>
  );
}
