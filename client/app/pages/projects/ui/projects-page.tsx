import { useSearchParams } from "react-router";
import {
	useGetApiProjects,
	useGetApiProjectsCategories,
} from "~/shared/api/generated/endpoints/projects/projects";
import type { Project, ProjectCategory } from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";
import { ProjectListSection } from "~/widgets/project-list-section";

export function ProjectsPage() {
	const [searchParams] = useSearchParams();
	const category = searchParams.get("category") ?? undefined;

	const categoriesQuery = useGetApiProjectsCategories();
	const projectsQuery = useGetApiProjects(
		category ? { category } : undefined,
	);

	const isLoading = categoriesQuery.isLoading || projectsQuery.isLoading;
	const isError = categoriesQuery.isError || projectsQuery.isError;

	if (isLoading) return <LoadingState />;
	if (isError)
		return <ErrorState message="プロジェクトの取得に失敗しました。" />;

	const categories =
		extractApiData<ProjectCategory[]>(categoriesQuery.data) ?? [];
	const projects = extractApiData<Project[]>(projectsQuery.data) ?? [];

	return (
		<PageSection
			title="Projects"
			description="これまでに制作したプロジェクト一覧です"
		>
			<ProjectListSection
				categories={categories}
				activeCategory={category}
				projects={projects}
			/>
		</PageSection>
	);
}
