import { ProjectsPage } from "~/pages/projects";

export function meta() {
	return [{ title: "Projects | Portfolio" }];
}

export default function ProjectsRoute() {
	return <ProjectsPage />;
}
