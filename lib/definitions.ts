export type CategoryTable = {
  id: string;
  name: string;
  icon: string;
  type: string;
  book_id: string;
};

export type MemberTable = {
  id: string;
  name: string;
  book_id: string;
  email: string;
  share: number;
};
