import {
	ActionIcon,
	Avatar,
	Card,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import type { Profile, SocialPlatform } from "~/shared/api/generated/models";

const platformIcons: Record<
	SocialPlatform,
	React.ComponentType<{ size?: number }>
> = {
	github: FaGithub,
	linkedin: FaLinkedin,
	other: IconExternalLink,
	twitter: FaSquareXTwitter,
	website: IconExternalLink,
};

export function ProfileIntro({ profile }: { profile: Profile }) {
	return (
		<Card p="xl">
			<Stack gap="lg">
				<Group align="flex-start" wrap="wrap">
					<Avatar
						src={profile.avatarUrl}
						alt={profile.name}
						size={120}
						radius={120}
						color="blue"
					>
						{profile.name.slice(0, 2)}
					</Avatar>

					<Stack gap="xs" flex={1}>
						<Title order={1}>{profile.name}</Title>
						<Text c="dimmed" size="lg">
							{profile.title}
						</Text>
						<Text style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</Text>
						<Group gap="xs" mt="sm">
							{profile.socialLinks.map((link) => {
								const Icon = platformIcons[link.platform] ?? IconExternalLink;

								return (
									<ActionIcon
										key={link.id}
										component="a"
										href={link.url}
										target="_blank"
										rel="noreferrer"
										variant="default"
										size="lg"
										aria-label={link.platform}
									>
										<Icon size={20} />
									</ActionIcon>
								);
							})}
						</Group>
					</Stack>
				</Group>
			</Stack>
		</Card>
	);
}
