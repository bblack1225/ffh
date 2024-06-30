"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import CalendarView from "./calendarView";
import DatePickerListView from "./dataPickerListView";

type Props = {
  onDateChange: (month: number) => void;
  currentMonth: number;
  currentYear: number;
  onYearChange: (val: number) => void;
};

export default function DatePickerBar({
  onDateChange,
  currentMonth,
  currentYear,
  onYearChange,
}: Props) {
  // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isDetailShow, setIsDetailShow] = useState(false);
  // const handleMonthChange = (month: number) => {
  //   let newMonth;
  //   let newYear;
  //   if (month > 12) {
  //     newMonth = 1;
  //     newYear = currentYear + 1;
  //   } else if (month < 1) {
  //     newMonth = 12;
  //     newYear = currentYear - 1;
  //   } else {
  //     newMonth = month;
  //     newYear = currentYear;
  //   }
  //   setCurrentMonth(newMonth);
  //   setCurrentYear(newYear);

  //   if (view === "list") {
  //     setIsDetailShow(false);
  //   }
  //   onDateChange(newYear, newMonth);
  // };
  return (
    <div className="flex flex-col  justify-between my-2 w-full relative">
      <div className="flex ">
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
            // onClick={() => handleMonthChange(currentMonth - 1)}
            onClick={() => onDateChange(currentMonth - 1)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
        </div>
        <div
          className="flex items-center justify-center flex-1"
          onClick={() => setIsDetailShow((prev) => !prev)}
        >
          {`${currentYear}年`}
          {`${currentMonth}月`}
        </div>
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
            // onClick={() => handleMonthChange(currentMonth + 1)}
            onClick={() => onDateChange(currentMonth + 1)}
          >
            <ChevronRightIcon className="h-6 w-6 " />
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          `flex absolute inset-x-0 top-10 min-[520px]:justify-center`,
          {
            hidden: !isDetailShow,
          }
        )}
      >
        <DatePickerListView
          currentMonth={currentMonth}
          currentYear={currentYear}
          // onMonthChange={handleMonthChange}
          onMonthChange={onDateChange}
          onYearChange={(val) => onYearChange(currentYear + val)}
        />
      </div>
    </div>
  );
}
