import { NextRequest, NextResponse } from 'next/server';
import { getProjectBySlug } from '@/entities/project';
import type { ApiResponse } from '@/shared/types/api';
import type { Project } from '@/entities/project';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json(
        {
          error: { message: 'プロジェクトが見つかりません', code: 'NOT_FOUND' },
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    return NextResponse.json({ data: project } satisfies ApiResponse<Project>);
  } catch {
    return NextResponse.json(
      {
        error: { message: 'プロジェクトの取得に失敗しました', code: 'FETCH_ERROR' },
      } satisfies ApiResponse<never>,
      { status: 500 },
    );
  }
}
