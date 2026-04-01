import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createContact } from '../services/contact.service';
import { successResponse, errorResponse } from '../lib/response';

const contact = new Hono();

const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください').max(100, '名前は100文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  subject: z
    .string()
    .min(1, '件名を入力してください')
    .max(200, '件名は200文字以内で入力してください'),
  message: z
    .string()
    .min(1, 'メッセージを入力してください')
    .max(2000, 'メッセージは2000文字以内で入力してください'),
});

contact.post(
  '/',
  zValidator('json', contactSchema, (result, c) => {
    if (!result.success) {
      return errorResponse(c, '入力内容に誤りがあります', 'VALIDATION_ERROR', 400);
    }
  }),
  async (c) => {
    try {
      const data = c.req.valid('json');
      await createContact(data);
      return successResponse(c, { success: true }, 201);
    } catch {
      return errorResponse(c, '送信に失敗しました。しばらく後にお試しください', 'SERVER_ERROR');
    }
  },
);

export default contact;
