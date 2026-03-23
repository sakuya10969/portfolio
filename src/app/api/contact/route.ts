import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v3';
import { prisma } from '@/shared/lib/prisma';
import type { ApiResponse } from '@/shared/types/api';

export const contactFormSchema = z.object({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: {
            message: '入力内容に誤りがあります',
            code: 'VALIDATION_ERROR',
          },
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    await prisma.contact.create({ data: result.data });

    return NextResponse.json({ data: { success: true } } satisfies ApiResponse<{
      success: boolean;
    }>);
  } catch {
    return NextResponse.json(
      {
        error: { message: '送信に失敗しました。しばらく後にお試しください', code: 'SERVER_ERROR' },
      } satisfies ApiResponse<never>,
      { status: 500 },
    );
  }
}
