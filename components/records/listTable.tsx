import { RecordQuery } from "@/types/record";
import { WrenchIcon } from "@heroicons/react/24/outline";

type Props = {
  records: RecordQuery[];
};

export default function ListViewTable({ records }: Props) {
  console.log("records", records);

  return (
    <>
      {[1, 2, 3].map((item) => {
        return (
          <div key={item} className="rounded-md  border my-2">
            <div className="border-b p-2  border-slate-400	 flex justify-between">
              <div className="font-bold">2024/6/11 星期一</div>
              {/* <div className="font-bold">收入6000 支出$200</div> */}
            </div>
            {[1, 2].map((item) => {
              return (
                <div key={item} className="p-2 flex justify-between  border-b">
                  <div className="flex items-center">
                    <WrenchIcon className="w-6" />
                  </div>
                  <div className="flex justify-between flex-1">
                    <div className="pl-2">幸福</div>
                    <div className="pr-1">$100</div>
                  </div>
                </div>
              );
            })}
            <div key={item} className="p-2 flex justify-between  border-b">
              <div className="flex items-center">
                <WrenchIcon className="w-6 " />
              </div>
              <div className="flex justify-between flex-1">
                <div className="pl-2">昱家用</div>
                <div className="bg-[rgb(94,156,115)] rounded-xl px-1">
                  <span className="text-white font-medium">$6,000</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-3 py-2 gap-1">
              <span className="font-medium text-right">
                收入$6,000 支出$200
              </span>
              <span className="font-bold text-right underline underline-offset-4">
                合計$5,800
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
