import type {
	ProjectCategory,
	ProjectListResponse,
} from "~/shared/api/generated/models";
import { PageSection } from "~/shared/ui/page-section";
import { ProjectListSection } from "~/widgets/project-list-section";

type Props = {
	categories: ProjectCategory[];
	initialCategory?: string;
	projects: ProjectListResponse["data"];
};

export function ProjectsPage({ categories, initialCategory, projects }: Props) {
	return (
		<PageSection
			title="Projects"
			description="これまでに制作したプロジェクト一覧です"
		>
			<ProjectListSection
				categories={categories}
				initialCategory={initialCategory}
				projects={projects}
			/>
		</PageSection>
	);
}
