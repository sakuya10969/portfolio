import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp } from "~/shared/lib/motion";

type Props = {
	accentColor?: string;
	children: ReactNode;
	description?: string;
	title: string;
};

export function PageSection({
	accentColor = "var(--mantine-color-blue-6)",
	children,
	description,
	title,
}: Props) {
	return (
		<Container size={1120} py={80}>
			<motion.div
				variants={fadeInUp}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-80px" }}
			>
				<Stack gap="xl">
					<Stack gap="sm">
						<Title order={2}>{title}</Title>
						<Box
							h={3}
							w={40}
							style={{ borderRadius: 999, background: accentColor }}
						/>
						{description ? (
							<Text c="dimmed" maw={720}>
								{description}
							</Text>
						) : null}
					</Stack>
					{children}
				</Stack>
			</motion.div>
		</Container>
	);
}
