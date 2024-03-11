"use client";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";

export default function DatePickerBar() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);

  const handleMonthChange = (month: number) => {
    let newMonth;
    let newYear;
    if (month > 12) {
      newMonth = 1;
      newYear = year + 1;
    } else if (month < 1) {
      newMonth = 12;
      newYear = year - 1;
    } else {
      newMonth = month;
      newYear = year;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <>
      <CalendarHeader
        year={year}
        month={month}
        onMonthChange={handleMonthChange}
        onYearChange={(val: number) => setYear(year + val)}
      />
    </>
  );
}
