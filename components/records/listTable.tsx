import { RecordQuery } from "@/types/record";
import { WrenchIcon } from "@heroicons/react/24/outline";

type Props = {
  records: RecordQuery[];
};

export default function ListViewTable({ records }: Props) {
  console.log("records", records);

  return (
    <>
      <div className="rounded-md  border">
        <div className="border-b p-2  border-slate-500	 flex justify-between">
          <div className="font-bold">2024/6/11 星期一</div>
          <div className="font-bold">$-100</div>
        </div>
        <div className="p-2 flex justify-between border-b border-gray-200">
          <div className="flex items-center">
            <WrenchIcon className="w-6 " />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
        <div className="p-2 flex justify-between ">
          <div className="flex items-center">
            <WrenchIcon className="w-6" />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
      </div>
      <div className="rounded-md  border my-4">
        <div className="border-b p-2  border-slate-500	 flex justify-between">
          <div className="font-bold">2024/6/11 星期一</div>
          <div className="font-bold">$-100</div>
        </div>
        <div className="p-2 flex justify-between border-b border-gray-200">
          <div className="flex items-center">
            <WrenchIcon className="w-6 " />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
        <div className="p-2 flex justify-between ">
          <div className="flex items-center">
            <WrenchIcon className="w-6" />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
      </div>
      <div className="rounded-md  border my-4">
        <div className="border-b p-2  border-slate-500	 flex justify-between">
          <div className="font-bold">2024/6/11 星期一</div>
          <div className="font-bold">$-100</div>
        </div>
        <div className="p-2 flex justify-between border-b border-gray-200">
          <div className="flex items-center">
            <WrenchIcon className="w-6 " />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
        <div className="p-2 flex justify-between">
          <div className="flex items-center">
            <WrenchIcon className="w-6" />
          </div>
          <div className="p-2 flex justify-between flex-1">
            <div>幸福</div>
            <div>$-100</div>
          </div>
        </div>
      </div>
    </>
  );
}
