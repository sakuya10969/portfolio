import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { successResponse, errorResponse } from '../lib/response';
import {
  contactRequestSchema,
  contactCreateResponseSchema,
  apiErrorResponseSchema,
} from '../openapi/schemas';

const createContactRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Contact'],
  summary: '問い合わせを送信する',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: contactRequestSchema } },
    },
  },
  responses: {
    201: {
      description: '問い合わせを受け付けました',
      content: { 'application/json': { schema: contactCreateResponseSchema } },
    },
    400: {
      description: '入力内容に誤りがあります',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

const contact = new OpenAPIHono();

contact.openapi(createContactRoute, async (c) => {
  try {
    const data = c.req.valid('json');
    const { createContact } = await import('../services/contact.service');
    await createContact(data);
    return successResponse(c, { success: true }, 201);
  } catch {
    return errorResponse(c, '送信に失敗しました。しばらく後にお試しください', 'SERVER_ERROR');
  }
});

export default contact;
