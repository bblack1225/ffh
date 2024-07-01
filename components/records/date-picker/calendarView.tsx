import { CategoriesQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { RecordQuery } from "@/types/record";
import { parseToDateSlash } from "@/utils/dateUtil";
import clsx from "clsx";
import { useEffect, useState } from "react";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

type Props = {
  year: number;
  month: number;
  onMonthChange: (month: number) => void;
  groupRecords: {
    [key: string]: {
      data: RecordQuery[];
      income: number;
      expense: number;
    };
  };
  categories: CategoriesQuery;
  members: MemberQuery[];
};

export default function CalendarView({
  year,
  month,
  onMonthChange,
  groupRecords,
  categories,
  members,
}: Props) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();

  const daysOfLastMonth = Array.from(
    { length: firstDayOfMonth },
    (_, i) => lastDayOfLastMonth - i
  ).reverse();

  const daysOfNextMonth = Array.from(
    { length: 42 - daysInMonth - firstDayOfMonth },
    (_, i) => i + 1
  );

  useEffect(() => {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (currentDay > lastDayOfMonth) {
      setCurrentDay(lastDayOfMonth);
    }
  }, [month, year, currentDay]);

  const handleLastMonthDayChange = (day: number) => {
    onMonthChange(month - 1);
    setCurrentDay(day);
  };

  const handleNextMonthDayChange = (day: number) => {
    onMonthChange(month + 1);
    setCurrentDay(day);
  };

  const adjustCurrentDay = (
    year: number,
    month: number,
    selectedDay: number
  ) => {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    // if (selectedDay > lastDayOfMonth) {
    //   return lastDayOfMonth;
    // }
    // return selectedDay;
  };

  const currentDateStr = `${year}-${month}-${currentDay}`;
  const currentDate = parseToDateSlash(currentDateStr);

  const records = groupRecords[currentDate] || {
    data: [],
    income: 0,
    expense: 0,
  };
  console.log("records", records);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-1 w-full min-[520px]:w-80 my-0 mx-auto">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div key={day} className="flex justify-center  py-2 font-bold ">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-px px-px ">
          {daysOfLastMonth.map((day) => {
            const dateStr = `${year}-${month - 1}-${day}`;
            const formattedDate = parseToDateSlash(dateStr);
            const hasRecord = groupRecords[formattedDate];

            return (
              <div
                key={day}
                className={clsx(
                  "py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
                )}
                onClick={() => handleLastMonthDayChange(day)}
              >
                <div>{day}</div>
                {hasRecord && (
                  <span className="w-1.5 bg-red-300 h-1.5 rounded-full" />
                )}
              </div>
            );
          })}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dateStr = `${year}-${month}-${day}`;
            const formattedDate = parseToDateSlash(dateStr);
            const hasRecord = groupRecords[formattedDate];
            return (
              <div
                key={day}
                className={clsx(
                  "py-1 flex flex-col items-center font-bold text-gray-800 hover:bg-neutral-200 hover:rounded-lg hover:cursor-pointer",
                  currentDay === day && "bg-neutral-200 rounded-lg"
                )}
                onClick={() => setCurrentDay(day)}
              >
                <div>{day}</div>

                {hasRecord && (
                  <span className="w-1.5 bg-red-400 h-1.5 rounded-full" />
                )}
              </div>
            );
          })}
          {daysOfNextMonth.map((day) => {
            const dateStr = `${year}-${month + 1}-${day}`;
            const formattedDate = parseToDateSlash(dateStr);
            const hasRecord = groupRecords[formattedDate];
            return (
              <div
                key={day}
                className=" py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
                onClick={() => handleNextMonthDayChange(day)}
              >
                <div>{day}</div>
                {hasRecord && (
                  <span className="w-1.5 bg-red-300 h-1.5 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b-2 border-gray-500 my-2" />
      <div className="flex justify-between  px-3">
        <div>
          支出:<span className="text-amber-500">${records.expense}</span>
        </div>
        <div>
          收入:
          <span className="text-green-600 font-medium">${records.income}</span>
        </div>
        <div>
          合計:
          <span className="text-red-500">
            ${records.income - records.expense}
          </span>
        </div>
      </div>
      <div className="border-b-2 border-gray-500 my-2" />
    </div>
  );
}
