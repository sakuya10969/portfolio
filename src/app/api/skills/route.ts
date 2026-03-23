import { NextResponse } from 'next/server';
import { getSkills } from '@/entities/skill';
import type { ApiResponse } from '@/shared/types/api';
import type { SkillCategory } from '@/entities/skill';

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json({ data: skills } satisfies ApiResponse<SkillCategory[]>);
  } catch {
    return NextResponse.json(
      {
        error: { message: 'スキルの取得に失敗しました', code: 'FETCH_ERROR' },
      } satisfies ApiResponse<never>,
      { status: 500 },
    );
  }
}
