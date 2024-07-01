"use client";
import DatePickerBar from "@/components/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRecordsByMonth } from "@/lib/records/data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListViewTable from "./listTable";
import { RecordQuery } from "@/types/record";
import { parseToDateSlash } from "@/utils/dateUtil";
import { CategoriesQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import CalendarViewTable from "./calendarTable";
import CalendarView from "./date-picker/calendarView";

type Props = {
  categories: CategoriesQuery;
  members: MemberQuery[];
};

export default function MainContent({ categories, members }: Props) {
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
  const { data: records = [], isPending } = useQuery<RecordQuery[]>({
    queryKey: ["records", currentYear, currentMonth],
    queryFn: () =>
      fetch(`/api/records?year=${currentYear}&month=${currentMonth}`).then(
        (res) => res.json().then((res) => res.data)
      ),
    placeholderData: [],
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  const groupRecords = records.reduce(
    (
      acc: {
        [key: string]: {
          data: RecordQuery[];
          income: number;
          expense: number;
        };
      },
      record
    ) => {
      const date = record.transaction_date;
      const formatDate = parseToDateSlash(date);

      if (!acc[formatDate]) {
        acc[formatDate] = { data: [], income: 0, expense: 0 };
      }
      acc[formatDate].data.push(record);
      if (record.type === "IN") {
        acc[formatDate].income += record.amount;
      } else {
        acc[formatDate].expense += record.amount;
      }
      return acc;
    },
    {}
  );

  console.log("groupRecords", groupRecords);

  return (
    <Tabs defaultValue="listView" className="w-full mt-2 ">
      <div className="px-3">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="listView">清單</TabsTrigger>
          <TabsTrigger value="calendarView">行事曆</TabsTrigger>
        </TabsList>
      </div>
      <DatePickerBar
        onDateChange={handleDateChange}
        onYearChange={(val) => setCurrentYear(val)}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      <TabsContent value="listView">
        <div className="">
          <ListViewTable
            groupRecords={groupRecords}
            categories={categories}
            members={members}
          />
        </div>
      </TabsContent>
      <TabsContent value="calendarView">
        <CalendarView
          month={currentMonth}
          year={currentYear}
          onMonthChange={handleDateChange}
          groupRecords={groupRecords}
          categories={categories}
          members={members}
        />
      </TabsContent>
    </Tabs>
  );
}
