import { ProjectDetailPage } from "~/pages/project-detail";
import { useParams } from "react-router";

export function meta() {
	return [{ title: "Project | Portfolio" }];
}

export default function ProjectDetailRoute() {
	const { slug } = useParams();
	return <ProjectDetailPage slug={slug ?? ""} />;
}
