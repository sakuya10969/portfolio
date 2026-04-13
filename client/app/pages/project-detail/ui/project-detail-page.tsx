import {
	Badge,
	Button,
	Card,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	IconArrowLeft,
	IconExternalLink,
	IconFileText,
} from "@tabler/icons-react";
import { FaGithub } from "react-icons/fa6";
import { NavLink } from "react-router";
import { useGetApiProjectsSlug } from "~/shared/api/generated/endpoints/projects/projects";
import type { Project, ProjectLink, ProjectLinkType, Technology } from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";
import { TechnologyBadge } from "~/shared/ui/technology-badge";

const linkIcons: Record<
	ProjectLinkType,
	React.ComponentType<{ size?: number }>
> = {
	demo: IconExternalLink,
	docs: IconFileText,
	github: FaGithub,
	other: IconExternalLink,
};

export function ProjectDetailPage({ slug }: { slug: string }) {
	const { data, isLoading, isError } = useGetApiProjectsSlug(slug);

	if (isLoading) return <LoadingState />;
	if (isError)
		return <ErrorState message="プロジェクトの取得に失敗しました。" />;

	const project = extractApiData<Project>(data);
	if (!project) return <ErrorState message="プロジェクトが見つかりません。" />;

	const sections = [
		{ title: "背景・制作動機", content: project.background },
		{ title: "設計・アーキテクチャ", content: project.architecture },
		{ title: "工夫した点", content: project.highlights },
		{ title: "苦労した点", content: project.challenges },
		{ title: "今後の改善予定", content: project.futureWork },
	].filter((section) => section.content);

	return (
		<PageSection title={project.title} description={project.summary}>
			<Stack gap="xl">
				<Button
					component={NavLink}
					to="/projects"
					variant="subtle"
					color="gray"
					leftSection={<IconArrowLeft size={16} />}
					w="fit-content"
				>
					プロジェクト一覧へ
				</Button>

				<Group>
					<Badge color="blue" variant="light">
						{project.category.name}
					</Badge>
					{project.technologies.map((technology: Technology) => (
						<TechnologyBadge
							key={technology.id}
							name={technology.name}
							size="sm"
						/>
					))}
				</Group>

				{project.links.length ? (
					<Group>
						{project.links.map((link: ProjectLink) => {
							const Icon = linkIcons[link.type] ?? IconExternalLink;

							return (
								<Button
									key={link.id}
									component="a"
									href={link.url}
									target="_blank"
									rel="noreferrer"
									variant="outline"
									color="gray"
									leftSection={<Icon size={16} />}
								>
									{link.label ?? link.type}
								</Button>
							);
						})}
					</Group>
				) : null}

				<SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
					{sections.map((section) => (
						<Card key={section.title} p="lg">
							<Stack gap="sm">
								<Title order={3} fz="h4">
									{section.title}
								</Title>
								<Text c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
									{section.content}
								</Text>
							</Stack>
						</Card>
					))}
				</SimpleGrid>
			</Stack>
		</PageSection>
	);
}
