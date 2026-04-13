import { useGetApiExperiences } from "~/shared/api/generated/endpoints/experiences/experiences";
import type { Experience } from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";
import { ExperienceSection } from "~/widgets/experience-section";

export function ExperiencePage() {
	const { data, isLoading, isError } = useGetApiExperiences();

	if (isLoading) return <LoadingState />;
	if (isError)
		return <ErrorState message="経歴情報の取得に失敗しました。" />;

	const experiences = extractApiData<Experience[]>(data) ?? [];

	return (
		<PageSection
			title="Experience"
			description="職歴・学歴・活動歴を時系列で示します"
		>
			<ExperienceSection experiences={experiences} />
		</PageSection>
	);
}
