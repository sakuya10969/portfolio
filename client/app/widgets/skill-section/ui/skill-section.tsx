import { SkillCategoryCard } from "~/entities/skill";
import type { SkillCategoryWithSkills } from "~/shared/api/generated/models";

export function SkillSection({
	categories,
}: {
	categories: SkillCategoryWithSkills[];
}) {
	return (
		<div className="skill-grid">
			{categories.map((category) => (
				<SkillCategoryCard key={category.id} category={category} />
			))}
		</div>
	);
}
