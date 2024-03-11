import DatePickerBar from "@/app/ui/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  return (
    <div className="bg-background">
      <h1 className="text-2xl font-bold">收支紀錄</h1>
      <Tabs defaultValue="listView" className="w-full mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listView">清單</TabsTrigger>
          <TabsTrigger value="calendarView">行事曆</TabsTrigger>
        </TabsList>
        <TabsContent value="listView">
          <DatePickerBar />
        </TabsContent>
        <TabsContent value="calendarView">
          <DatePickerBar />
        </TabsContent>
      </Tabs>
    </div>
  );
}
