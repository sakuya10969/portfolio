import { Badge, Group, Text } from "@mantine/core";
import { getTechnologyIcon } from "~/shared/config/technology-icons";

type Props = {
	name: string;
	size?: "sm" | "md";
};

export function TechnologyBadge({ name, size = "md" }: Props) {
	const entry = getTechnologyIcon(name);
	const Icon = entry?.icon;

	return (
		<Badge
			size={size}
			variant="light"
			color="gray"
			radius="sm"
			styles={{
				root: {
					border: "1px solid var(--mantine-color-gray-3)",
					background: "var(--mantine-color-gray-0)",
					color: "var(--mantine-color-dark-6)",
					textTransform: "none",
				},
				label: {
					fontWeight: 500,
					paddingInline: 0,
				},
			}}
			leftSection={
				Icon ? (
					<Icon
						size={size === "sm" ? 14 : 16}
						color={entry?.color}
						aria-hidden
					/>
				) : undefined
			}
		>
			<Group gap={4} wrap="nowrap">
				<Text inherit>{name}</Text>
			</Group>
		</Badge>
	);
}
