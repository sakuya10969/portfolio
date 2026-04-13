import { useGetApiSkills } from "~/shared/api/generated/endpoints/skills/skills";
import type { SkillCategoryWithSkills } from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";
import { SkillSection } from "~/widgets/skill-section";

export function SkillsPage() {
	const { data, isLoading, isError } = useGetApiSkills();

	if (isLoading) return <LoadingState />;
	if (isError)
		return <ErrorState message="スキル情報の取得に失敗しました。" />;

	const categories = extractApiData<SkillCategoryWithSkills[]>(data) ?? [];

	return (
		<PageSection
			title="Skills"
			description="カテゴリ別の技術スタックと習熟度を示します"
		>
			<SkillSection categories={categories} />
		</PageSection>
	);
}
