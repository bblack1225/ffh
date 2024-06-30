import { CategoriesQuery } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { RecordQuery } from "@/types/record";
import { getWeekDay, parseToDateSlash } from "@/utils/dateUtil";
import { WrenchIcon } from "@heroicons/react/24/outline";

type Props = {
  // records: RecordQuery[] | [];
  categories: CategoriesQuery;
  members: MemberQuery[];
  groupRecords: {
    [key: string]: {
      data: RecordQuery[];
      income: number;
      expense: number;
    };
  };
};

export default function ListViewTable({
  groupRecords,
  categories,
  members,
}: Props) {
  const { inCategories, outCategories } = categories;

  const getCategoryNameById = (type: string, categoryId: string) => {
    const selectedCategories = type === "IN" ? inCategories : outCategories;
    const category = selectedCategories.find(
      (category) => category.id === categoryId
    );

    return category?.name;
  };
  const getMemberNameById = (memberId: string) => {
    const member = members.find((member) => member.id === memberId);
    return member?.name;
  };
  return (
    <>
      {Object.entries(groupRecords).map(([date, records]) => {
        return (
          <div key={date} className="rounded-md  border my-2">
            <div className="border-b p-2  border-slate-400	 flex justify-between">
              <div className="font-bold">
                {date} {getWeekDay(date)}
              </div>
            </div>
            {records.data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="p-2 flex justify-between  border-b"
                >
                  <div className="flex items-center">
                    <WrenchIcon className="w-6" />
                  </div>
                  <div className="flex justify-between flex-1 items-center	">
                    <div className="flex flex-col">
                      <div className="pl-2">
                        {getCategoryNameById(item.type, item.category_id)}
                      </div>
                      <div className="pl-2 font-light text-sm">
                        {getMemberNameById(item.member_id)} | {item.description}
                      </div>
                    </div>
                    {item.type === "IN" ? (
                      <div className="bg-[rgb(94,156,115)] rounded-xl px-1">
                        <span className="text-white font-medium">
                          ${item.amount}
                        </span>
                      </div>
                    ) : (
                      <div className="pr-1">${item.amount}</div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end px-3 py-2 gap-1">
              <span className="font-medium text-right">
                收入${records.income} 支出${records.expense}
              </span>
              <span className="font-bold text-right underline underline-offset-4">
                合計${records.income - records.expense}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
