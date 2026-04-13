import {
	Badge,
	Box,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	IconArrowDown,
	IconArrowRight,
	IconCode,
	IconMapPin,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { fadeInUp, staggerContainer } from "~/shared/lib/motion";

export function HeroSection() {
	return (
		<Box className="hero-shell">
			<motion.div
				className="hero-orbit hero-orbit-left"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
			/>
			<motion.div
				className="hero-orbit hero-orbit-right"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
			/>
			<Container size={1120} h="100%">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					animate="visible"
					style={{ height: "100%" }}
				>
					<Stack justify="center" align="center" h="100%" gap="xl">
						<Badge
							component={motion.div}
							variants={fadeInUp}
							size="lg"
							radius="xl"
							leftSection={<IconCode size={14} />}
							color="blue"
							variant="light"
						>
							フルスタックエンジニア
						</Badge>

						<motion.div variants={fadeInUp}>
							<Stack gap="lg" align="center">
								<Text className="hero-eyebrow">
									GitHub / Full-stack Engineer / Portfolio
								</Text>
								<Title order={1} className="hero-title">
									福田 朔哉
								</Title>
								<Text className="hero-handle">sakuya10969</Text>
								<Divider className="hero-divider" />
								<Text c="dimmed" ta="center" maw={560} size="lg">
									TypeScript・Python・Next.js・NestJS・FastAPI・PostgreSQL
									を主軸に、設計から実装まで一貫して担い、
									プロダクト全体の密度を上げる実装を続けています。
								</Text>
							</Stack>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Group>
								<Button
									component={NavLink}
									to="/projects"
									size="lg"
									rightSection={<IconArrowRight size={16} />}
								>
									プロジェクトを見る
								</Button>
								<Button
									component={NavLink}
									to="/about"
									size="lg"
									variant="outline"
									color="gray"
								>
									プロフィール
								</Button>
							</Group>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Group gap="md">
								<Group gap={4}>
									<IconMapPin size={14} />
									<Text size="sm" c="dimmed">
										Japan
									</Text>
								</Group>
								<Text c="dimmed">•</Text>
								<Group gap={6}>
									<span className="status-dot" />
									<Text size="sm" c="dimmed">
										Open to work
									</Text>
								</Group>
							</Group>
						</motion.div>
					</Stack>
				</motion.div>
			</Container>
			<motion.div
				className="hero-scroll"
				animate={{ y: [0, 5, 0] }}
				transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
			>
				<IconArrowDown size={18} />
			</motion.div>
		</Box>
	);
}
