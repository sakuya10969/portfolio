import type { SkillCategoryWithSkills } from "~/shared/api/generated/models";
import { PageSection } from "~/shared/ui/page-section";
import { SkillSection } from "~/widgets/skill-section";

export function SkillsPage({
	categories,
}: {
	categories: SkillCategoryWithSkills[];
}) {
	return (
		<PageSection
			title="Skills"
			description="カテゴリ別の技術スタックと習熟度を示します"
		>
			<SkillSection categories={categories} />
		</PageSection>
	);
}
