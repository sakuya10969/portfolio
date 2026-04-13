import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { NavLink } from "react-router";
import { ProjectCard } from "~/entities/project";
import type { Project, ProjectCategory } from "~/shared/api/generated/models";
import { EmptyState } from "~/shared/ui/states";

type Props = {
	categories: ProjectCategory[];
	activeCategory?: string;
	projects: Project[];
};

export function ProjectFilter({
	categories,
	activeCategory = "",
	projects,
}: Props) {
	return (
		<Stack gap="xl">
			<Stack gap="sm">
				<Text size="sm" fw={500} c="dimmed">
					カテゴリ
				</Text>
				<Group gap="sm">
					<Badge
						component={NavLink}
						to="/projects"
						size="lg"
						variant={!activeCategory ? "filled" : "light"}
						color={!activeCategory ? "blue" : "gray"}
						radius="xl"
						styles={{ root: { cursor: "pointer", textTransform: "none" } }}
					>
						全て
					</Badge>
					{categories.map((category) => (
						<Badge
							key={category.id}
							component={NavLink}
							to={`/projects?category=${category.slug}`}
							size="lg"
							variant={activeCategory === category.slug ? "filled" : "light"}
							color={activeCategory === category.slug ? "blue" : "gray"}
							radius="xl"
							styles={{ root: { cursor: "pointer", textTransform: "none" } }}
						>
							{category.name}
						</Badge>
					))}
					{activeCategory ? (
						<Button
							component={NavLink}
							to="/projects"
							variant="subtle"
							color="gray"
							size="xs"
						>
							Clear
						</Button>
					) : null}
				</Group>
			</Stack>

			{projects.length === 0 ? (
				<EmptyState message="該当するプロジェクトがありません。" />
			) : (
				<div className="project-grid">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</Stack>
	);
}
