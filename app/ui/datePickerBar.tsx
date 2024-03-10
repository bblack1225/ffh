"use client";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";

export default function DatePickerBar() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);

  const handlePrevMonth = () => {
    // 實作更新月份和年份的邏輯
    const lastMonth = month === 1 ? 12 : month - 1;
    setMonth(lastMonth);
    const lastYear = month === 1 ? year - 1 : year;
    setYear(lastYear);
  };

  const handleNextMonth = () => {
    // 實作更新月份和年份的邏輯
    const nextMonth = month === 12 ? 1 : month + 1;
    setMonth(nextMonth);
    const nextYear = month === 12 ? year + 1 : year;
    setYear(nextYear);
  };

  return (
    <CalendarHeader
      year={year}
      month={month}
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}
    />
  );
}
