import { SkillsPage } from "~/pages/skills";
import { getApiSkills } from "~/shared/api/generated/endpoints/skills/skills";
import type { SkillListResponse } from "~/shared/api/generated/models";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/skills";

export function meta() {
	return [{ title: "Skills | Portfolio" }];
}

export async function loader(_: Route.LoaderArgs) {
	const response = await getApiSkills();
	const payload = unwrapApiResponse<SkillListResponse>(response);

	return { categories: payload.data };
}

export default function SkillsRoute({ loaderData }: Route.ComponentProps) {
	return <SkillsPage categories={loaderData.categories} />;
}
