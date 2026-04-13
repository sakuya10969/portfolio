import { ProjectsPage } from "~/pages/projects";
import {
	getApiProjects,
	getApiProjectsCategories,
} from "~/shared/api/generated/endpoints/projects/projects";
import type {
	CategoryListResponse,
	ProjectListResponse,
} from "~/shared/api/generated/models";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/projects";

export function meta() {
	return [{ title: "Projects | Portfolio" }];
}

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const category = url.searchParams.get("category") ?? undefined;
	const [projectsResponse, categoriesResponse] = await Promise.all([
		getApiProjects(category ? { category } : undefined),
		getApiProjectsCategories(),
	]);
	const projects = unwrapApiResponse<ProjectListResponse>(projectsResponse);
	const categories =
		unwrapApiResponse<CategoryListResponse>(categoriesResponse);

	return {
		categories: categories.data,
		initialCategory: category,
		projects: projects.data,
	};
}

export default function ProjectsRoute({ loaderData }: Route.ComponentProps) {
	return (
		<ProjectsPage
			categories={loaderData.categories}
			initialCategory={loaderData.initialCategory}
			projects={loaderData.projects}
		/>
	);
}
