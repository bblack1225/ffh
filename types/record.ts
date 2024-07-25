export type RecordQuery = {
  id: string;
  amount: number;
  category_id: string;
  transaction_date: string;
  member_id: string;
  book_id: string;
  description: string | null;
  type: "IN" | "OUT";
};

export type DateState = {
  year: number;
  month: number;
  day: number;
};
