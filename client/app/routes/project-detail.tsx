import { ProjectDetailPage } from "~/pages/project-detail";
import { getApiProjectsSlug } from "~/shared/api/generated/endpoints/projects/projects";
import type { ProjectDetailResponse } from "~/shared/api/generated/models";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/project-detail";

export function meta({ loaderData }: Route.MetaArgs) {
	return [{ title: `${loaderData?.project.title ?? "Project"} | Portfolio` }];
}

export async function loader({ params }: Route.LoaderArgs) {
	const response = await getApiProjectsSlug(params.slug ?? "");
	const payload = unwrapApiResponse<ProjectDetailResponse>(response);

	return { project: payload.data };
}

export default function ProjectDetailRoute({
	loaderData,
}: Route.ComponentProps) {
	return <ProjectDetailPage project={loaderData.project} />;
}
