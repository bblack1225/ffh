"use client";
import DatePickerBar from "@/components/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListViewTable from "./listTable";
import { RecordQuery } from "@/types/record";
import { getCalendarRange, parseToDateSlash } from "@/utils/dateUtil";
import { CategoriesQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import CalendarView from "./date-picker/calendarView";

type RecordGroup = {
  data: RecordQuery[];
  income: number;
  expense: number;
};

type GroupRecords = {
  [key: string]: RecordGroup;
};

type Props = {
  categories: CategoriesQuery;
  members: MemberQuery[];
};

const fetchSomeData = async (currentYear: number, currentMonth: number) => {
  const { start, end } = getCalendarRange(currentYear, currentMonth);

  const res = await fetch(`/api/records?start=${start}&end=${end}`).then(
    (res) => res.json().then((res) => res.data)
  );
  return res;
};

const filterByMonth = (records: GroupRecords, month: number) => {
  return Object.keys(records)
    .filter((date) => new Date(date).getMonth() + 1 === month)
    .reduce((obj: GroupRecords, key) => {
      obj[key] = records[key];
      return obj;
    }, {});
};

const transformRecords = (data: RecordQuery[], currentMonth: number) => {
  console.log("data", data);

  const calendarRecords = data.reduce((acc: GroupRecords, record) => {
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
  }, {});
  const listRecords = filterByMonth(calendarRecords, currentMonth);

  return { calendarRecords, listRecords, data };
};

export default function MainContent({ categories, members }: Props) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState<"list" | "calendar">("list");
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
  const { start, end } = getCalendarRange(currentYear, currentMonth);

  const {
    data: records = { data: [], listRecords: {}, calendarRecords: {} },
    isPending,
  } = useQuery({
    queryKey: ["records", currentYear, currentMonth],
    queryFn: () => fetchSomeData(currentYear, currentMonth),
    select: (data: RecordQuery[]) => transformRecords(data, currentMonth),
  });
  // const { calendarRecords, listRecords } = transformRecords(
  //   records,
  //   currentMonth
  // );

  return (
    <Tabs defaultValue="list" className="w-full mt-2 ">
      <div className="px-3">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="list" onClick={() => setMode("list")}>
            清單
          </TabsTrigger>
          <TabsTrigger value="calendar" onClick={() => setMode("calendar")}>
            行事曆
          </TabsTrigger>
        </TabsList>
      </div>
      <DatePickerBar
        onDateChange={handleDateChange}
        onYearChange={(val) => setCurrentYear(val)}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      {isPending ? (
        <div className="flex justify-center items-center h-50 font-extrabold text-xl">
          載入中...
        </div>
      ) : (
        <>
          <TabsContent value="list">
            <div className="px-3">
              {records.data.length === 0 ? (
                <p className="text-slate-500 font-bold">
                  沒有資料。點擊右上角新增紀錄。
                </p>
              ) : (
                <ListViewTable
                  groupRecords={records.listRecords}
                  categories={categories}
                  members={members}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView
              month={currentMonth}
              year={currentYear}
              onMonthChange={handleDateChange}
              groupRecords={records.calendarRecords}
              categories={categories}
              members={members}
            />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
