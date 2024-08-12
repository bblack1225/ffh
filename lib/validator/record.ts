import { z } from "zod";

export const RecordValidator = z.object({
  id: z.string(),
  category: z.string().min(1, { message: "請選擇類別" }),
  description: z.string(),
  amount: z.coerce.number().gt(0, { message: "金額必須大於0" }),
  member: z.string().min(1, { message: "請選擇成員" }),
  date: z.string().min(1, { message: "請選擇日期" }),
  image: z.custom<File>(),
});

export type RecordCreationRequest = z.infer<typeof RecordValidator>;
