import MainContent from "@/components/records/mainContent";
// import fetchCategoriesByType from "@/lib/category/data";
import { fetchAllMembers } from "@/lib/members/data";
import { fetchRecordsByMonth } from "@/lib/records/data";
import { getCurrentDateString } from "@/utils/dateUtil";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import { fetchRecordsAtDate, fetchRecordsBetweenDate } from "@/lib/records/data";
import Link from "next/link";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["records"],
    queryFn: () => fetchRecordsByMonth(2024, 5),
  });

  // const records = await fetchRecordsByMonth(2024, 5);
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainContent />
      </HydrationBoundary>
    </div>
  );
}
