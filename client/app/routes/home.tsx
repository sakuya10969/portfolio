import { HomePage } from "~/pages/home";
import { getApiProfile } from "~/shared/api/generated/endpoints/profile/profile";
import { getApiProjects } from "~/shared/api/generated/endpoints/projects/projects";
import { getApiSkills } from "~/shared/api/generated/endpoints/skills/skills";
import type {
	ProfileResponse,
	ProjectListResponse,
	SkillListResponse,
} from "~/shared/api/generated/models";
import { SITE_DESCRIPTION, SITE_NAME } from "~/shared/config/site";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: SITE_NAME },
		{ name: "description", content: SITE_DESCRIPTION },
	];
}

export async function loader(_: Route.LoaderArgs) {
	const [profileResponse, projectsResponse, skillsResponse] = await Promise.all(
		[getApiProfile(), getApiProjects(), getApiSkills()],
	);
	const profile = unwrapApiResponse<ProfileResponse>(profileResponse);
	const projects = unwrapApiResponse<ProjectListResponse>(projectsResponse);
	const skills = unwrapApiResponse<SkillListResponse>(skillsResponse);

	return {
		profile: profile.data,
		projects: projects.data,
		skillCategories: skills.data,
	};
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
	return (
		<HomePage
			profile={loaderData.profile}
			projects={loaderData.projects}
			skillCategories={loaderData.skillCategories}
		/>
	);
}
