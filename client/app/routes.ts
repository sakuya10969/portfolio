import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("about", "routes/about.tsx"),
	route("projects", "routes/projects.tsx"),
	route("projects/:slug", "routes/project-detail.tsx"),
	route("skills", "routes/skills.tsx"),
	route("experience", "routes/experience.tsx"),
	route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
