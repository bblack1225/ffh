import { RecordQuery } from "@/types/record";

type Props = {
  records: RecordQuery[];
};

export default function ListViewTable({ records }: Props) {
  console.log("records", records);

  return (
    <div className=" rounded-md shadow-md">
      <div className="border-b p-2 border-dotted border-black	 flex justify-between">
        <div>2024/6/11 星期一</div>
        <div>$-100</div>
      </div>
      <div className="p-2 flex justify-between">
        <div>幸福</div>
        <div>$-100</div>
      </div>
    </div>
  );
}
