"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import DatePickerListView from "./dataPickerListView";
import { DateState } from "@/types/record";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("month", searchParams.get("month"));
  console.log("year", searchParams.get("year"));

  const year = Number(searchParams.get("year")) || new Date().getFullYear();
  const month = Number(searchParams.get("month")) || new Date().getMonth() + 1;
  // console.log("pathname", pathname);
  // console.log("year", year);
  // console.log("month", month);

  const createPath = (year: number, month: number) => {
    let monthVal;
    let yearVal;
    if (month > 12) {
      monthVal = 1;
      yearVal = year + 1;
    } else if (month < 1) {
      monthVal = 12;
      yearVal = year - 1;
    } else {
      monthVal = month;
      yearVal = year;
    }
    return `/records?year=${yearVal}&month=${monthVal}`;
  };

  const [isDetailShow, setIsDetailShow] = useState(false);
  // const { year, month } = currentDate;
  return (
    <div className="flex flex-col  justify-between my-2 w-full relative px-3">
      <div className="flex ">
        <div>
          <Button
            variant="link"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
            onClick={() => onDateChange(-1)}
          >
            {/* <Link href={createPath(year, month - 1)}>
              <ChevronLeftIcon className="h-6 w-6" />
            </Link> */}
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
            variant="link"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
            onClick={() => onDateChange(1)}
          >
            {/* <Link href={createPath(year, month + 1)}> */}
            <ChevronRightIcon className="h-6 w-6 " />
            {/* </Link> */}
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
