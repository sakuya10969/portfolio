import { ProjectFilter } from "~/features/project-filter";
import type {
	ProjectCategory,
	ProjectListResponse,
} from "~/shared/api/generated/models";

type Props = {
	categories: ProjectCategory[];
	initialCategory?: string;
	projects: ProjectListResponse["data"];
};

export function ProjectListSection({
	categories,
	initialCategory,
	projects,
}: Props) {
	return (
		<ProjectFilter
			categories={categories}
			initialCategory={initialCategory}
			initialProjects={projects}
		/>
	);
}
