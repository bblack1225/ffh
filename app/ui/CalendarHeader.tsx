import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const DEMO_YEARS = [
    2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
  ];
  return (
    <div className="flex items-center justify-between mb-4 w-full bg-slate-100 relative">
      <div className="flex items-center">
        <button
          className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
          onClick={onPrevMonth}
        >
          &larr;
        </button>
      </div>
      <div className="relative">
        <Button variant="ghost" className="text-md p-1">
          {`${year}年`}
        </Button>
        <Button variant="ghost" className="text-md p-1">
          {`${month}月`}
        </Button>
      </div>

      <button
        className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
        onClick={onNextMonth}
      >
        &rarr;
      </button>
      <div className={clsx(`absolute top-10 z-50 w-80 pt-2 ml-4`)}>
        <div className="inline-block rounded-lg w-full bg-white shadow-lg">
          <div className="flex justify-between">
            <button
              className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
              onClick={onPrevMonth}
            >
              &larr;
            </button>
            <button
              className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
              onClick={onPrevMonth}
            >
              2024
            </button>
            <button
              className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
              onClick={onNextMonth}
            >
              &rarr;
            </button>
          </div>
          <div className="flex-1">
            <div className="grid  grid-cols-4">
              {DEMO_YEARS.map((year) => {
                return (
                  <Button
                    key={year}
                    variant="ghost"
                    className="text-md p-1 active:bg-slate-200"
                  >
                    {year}
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
