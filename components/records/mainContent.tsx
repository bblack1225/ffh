"use client";
import DatePickerBar from "@/components/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function MainContent() {
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");
  const handleDateChange = async (year: number, month: number) => {
    const data = await fetch(`/api/records?year=${year}&month=${month}`).then(
      (res) => res.json()
    );
    console.log("data!!!!!", data);
  };
  return (
    <Tabs defaultValue="listView" className="w-full mt-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="listView" onClick={() => setCurrentView("list")}>
          清單
        </TabsTrigger>
        <TabsTrigger
          value="calendarView"
          onClick={() => setCurrentView("calendar")}
        >
          行事曆
        </TabsTrigger>
      </TabsList>
      <DatePickerBar view={currentView} onDateChange={handleDateChange} />
      <TabsContent value="listView">list view</TabsContent>
      <TabsContent value="calendarView">calendar view</TabsContent>
    </Tabs>
  );
}
