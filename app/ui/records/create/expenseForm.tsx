"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExpenseCreateForm() {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-col gap-5">
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
              className="mt-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl  sm:text-lg"
              style={{
                width: "100%",
                minWidth: "intrinsic",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="expenseType"
              className="text-xl sm:text-lg font-medium"
            >
              支出類別
            </label>
            <Select>
              <SelectGroup className="mt-1">
                <SelectTrigger id="expenseType">
                  <SelectValue placeholder="選擇支出類別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">飲食</SelectItem>
                  <SelectItem value="dark">食材</SelectItem>
                  <SelectItem value="system">水電費</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>
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
          </div>
          <div>
            <label htmlFor="member" className="text-xl sm:text-lg font-medium">
              成員
            </label>
            <Select>
              <SelectGroup className="mt-1">
                <SelectTrigger id="member">
                  <SelectValue placeholder="選擇成員" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>
          </div>
        </div>
      </div>
    </form>
  );
}
