import { z } from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(1, "お名前を入力してください").max(100),
	email: z.email("メールアドレスの形式が不正です"),
	subject: z.string().min(1, "件名を入力してください").max(200),
	message: z.string().min(1, "メッセージを入力してください").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
