import { CategoriesQuery, CategoryQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { RecordQuery } from "@/types/record";
import clsx from "clsx";
import { WrenchIcon } from "lucide-react";

type Props = {
  item: RecordQuery;
  categories: CategoriesQuery;
  members: MemberQuery[];
  borderStyle?: string;
};

const getCategoryNameById = (
  categories: CategoryQuery[],
  categoryId: string
) => {
  const category = categories.find((category) => category.id === categoryId);

  return category?.name;
};
const getMemberNameById = (members: MemberQuery[], memberId: string) => {
  const member = members.find((member) => member.id === memberId);
  return member?.name;
};

export default function RecordItem({
  item,
  members,
  categories,
  borderStyle,
}: Props) {
  const { inCategories, outCategories } = categories;
  const selectedCategories = item.type === "IN" ? inCategories : outCategories;
  const categoryName = getCategoryNameById(
    selectedCategories,
    item.category_id
  );
  const memberName = getMemberNameById(members, item.member_id);
  return (
    <div key={item.id} className={clsx("p-2 flex justify-between  border-b")}>
      <div className="flex items-center">
        <WrenchIcon className="w-6" />
      </div>
      <div className="flex justify-between flex-1 items-center	">
        <div className="flex flex-col">
          <div className="pl-2">{categoryName}</div>
          <div className="pl-2 font-light text-sm">
            {memberName} | {item.description}
          </div>
        </div>
        {item.type === "IN" ? (
          <div className="bg-[rgb(94,156,115)] rounded-xl px-1">
            <span className="text-white font-medium">${item.amount}</span>
          </div>
        ) : (
          <div className="pr-1">${item.amount}</div>
        )}
      </div>
    </div>
  );
}
