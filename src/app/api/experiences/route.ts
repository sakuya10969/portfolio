import { NextResponse } from "next/server";
import { getExperiences } from "@/entities/experience";
import type { ApiResponse } from "@/shared/types/api";
import type { Experience } from "@/entities/experience";

export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json({ data: experiences } satisfies ApiResponse<Experience[]>);
  } catch {
    return NextResponse.json(
      { error: { message: "経歴の取得に失敗しました", code: "FETCH_ERROR" } } satisfies ApiResponse<never>,
      { status: 500 }
    );
  }
}
