import { Center, Loader, Stack, Text } from "@mantine/core";

export function LoadingState({ minHeight = 240 }: { minHeight?: number }) {
	return (
		<Center mih={minHeight}>
			<Loader color="blue" />
		</Center>
	);
}

export function EmptyState({ message }: { message: string }) {
	return (
		<Center mih={200}>
			<Text c="dimmed">{message}</Text>
		</Center>
	);
}

export function ErrorState({ message }: { message: string }) {
	return (
		<Center mih={200}>
			<Stack gap="xs" align="center">
				<Text fw={600}>Error</Text>
				<Text c="dimmed">{message}</Text>
			</Stack>
		</Center>
	);
}
