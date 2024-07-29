import MainContent from "@/components/records/mainContent";
import { fetchAllCategories } from "@/lib/category/data";
import { fetchAllMembers } from "@/lib/members/data";
import {
  fetchRecordsBetweenDate,
  fetchRecordsByMonth,
} from "@/lib/records/data";
import { getCalendarRange } from "@/utils/dateUtil";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    year?: string;
    month?: string;
  };
}) {
  const year = Number(searchParams?.year) || new Date().getFullYear();
  const month = Number(searchParams?.month) || new Date().getMonth() + 1;
  console.log("searchParams", searchParams);

  const { start, end } = getCalendarRange(year, month);
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["records"],
  //   queryFn: () => fetchRecordsByMonth(),
  // });
  const categories = await fetchAllCategories();
  const members = await fetchAllMembers();
  const records = await fetchRecordsBetweenDate(start, end);
  console.log("records", records);

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-2xl font-bold">收支紀錄</h1>
        <Link
          href="/records/create"
          className="bg-primary	py-1 text-white font-bold rounded-lg px-4 hover:bg-slate-950 shadow-md"
        >
          新增紀錄
        </Link>
      </div>
      {/* <Suspense key={year + month} fallback={<div>Loading...</div>}> */}
      <MainContent
        categories={categories}
        members={members}
        records={records}
      />
      {/* <Table start={start} end={end} /> */}
      {/* </Suspense> */}
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      {/* <MainContent
        categories={categories}
        members={members}
        records={records}
      /> */}
      {/* </HydrationBoundary> */}
    </div>
  );
}

// export async function Table({ start, end }: { start: string; end: string }) {
//   const categories = await fetchAllCategories();
//   const members = await fetchAllMembers();
//   const records = await fetchRecordsBetweenDate(start, end);
//   return (
//     // <Suspense key={start + end} fallback={<div>Loading...</div>}>
//     <MainContent categories={categories} members={members} records={records} />
//     // </Suspense>
//   );
// }
