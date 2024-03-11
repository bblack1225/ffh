import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

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
export default function CalendarHeader({
  year,
  month,
  onMonthChange,
  onYearChange,
}: {
  year: number;
  month: number;
  onMonthChange: (month: number) => void;
  onYearChange: (val: number) => void;
}) {
  const [isDetailShow, setIsDetailShow] = useState(false);
  const handleChangeMonth = (month: number) => {
    onMonthChange(month);
    setIsDetailShow(false);
  };
  return (
    <div className="flex items-center justify-between mb-4 w-full bg-slate-100 relative">
      <div className="flex items-center">
        <button
          className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
          onClick={() => handleChangeMonth(month - 1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      </div>
      <div
        className="relative"
        onClick={() => setIsDetailShow((prev) => !prev)}
      >
        <Button variant="ghost" className="text-md p-1">
          {`${year}年`}
        </Button>
        <Button variant="ghost" className="text-md p-1">
          {`${month}月`}
        </Button>
      </div>

      <button
        className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
        onClick={() => handleChangeMonth(month + 1)}
      >
        <ChevronRightIcon className="h-6 w-6 " />
      </button>
      <div
        className={clsx(`absolute top-10 z-50 w-80 pt-2 ml-4`, {
          hidden: !isDetailShow,
        })}
      >
        <div className="inline-block rounded-lg w-full bg-white shadow-lg">
          <div className="flex justify-between">
            <button
              className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
              onClick={() => onYearChange(-1)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div className="  text-gray-800 font-bold py-2 px-3 rounded-l">
              {year}
            </div>
            <button
              className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
              onClick={() => onYearChange(1)}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1">
            <div className="grid  grid-cols-4">
              {MONTHS.map((month) => {
                return (
                  <Button
                    key={month.value}
                    variant="ghost"
                    className="text-md p-1 active:bg-slate-200"
                    onClick={() => handleChangeMonth(month.value)}
                  >
                    {month.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
