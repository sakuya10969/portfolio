export const SITE_NAME = "sakuya10969's Portfolio";
export const SITE_DESCRIPTION =
	"Full-stack developer portfolio showcasing projects, skills, and experience.";
export const SITE_URL =
	import.meta.env.VITE_SITE_URL ?? "http://localhost:5173";

export const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/skills", label: "Skills" },
	{ href: "/experience", label: "Experience" },
	{ href: "/contact", label: "Contact" },
] as const;
