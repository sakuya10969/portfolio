import { ProjectFilter } from "~/features/project-filter";
import type {
	Project,
	ProjectCategory,
} from "~/shared/api/generated/models";

type Props = {
	categories: ProjectCategory[];
	activeCategory?: string;
	projects: Project[];
};

export function ProjectListSection({
	categories,
	activeCategory,
	projects,
}: Props) {
	return (
		<ProjectFilter
			categories={categories}
			activeCategory={activeCategory}
			projects={projects}
		/>
	);
}
