"use client";
import DatePickerBar from "@/components/records/date-picker/datePickerBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListViewTable from "./listTable";
import { DateState, RecordQuery } from "@/types/record";
import { getCalendarRange, parseToDateSlash } from "@/utils/dateUtil";
import { CategoriesQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import CalendarView from "./date-picker/calendarView";
import ListOverview from "./listOverview";

type RecordGroup = {
  data: RecordQuery[];
  income: number;
  expense: number;
};

export type MonthRecords = {
  records: GroupRecords;
  income: number;
  expense: number;
};

export type GroupRecords = {
  [key: string]: RecordGroup;
};

type Props = {
  categories: CategoriesQuery;
  members: MemberQuery[];
};

const fetchRecords = async (year: number, month: number) => {
  const { start, end } = getCalendarRange(year, month);

  const res = await fetch(`/api/records?start=${start}&end=${end}`).then(
    (res) => res.json().then((res) => res.data)
  );
  return res;
};

const filterByMonth = (groupRecords: GroupRecords, month: number) => {
  return Object.keys(groupRecords)
    .filter((date) => new Date(date).getMonth() + 1 === month)
    .reduce(
      (obj: MonthRecords, key) => {
        const record = groupRecords[key];
        obj.records[key] = groupRecords[key];
        obj.income += record.income;
        obj.expense += record.expense;
        return obj;
      },
      { records: {}, income: 0, expense: 0 }
    );
};

const transformRecords = (data: RecordQuery[], currentMonth: number) => {
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
  const [currentDate, setCurrentDate] = useState<DateState>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const handleDateChange = (monthVal: number, dayVal?: number) => {
    let newMonth;
    let newYear;
    let newDay = currentDate.day;
    if (monthVal > 12) {
      newMonth = 1;
      newYear = currentDate.year + 1;
    } else if (monthVal < 1) {
      newMonth = 12;
      newYear = currentDate.year - 1;
    } else {
      newMonth = monthVal;
      newYear = currentDate.year;
    }

    if (dayVal) {
      const lastDayOfMonth = new Date(newYear, newMonth, 0).getDate();
      if (dayVal > lastDayOfMonth) {
        newDay = lastDayOfMonth;
      } else {
        newDay = dayVal;
      }
    }
    setCurrentDate({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  const handleYearChange = (val: number) => {
    setCurrentDate((prev) => ({ ...prev, year: val }));
  };

  const {
    data: records = {
      data: [],
      listRecords: { records: {}, income: 0, expense: 0 },
      calendarRecords: {},
    },
    isPending,
  } = useQuery({
    queryKey: ["records", currentDate.year, currentDate.month],
    queryFn: () => fetchRecords(currentDate.year, currentDate.month),
    select: (data: RecordQuery[]) => transformRecords(data, currentDate.month),
  });
  // const { calendarRecords, listRecords } = transformRecords(
  //   records,
  //   currentMonth
  // );

  return (
    <Tabs defaultValue="list" className="w-full mt-2 ">
      <div className="px-3">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="list">清單</TabsTrigger>
          <TabsTrigger value="calendar">行事曆</TabsTrigger>
        </TabsList>
      </div>
      <DatePickerBar
        onDateChange={handleDateChange}
        onYearChange={handleYearChange}
        currentDate={currentDate}
      />
      {isPending ? (
        <div className="flex justify-center items-center h-50 font-extrabold text-xl">
          載入中...
        </div>
      ) : (
        <>
          <TabsContent value="list">
            <div className="px-3">
              <ListOverview
                income={records.listRecords.income}
                expense={records.listRecords.expense}
              />
              {records.data.length === 0 ? (
                <p className="text-slate-500 font-bold">
                  沒有資料。點擊右上角新增紀錄。
                </p>
              ) : (
                <>
                  <ListViewTable
                    groupRecords={records.listRecords.records}
                    categories={categories}
                    members={members}
                  />
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView
              currentDate={currentDate}
              onDateChange={handleDateChange}
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
