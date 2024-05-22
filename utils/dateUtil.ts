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
