import clsx from "clsx";
import { useState } from "react";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
export default function CalendarView({
  year,
  month,
  onMonthChange,
}: {
  year: number;
  month: number;
  onMonthChange: (month: number) => void;
}) {
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

  const handleLastMonthDayChange = (day: number) => {
    onMonthChange(month - 1);
    setCurrentDay(day);
  };

  const handleNextMonthDayChange = (day: number) => {
    onMonthChange(month + 1);
    setCurrentDay(day);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-white shadow-xl p-1 w-full min-[520px]:w-80 ">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div key={day} className="flex justify-center  py-2 font-bold">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-px px-px ">
          {daysOfLastMonth.map((day) => (
            <div
              key={day}
              className={clsx(
                "py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
              )}
              onClick={() => handleLastMonthDayChange(day)}
            >
              <div>{day}</div>
              <span className="w-1.5 bg-red-300 h-1.5 rounded-full" />
            </div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={clsx(
                "bg-white py-1 flex flex-col items-center font-bold text-gray-800 hover:bg-neutral-200 hover:rounded-lg hover:cursor-pointer",
                currentDay === day && "bg-neutral-200 rounded-lg"
              )}
              onClick={() => setCurrentDay(day)}
            >
              <div>{day}</div>
              <span className="w-1.5 bg-red-400 h-1.5 rounded-full" />
            </div>
          ))}
          {daysOfNextMonth.map((day) => (
            <div
              key={day}
              className=" py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
              onClick={() => handleNextMonthDayChange(day)}
            >
              <div>{day}</div>
              <span className="w-1.5 bg-red-300 h-1.5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
