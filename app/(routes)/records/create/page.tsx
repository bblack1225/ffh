import ExpenseCreateForm from "@/app/ui/records/create/expenseForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="bg-background">
      <Tabs defaultValue="expense">
        <div className="flex items-center justify-between">
          <div className="flex flex-1">
            <h1 className="text-xl font-bold">新增收支紀錄</h1>
          </div>
          <TabsList className="inline-flex flex-1 ">
            <TabsTrigger className="w-full" value="income">
              收入
            </TabsTrigger>
            <TabsTrigger className="w-full" value="expense">
              支出
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="income"></TabsContent>
        <TabsContent value="expense">
          <ExpenseCreateForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
