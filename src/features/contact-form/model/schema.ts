import { z } from "zod/v3";

export const contactFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(100, "名前は100文字以内で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  subject: z.string().min(1, "件名を入力してください").max(200, "件名は200文字以内で入力してください"),
  message: z.string().min(1, "メッセージを入力してください").max(2000, "メッセージは2000文字以内で入力してください"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
