import { ExperiencePage } from "~/pages/experience";
import { getApiExperiences } from "~/shared/api/generated/endpoints/experiences/experiences";
import type { ExperienceListResponse } from "~/shared/api/generated/models";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/experience";

export function meta() {
	return [{ title: "Experience | Portfolio" }];
}

export async function loader(_: Route.LoaderArgs) {
	const response = await getApiExperiences();
	const payload = unwrapApiResponse<ExperienceListResponse>(response);

	return { experiences: payload.data };
}

export default function ExperienceRoute({ loaderData }: Route.ComponentProps) {
	return <ExperiencePage experiences={loaderData.experiences} />;
}
