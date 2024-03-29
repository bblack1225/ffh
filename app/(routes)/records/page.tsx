import MainContent from "@/app/ui/records/mainContent";
import fetchCategoriesByType from "@/lib/category/data";
import { fetchAllMembers } from "@/lib/members/data";
import Link from "next/link";

export default async function Page() {
  const data = await fetchAllMembers();
  const category = await fetchCategoriesByType("OUT");

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">收支紀錄</h1>
        <Link
          href="/records/create"
          className="bg-sky-600	 py-1 text-white font-bold rounded-lg px-4 hover:bg-sky-500 shadow-md"
        >
          新增紀錄
        </Link>
      </div>
      <MainContent />
    </div>
  );
}
