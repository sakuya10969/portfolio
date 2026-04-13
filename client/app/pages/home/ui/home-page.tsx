import { Button, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { NavLink } from "react-router";
import { ProjectCard } from "~/entities/project";
import { useGetApiProfile } from "~/shared/api/generated/endpoints/profile/profile";
import { useGetApiProjects } from "~/shared/api/generated/endpoints/projects/projects";
import { useGetApiSkills } from "~/shared/api/generated/endpoints/skills/skills";
import type {
	Profile,
	Project,
	SkillCategoryWithSkills,
} from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";
import { TechnologyBadge } from "~/shared/ui/technology-badge";
import { HeroSection } from "~/widgets/hero-section";

export function HomePage() {
	const profileQuery = useGetApiProfile();
	const projectsQuery = useGetApiProjects();
	const skillsQuery = useGetApiSkills();

	const isLoading =
		profileQuery.isLoading || projectsQuery.isLoading || skillsQuery.isLoading;
	const isError =
		profileQuery.isError || projectsQuery.isError || skillsQuery.isError;

	if (isLoading) {
		return (
			<>
				<HeroSection />
				<LoadingState />
			</>
		);
	}

	if (isError) {
		return (
			<>
				<HeroSection />
				<ErrorState message="データの取得に失敗しました。" />
			</>
		);
	}

	const profile = extractApiData<Profile>(profileQuery.data);
	const projects = extractApiData<Project[]>(projectsQuery.data) ?? [];
	const skillCategories =
		extractApiData<SkillCategoryWithSkills[]>(skillsQuery.data) ?? [];

	const technologies = [
		...new Set(
			skillCategories.flatMap((category) =>
				category.skills.map((skill) => skill.technology?.name ?? skill.name),
			),
		),
	].slice(0, 16);

	return (
		<>
			<HeroSection />
			{profile ? (
				<PageSection title="About Snapshot" description={profile.title}>
					<p className="rich-text">{profile.bio}</p>
				</PageSection>
			) : null}
			<PageSection
				title="注目のプロジェクト"
				description="最近取り組んだ代表的な作品を紹介します"
			>
				<div className="project-grid">
					{projects.slice(0, 3).map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
				<Group justify="center">
					<Button
						component={NavLink}
						to="/projects"
						variant="outline"
						color="gray"
						rightSection={<IconArrowRight size={16} />}
					>
						全てのプロジェクトを見る
					</Button>
				</Group>
			</PageSection>
			<PageSection
				title="技術スタック"
				description="日常的に使用している技術の一部です"
			>
				<div className="tech-badge-wrap">
					{technologies.map((technology) => (
						<TechnologyBadge key={technology} name={technology} />
					))}
				</div>
			</PageSection>
		</>
	);
}
