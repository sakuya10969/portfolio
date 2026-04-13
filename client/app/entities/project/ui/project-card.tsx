import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import type { Project } from "~/shared/api/generated/models";
import { TechnologyBadge } from "~/shared/ui/technology-badge";

export function ProjectCard({ project }: { project: Project }) {
	return (
		<Card
			component={motion.div}
			whileHover={{ y: -3 }}
			p="lg"
			h="100%"
			styles={{
				root: {
					display: "flex",
					flexDirection: "column",
					transition:
						"box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease",
				},
			}}
		>
			<Stack gap="md" h="100%">
				<Group justify="space-between" align="flex-start">
					<Title order={3} fz="h4" lineClamp={2}>
						<Text
							component={NavLink}
							to={`/projects/${project.slug}`}
							inherit
							td="none"
							c="inherit"
						>
							{project.title}
						</Text>
					</Title>
					<Badge color="blue" variant="light" size="sm">
						{project.category.name}
					</Badge>
				</Group>

				<Text c="dimmed" size="sm" style={{ flex: 1 }}>
					{project.summary}
				</Text>

				<Group gap="xs">
					{project.technologies.slice(0, 5).map((technology) => (
						<TechnologyBadge
							key={technology.id}
							name={technology.name}
							size="sm"
						/>
					))}
					{project.technologies.length > 5 ? (
						<Badge variant="outline">+{project.technologies.length - 5}</Badge>
					) : null}
				</Group>
			</Stack>
		</Card>
	);
}
