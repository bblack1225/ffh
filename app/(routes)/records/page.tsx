import DatePickerBar from "@/app/ui/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function Page() {
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
      <Tabs defaultValue="listView" className="w-full mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listView">清單</TabsTrigger>
          <TabsTrigger value="calendarView">行事曆</TabsTrigger>
        </TabsList>
        <TabsContent value="listView">
          <DatePickerBar view="list" />
        </TabsContent>
        <TabsContent value="calendarView">
          <DatePickerBar view="calendar" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
