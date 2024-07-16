"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CategoryTable, MemberTable } from "@/lib/definitions";
import { createRecord, State } from "@/lib/records/action";
import Link from "next/link";
import { useFormState } from "react-dom";
import SubmitButton from "../../submitButton";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "../icon";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type Props = {
  categories: CategoryTable[];
  members: MemberTable[];
  type: "IN" | "OUT";
};

export default function Form({ categories, members, type }: Props) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(
    (state, formData) => createRecord(state, formData, type),
    initialState
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   setRecordImg(URL.createObjectURL(file));
  // };

  return (
    <form action={dispatch}>
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
              {state.errors?.date &&
                state.errors.date.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-xl sm:text-lg font-medium"
            >
              {type === "IN" ? "收入類別" : "支出類別"}
            </label>
            <div>
              <div className="relative">
                <ChevronRight className="absolute right-2 top-2 " />
                <Input
                  className="focus-visible:ring-0 focus:bg-slate-300 w-full"
                  name="category"
                  placeholder={type === "IN" ? "選擇收入類別" : "選擇支出類別"}
                  type="text"
                  readOnly
                  value={selectedCategoryName}
                  onClick={() => setIsCategoryDrawerOpen(true)}
                />
              </div>
              <Dialog
                open={isCategoryDrawerOpen}
                onOpenChange={setIsCategoryDrawerOpen}
              >
                <DialogContent className="h-screen w-screen">
                  <VisuallyHidden.Root>
                    <DialogTitle />
                  </VisuallyHidden.Root>
                  <VisuallyHidden.Root>
                    <DialogDescription />
                  </VisuallyHidden.Root>
                  <div className="h-fit grid grid-cols-3 gap-4  overflow-auto py-4 px-1">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="h-20 bg-card flex flex-col justify-center items-center  rounded-md text-sm font-bold cursor-pointer"
                        onClick={() => {
                          setSelectedCategoryName(category.name);
                          setIsCategoryDrawerOpen(false);
                        }}
                      >
                        <div>
                          <Icon name={category.icon} />
                        </div>
                        <div>{category.name}</div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-xl sm:text-lg font-medium"
            >
              {type === "IN" ? "收入類別" : "支出類別"}
            </label>
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.category &&
                state.errors.category.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
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
              type="number"
              inputMode="numeric"
              name="amount"
              id="amount"
              className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl sm:text-lg"
            />
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div>
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
            <div id="member-error" aria-live="polite" aria-atomic="true">
              {state.errors?.member &&
                state.errors.member.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500 font-bold"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
            </div>
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
            <Input name="image" id="picture" type="file" accept="image/*" />
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
