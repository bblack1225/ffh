"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import CalendarView from "./calendarView";

const MONTHS = [
  {
    label: "1月",
    value: 1,
  },
  {
    label: "2月",
    value: 2,
  },
  {
    label: "3月",
    value: 3,
  },
  {
    label: "4月",
    value: 4,
  },
  {
    label: "5月",
    value: 5,
  },
  {
    label: "6月",
    value: 6,
  },
  {
    label: "7月",
    value: 7,
  },
  {
    label: "8月",
    value: 8,
  },
  {
    label: "9月",
    value: 9,
  },
  {
    label: "10月",
    value: 10,
  },
  {
    label: "11月",
    value: 11,
  },
  {
    label: "12月",
    value: 12,
  },
];

type Props = {
  view: "list" | "calendar";
};

export default function DatePickerBar({ view }: Props) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isDetailShow, setIsDetailShow] = useState(false);
  const handleMonthChange = (month: number) => {
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

    if (view === "list") {
      setIsDetailShow(false);
    }
  };
  return (
    <div className="flex flex-col  justify-between mb-4 w-full ">
      <div className="flex bg-slate-100 ">
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
            onClick={() => handleMonthChange(currentMonth - 1)}
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
            onClick={() => handleMonthChange(currentMonth + 1)}
          >
            <ChevronRightIcon className="h-6 w-6 " />
          </Button>
        </div>
      </div>
      {view === "list" ? (
        <div
          className={clsx(`flex min-[520px]:justify-center `, {
            hidden: !isDetailShow,
          })}
        >
          <div className="inline-block rounded-lg w-full min-[520px]:w-80 bg-white shadow-lg p-1">
            <div className="flex justify-between">
              <Button
                variant="ghost"
                className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
                onClick={() => setCurrentYear((year) => year - 1)}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </Button>
              <div className="  text-gray-800 font-bold py-2 px-3 rounded-l">
                {currentYear}
              </div>
              <Button
                variant="ghost"
                className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
                onClick={() => setCurrentYear((year) => year + 1)}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="grid  grid-cols-4">
                {MONTHS.map((month) => {
                  return (
                    <Button
                      key={month.value}
                      variant="ghost"
                      className={clsx(
                        "text-md p-1 active:bg-slate-200",
                        month.value === currentMonth
                          ? "bg-slate-200"
                          : "bg-white"
                      )}
                      onClick={() => handleMonthChange(month.value)}
                    >
                      {month.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        isDetailShow && (
          <CalendarView
            month={currentMonth}
            year={currentYear}
            onMonthChange={handleMonthChange}
          />
        )
      )}
    </div>
  );
}
