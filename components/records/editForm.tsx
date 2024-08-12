import { CategoryTable, MemberTable } from "@/lib/definitions";
import { updateRecord } from "@/lib/records/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Link } from "lucide-react";
import { Input } from "../ui/input";
import CategoryDialog from "./categoryDialog";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../submitButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { RecordQuery } from "@/types/record";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecordValidator } from "@/lib/validator/record";
import { z } from "zod";

type Props = {
  categories: CategoryTable[];
  members: MemberTable[];
  item: RecordQuery;
};

// type FormData = z.infer<typeof RecordValidator>;

export default function EditForm({ categories, members, item }: Props) {
  const queryClient = useQueryClient();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<FormData>({
  //     resolver: zodResolver(RecordValidator),
  //     defaultValues: {
  //         id: item.id,
  //         description: item.description,
  //         amount: item.amount,
  //         member: item.member_id,
  //         date: item.transaction_date,
  //         image: item.image,
  //     },
  //   });
  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      updateRecord(item.id, {}, formData, item.type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    id: "",
  });

  const handleCategorySelect = (category: CategoryTable) => {
    setSelectedCategory({
      id: category.id,
      name: category.name,
    });
    setIsCategoryDrawerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("category", selectedCategory.id);
    console.log("formData", formData.get("amount"));

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-card p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-xl sm:text-lg font-medium"
            >
              日期
            </label>
            <input
              defaultValue={new Date().toISOString().split("T")[0]}
              placeholder="選擇日期"
              type="date"
              name="date"
              id="date"
              className="mt-1 px-3 border border-gray-300 bg-background rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl  sm:text-lg"
              style={{
                width: "100%",
                minWidth: "intrinsic",
              }}
            />
            <div id="date-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.date &&
                state.errors.date.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))} */}
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-xl sm:text-lg font-medium"
            >
              {item.type === "IN" ? "收入類別" : "支出類別"}
            </label>
            <div>
              <div className="relative">
                <ChevronRight className="absolute right-2 top-2 " />
                <Input
                  className="focus-visible:ring-0 focus:bg-slate-300 w-full"
                  name="category"
                  id="category"
                  placeholder={
                    item.type === "IN" ? "選擇收入類別" : "選擇支出類別"
                  }
                  type="text"
                  readOnly
                  value={selectedCategory.name}
                  onClick={() => setIsCategoryDrawerOpen(true)}
                />
              </div>
              <CategoryDialog
                open={isCategoryDrawerOpen}
                onClose={setIsCategoryDrawerOpen}
                categories={categories}
                onSelectCategory={handleCategorySelect}
              />
              {/* <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors?.category &&
                  state.errors.category.map((error: string) => (
                    <p
                      className="mt-2 text-sm text-red-500 font-bold"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
              </div> */}
            </div>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-xl sm:text-lg font-medium"
            >
              金額
            </label>
            <Input
              defaultValue={item.amount}
              type="number"
              inputMode="numeric"
              name="amount"
              id="amount"
              className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl sm:text-lg"
            />
            {/* <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div> */}
          </div>
          <div>
            <label htmlFor="member" className="text-xl sm:text-lg font-medium">
              成員
            </label>
            <Select name="member">
              <SelectGroup className="mt-1">
                <SelectTrigger id="member">
                  <SelectValue placeholder="選擇成員" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
            {/* <div id="member-error" aria-live="polite" aria-atomic="true">
              {state.errors?.member &&
                state.errors.member.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div> */}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-xl sm:text-lg font-medium"
            >
              描述
            </label>
            <Textarea name="description" id="description" />
          </div>
          <div>
            <label htmlFor="picture">Picture</label>
            <Link href="https://ap-southeast-2.xata.sh/file/0hgn2dhndpnll4d7tthvej9nlolf3j2eohdj8pf1r5vqohum6t2q325e01jbj2d6tmf51oed59b7alkcffha0527oeq5ukb1sq3k8l5v5g34h4bi91snenkng10nnn6d6hrr8fo3vn924rnoge6tc26dvo" />

            {/* <Input name="image" id="picture" type="file" accept="image/*" /> */}
          </div>
        </div>

        <div className="flex justify-end mt-3 gap-5">
          <Link
            href="/records"
            className="flex h-10 items-center bg-primary text-white px-4 rounded-lg"
          >
            取消
          </Link>
          <SubmitButton text="儲存" />
        </div>
      </div>
    </form>
  );
}
