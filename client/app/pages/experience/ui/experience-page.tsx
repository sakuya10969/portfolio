import type { Experience } from "~/shared/api/generated/models";
import { PageSection } from "~/shared/ui/page-section";
import { ExperienceSection } from "~/widgets/experience-section";

export function ExperiencePage({ experiences }: { experiences: Experience[] }) {
	return (
		<PageSection
			title="Experience"
			description="職歴・学歴・活動歴を時系列で示します"
		>
			<ExperienceSection experiences={experiences} />
		</PageSection>
	);
}
