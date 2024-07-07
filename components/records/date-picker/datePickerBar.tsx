"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import DatePickerListView from "./dataPickerListView";
import { DateState } from "@/types/record";

type Props = {
  onDateChange: (month: number) => void;
  currentDate: DateState;
  onYearChange: (val: number) => void;
};

export default function DatePickerBar({
  onDateChange,
  currentDate,
  onYearChange,
}: Props) {
  const [isDetailShow, setIsDetailShow] = useState(false);
  const { year, month } = currentDate;
  return (
    <div className="flex flex-col  justify-between my-2 w-full relative px-3">
      <div className="flex ">
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
            onClick={() => onDateChange(month - 1)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
        </div>
        <div
          className="flex items-center justify-center flex-1"
          onClick={() => setIsDetailShow((prev) => !prev)}
        >
          {`${year}年`}
          {`${month}月`}
        </div>
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
            onClick={() => onDateChange(month + 1)}
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
          currentMonth={month}
          currentYear={year}
          onMonthChange={(val) => {
            onDateChange(val);
            setIsDetailShow(false);
          }}
          onYearChange={(val) => onYearChange(year + val)}
        />
      </div>
    </div>
  );
}
