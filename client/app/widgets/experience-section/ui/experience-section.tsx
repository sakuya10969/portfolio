import { ExperienceTimeline } from "~/entities/experience";
import type { Experience } from "~/shared/api/generated/models";

export function ExperienceSection({
	experiences,
}: {
	experiences: Experience[];
}) {
	return <ExperienceTimeline experiences={experiences} />;
}
