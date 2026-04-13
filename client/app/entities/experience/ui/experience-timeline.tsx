import {
	Card,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Timeline,
	Title,
} from "@mantine/core";
import { IconActivity, IconBriefcase, IconSchool } from "@tabler/icons-react";
import type { Experience } from "~/shared/api/generated/models";
import { formatMonth } from "~/shared/lib/format";

const typeMeta = {
	activity: { color: "orange", icon: IconActivity, label: "活動" },
	education: { color: "violet", icon: IconSchool, label: "学歴" },
	work: { color: "blue", icon: IconBriefcase, label: "職歴" },
} as const;

export function ExperienceTimeline({
	experiences,
}: {
	experiences: Experience[];
}) {
	return (
		<Timeline active={experiences.length} bulletSize={24} lineWidth={2}>
			{experiences.map((experience) => {
				const meta = typeMeta[experience.type];
				const Icon = meta.icon;

				return (
					<Timeline.Item
						key={experience.id}
						bullet={
							<ThemeIcon color={meta.color} radius="xl" size={24}>
								<Icon size={14} />
							</ThemeIcon>
						}
						title={
							<Group gap="xs">
								<Text fw={600}>{experience.organization}</Text>
								<Text size="xs" c={`${meta.color}.6`}>
									{meta.label}
								</Text>
							</Group>
						}
					>
						<Card mt="xs" p="md">
							<Stack gap="xs">
								<Text size="xs" c="dimmed">
									{formatMonth(experience.startDate)} -{" "}
									{experience.endDate
										? formatMonth(experience.endDate)
										: "現在"}
								</Text>
								<Title order={3} fz="h4" c="blue.7">
									{experience.role}
								</Title>
								<Text c="dimmed" size="sm">
									{experience.description}
								</Text>
							</Stack>
						</Card>
					</Timeline.Item>
				);
			})}
		</Timeline>
	);
}
