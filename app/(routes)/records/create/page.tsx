import Form from "@/app/ui/records/create/Form";
import ExpenseCreateForm from "@/app/ui/records/create/Form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchAllCategories } from "@/lib/category/data";
import { fetchAllMembers } from "@/lib/members/data";

export default async function Page() {
  const members = await fetchAllMembers();
  const { inCategories, outCategories } = await fetchAllCategories();

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
        <TabsContent value="income">
          <Form categories={inCategories} members={members} type="IN" />
        </TabsContent>
        <TabsContent value="expense">
          <Form categories={outCategories} members={members} type="OUT" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
