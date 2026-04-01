import type { Context } from 'hono';

export function successResponse<T>(c: Context, data: T, status: 200 | 201 = 200) {
  return c.json({ data }, status);
}

export function errorResponse(
  c: Context,
  message: string,
  code: string,
  status: 400 | 404 | 500 = 500,
) {
  return c.json({ error: { message, code } }, status);
}
