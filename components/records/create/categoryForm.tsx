import { CategoryTable } from "@/lib/definitions";

type Props = {
  categories: CategoryTable[];
};

export default function CategoryForm({ categories }: Props) {
  return (
    <div className="w-96 h-96 relative z-10 bg-gray-400 inline-block">
      Category Form
    </div>
  );
}
