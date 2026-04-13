import type { Context } from 'hono';

export function successResponse<T>(c: Context, data: T, status: 200 | 201 = 200) {
  return c.json({ data }, status);
}

export function errorResponse<S extends number>(
  c: Context,
  message: string,
  code: string,
  status: S = 500 as S,
) {
  return c.json({ error: { message, code } }, status);
}
