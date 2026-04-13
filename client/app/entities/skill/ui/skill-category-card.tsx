import { Card, Group, Progress, Stack, Text, Title } from "@mantine/core";
import type { SkillCategoryWithSkills } from "~/shared/api/generated/models";
import { TechnologyBadge } from "~/shared/ui/technology-badge";

const proficiencyMeta = {
	beginner: { color: "gray", value: 25, label: "初級" },
	intermediate: { color: "lime", value: 55, label: "中級" },
	advanced: { color: "cyan", value: 78, label: "上級" },
	expert: { color: "blue", value: 100, label: "エキスパート" },
} as const;

export function SkillCategoryCard({
	category,
}: {
	category: SkillCategoryWithSkills;
}) {
	return (
		<Card p="lg">
			<Stack gap="lg">
				<Stack gap={6}>
					<Title order={3} fz="h4">
						{category.name}
					</Title>
					<div className="section-accent" />
				</Stack>

				<Stack gap="md">
					{category.skills.map((skill) => {
						const proficiency = skill.proficiency
							? proficiencyMeta[skill.proficiency]
							: null;
						const displayName = skill.technology?.name ?? skill.name;

						return (
							<Stack key={skill.id} gap={6}>
								<Group justify="space-between" align="center">
									<TechnologyBadge name={displayName} size="sm" />
									<Text size="xs" c="dimmed">
										{proficiency?.label ?? "習熟度未設定"}
									</Text>
								</Group>
								<Progress
									value={proficiency?.value ?? 35}
									color={proficiency?.color ?? "gray"}
								/>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
		</Card>
	);
}
