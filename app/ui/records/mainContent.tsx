"use client";
import DatePickerBar from "@/app/ui/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function MainContent() {
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");
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
      <DatePickerBar view={currentView} />
      <TabsContent value="listView">list view</TabsContent>
      <TabsContent value="calendarView">calendar view</TabsContent>
    </Tabs>
  );
}
