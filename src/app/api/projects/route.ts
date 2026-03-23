import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/entities/project';
import type { ApiResponse } from '@/shared/types/api';
import type { Project } from '@/entities/project';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;
    const technology = searchParams.get('technology') ?? undefined;

    const projects = await getProjects({ category, technology });
    return NextResponse.json({ data: projects } satisfies ApiResponse<Project[]>);
  } catch {
    return NextResponse.json(
      {
        error: { message: 'プロジェクトの取得に失敗しました', code: 'FETCH_ERROR' },
      } satisfies ApiResponse<never>,
      { status: 500 },
    );
  }
}
