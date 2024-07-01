import CalendarView from "./date-picker/calendarView";

type Props = {
  onDateChange: (month: number) => void;
  currentMonth: number;
  currentYear: number;
};

export default function CalendarViewTable({
  currentMonth,
  currentYear,
  onDateChange,
}: Props) {
  return (
    <div>
      {/* <CalendarView
        month={currentMonth}
        year={currentYear}
        // onMonthChange={handleMonthChange}
        onMonthChange={onDateChange}
      /> */}
      <div className="border-b-2 mt-2 border-gray-900" />
    </div>
  );
}
