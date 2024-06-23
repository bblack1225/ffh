const daysOfWeek = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export const getCurrentDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month}-01`;
};

// export const getYearMonthDateString = (year: number, month: number) => {
//   return `${year}-${month.padStart(2, "0")}`;
// };

export const formatToDateStr = (date: Date) => {
  return date.toLocaleDateString("en-CA");
};

export const parseToDateSlash = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const getWeekDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return daysOfWeek[date.getDay()];
};
