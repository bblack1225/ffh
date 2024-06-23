export type CategoryQuery = {
  id: string;
  name: string;
  type: string;
  book_id: string;
  icon: string;
};

export type CategoriesQuery = {
  inCategories: CategoryQuery[];
  outCategories: CategoryQuery[];
};
