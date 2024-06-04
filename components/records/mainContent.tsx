"use client";
import DatePickerBar from "@/components/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRecordsByMonth } from "@/lib/records/data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MainContent() {
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const handleDateChange = (month: number) => {
    let newMonth;
    let newYear;
    if (month > 12) {
      newMonth = 1;
      newYear = currentYear + 1;
    } else if (month < 1) {
      newMonth = 12;
      newYear = currentYear - 1;
    } else {
      newMonth = month;
      newYear = currentYear;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // if (view === "list") {
    //   setIsDetailShow(false);
    // }
    // onDateChange(newYear, newMonth);
  };
  // const handleDateChange = async (year: number, month: number) => {
  //   const data = await fetch(`/api/records?year=${year}&month=${month}`).then(
  //     (res) => res.json()
  //   );
  // };
  const { data } = useQuery({
    queryKey: ["records", currentYear, currentMonth],
    queryFn: () => fetchRecordsByMonth(currentYear, currentMonth),
  });
  console.log("data", data);

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
      <DatePickerBar
        view={currentView}
        onDateChange={handleDateChange}
        onYearChange={(val) => setCurrentYear(val)}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      <TabsContent value="listView">list view</TabsContent>
      <TabsContent value="calendarView">calendar view</TabsContent>
    </Tabs>
  );
}
