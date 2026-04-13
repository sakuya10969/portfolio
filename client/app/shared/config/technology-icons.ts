import type { IconType } from "react-icons";
import { DiMsqlServer } from "react-icons/di";
import {
	FaAws,
	FaDocker,
	FaNodeJs,
	FaPhp,
	FaPython,
	FaReact,
} from "react-icons/fa6";
import {
	SiDjango,
	SiFastapi,
	SiGooglecloud,
	SiGraphql,
	SiGsap,
	SiHasura,
	SiJest,
	SiLaravel,
	SiMysql,
	SiNestjs,
	SiPostgresql,
	SiPrisma,
	SiPytest,
	SiStorybook,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
	SiZod,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

type TechnologyIconEntry = {
	color: string;
	icon: IconType;
};

const ICON_MAP: Record<string, TechnologyIconEntry> = {
	typescript: { icon: SiTypescript, color: "#228BE6" },
	python: { icon: FaPython, color: "#FCC419" },
	php: { icon: FaPhp, color: "#7950F2" },
	go: { icon: FaReact, color: "#15AABF" },
	golang: { icon: FaReact, color: "#15AABF" },
	react: { icon: FaReact, color: "#15AABF" },
	"next.js": { icon: SiVercel, color: "#212529" },
	nextjs: { icon: SiVercel, color: "#212529" },
	next: { icon: SiVercel, color: "#212529" },
	"tailwind css": { icon: SiTailwindcss, color: "#15AABF" },
	tailwind: { icon: SiTailwindcss, color: "#15AABF" },
	gsap: { icon: SiGsap, color: "#82C91E" },
	storybook: { icon: SiStorybook, color: "#EB2F96" },
	"node.js": { icon: FaNodeJs, color: "#82C91E" },
	nodejs: { icon: FaNodeJs, color: "#82C91E" },
	node: { icon: FaNodeJs, color: "#82C91E" },
	nestjs: { icon: SiNestjs, color: "#FA5252" },
	fastapi: { icon: SiFastapi, color: "#12B886" },
	django: { icon: SiDjango, color: "#2B8A3E" },
	laravel: { icon: SiLaravel, color: "#FA5252" },
	graphql: { icon: SiGraphql, color: "#CC5DE8" },
	hasura: { icon: SiHasura, color: "#7950F2" },
	postgresql: { icon: SiPostgresql, color: "#1971C2" },
	postgres: { icon: SiPostgresql, color: "#1971C2" },
	mysql: { icon: SiMysql, color: "#1864AB" },
	"sql server": { icon: DiMsqlServer, color: "#1971C2" },
	prisma: { icon: SiPrisma, color: "#212529" },
	aws: { icon: FaAws, color: "#FD7E14" },
	"google cloud": { icon: SiGooglecloud, color: "#339AF0" },
	gcp: { icon: SiGooglecloud, color: "#339AF0" },
	"microsoft azure": { icon: VscAzure, color: "#228BE6" },
	azure: { icon: VscAzure, color: "#228BE6" },
	docker: { icon: FaDocker, color: "#228BE6" },
	jest: { icon: SiJest, color: "#C92A2A" },
	pytest: { icon: SiPytest, color: "#E67700" },
	zod: { icon: SiZod, color: "#228BE6" },
};

export function normalizeTechnologyName(name: string) {
	return name.trim().toLowerCase();
}

export function getTechnologyIcon(name: string) {
	return ICON_MAP[normalizeTechnologyName(name)] ?? null;
}
