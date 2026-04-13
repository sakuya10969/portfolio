import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { ProjectCard } from "~/entities/project";
import { useGetApiProjects } from "~/shared/api/generated/endpoints/projects/projects";
import type {
	Project,
	ProjectCategory,
	ProjectListResponse,
} from "~/shared/api/generated/models";
import { EmptyState, ErrorState, LoadingState } from "~/shared/ui/states";

type Props = {
	categories: ProjectCategory[];
	initialCategory?: string;
	initialProjects: ProjectListResponse["data"];
};

export function ProjectFilter({
	categories,
	initialCategory,
	initialProjects,
}: Props) {
	const activeCategory = initialCategory ?? "";
	const query = useGetApiProjects(
		activeCategory ? { category: activeCategory } : undefined,
		{
			query: {
				initialData: {
					data: {
						data: initialProjects,
					},
					headers: new Headers(),
					status: 200,
				},
			},
		},
	);

	const projects: Project[] =
		query.data?.status === 200 ? query.data.data.data : [];

	return (
		<Stack gap="xl">
			<Stack gap="sm">
				<Text size="sm" fw={500} c="dimmed">
					カテゴリ
				</Text>
				<Group gap="sm">
					<Badge
						component="a"
						href="/projects"
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
							component="a"
							href={`/projects?category=${category.slug}`}
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
							component="a"
							href="/projects"
							variant="subtle"
							color="gray"
							size="xs"
						>
							Clear
						</Button>
					) : null}
				</Group>
			</Stack>

			{query.isLoading ? <LoadingState /> : null}
			{query.isError ? (
				<ErrorState message="プロジェクトの取得に失敗しました。" />
			) : null}
			{!query.isLoading && !query.isError && projects.length === 0 ? (
				<EmptyState message="該当するプロジェクトがありません。" />
			) : null}
			{!query.isLoading && !query.isError && projects.length > 0 ? (
				<div className="project-grid">
					{projects.map((project: Project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : null}
		</Stack>
	);
}
