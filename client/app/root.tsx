import {
	Anchor,
	AppShell,
	Burger,
	Button,
	ColorSchemeScript,
	Container,
	createTheme,
	Divider,
	Group,
	MantineProvider,
	mantineHtmlProps,
	Stack,
	Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { NAV_LINKS, SITE_NAME, SITE_URL } from "~/shared/config/site";

const theme = createTheme({
	primaryColor: "blue",
	fontFamily: "'Noto Serif Japanese', 'Noto Serif', serif",
	defaultRadius: "md",
	colors: {
		blue: [
			"#EBF4FF",
			"#D6E8FF",
			"#B3D7FF",
			"#80BFFF",
			"#4DA6FF",
			"#1A8CFF",
			"#0066CC",
			"#0052A3",
			"#003D7A",
			"#002952",
		],
		gray: [
			"#F8F9FA",
			"#F1F3F5",
			"#E9ECEF",
			"#DEE2E6",
			"#CED4DA",
			"#ADB5BD",
			"#868E96",
			"#495057",
			"#343A40",
			"#212529",
		],
	},
	components: {
		Button: {
			defaultProps: {
				radius: "md",
			},
		},
		Card: {
			defaultProps: {
				radius: "md",
				withBorder: true,
			},
		},
		Paper: {
			defaultProps: {
				radius: "md",
			},
		},
		TextInput: {
			defaultProps: {
				radius: "md",
				size: "md",
			},
		},
		Textarea: {
			defaultProps: {
				radius: "md",
				size: "md",
			},
		},
	},
});

function AppHeader() {
	const location = useLocation();
	const [opened, { toggle, close }] = useDisclosure(false);

	return (
		<AppShell.Header className="app-header">
			<Container size={1120} h="100%">
				<Group h="100%" justify="space-between">
					<Anchor
						component={NavLink}
						to="/"
						underline="never"
						fw={700}
						c="dark.8"
						size="lg"
					>
						{SITE_NAME}
					</Anchor>

					<Group gap="lg" visibleFrom="md">
						{NAV_LINKS.map((link) => (
							<Anchor
								key={link.href}
								component={NavLink}
								to={link.href}
								underline="never"
								className={
									location.pathname === link.href
										? "nav-link nav-link-active"
										: "nav-link"
								}
							>
								{link.label}
							</Anchor>
						))}
					</Group>

					<Group gap="xs">
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="md"
							aria-label="Toggle navigation"
						/>
					</Group>
				</Group>
			</Container>

			{opened ? (
				<div className="mobile-nav">
					<Container size={1120} py="md">
						<Stack gap="sm">
							{NAV_LINKS.map((link) => (
								<Button
									key={link.href}
									component={NavLink}
									to={link.href}
									variant={
										location.pathname === link.href ? "filled" : "subtle"
									}
									justify="flex-start"
									onClick={close}
								>
									{link.label}
								</Button>
							))}
						</Stack>
					</Container>
				</div>
			) : null}
		</AppShell.Header>
	);
}

function AppFooter() {
	const year = new Date().getFullYear();

	return (
		<AppShell.Footer withBorder={false}>
			<Container size={1120} py="lg">
				<Divider mb="lg" />
				<Group justify="space-between" align="center">
					<Text size="xs" c="dimmed">
						© {year} {SITE_NAME}. All rights reserved.
					</Text>
					<Group gap="sm">
						<Anchor
							href="https://github.com/sakuya10969"
							c="dimmed"
							aria-label="GitHub"
						>
							<FaGithub size={24} />
						</Anchor>
						<Anchor href="https://twitter.com" c="dimmed" aria-label="X">
							<FaSquareXTwitter size={24} />
						</Anchor>
						<Anchor
							href="https://www.linkedin.com/in/sakuya-fukuda-07858a329/"
							c="dimmed"
							aria-label="LinkedIn"
						>
							<FaLinkedin size={24} />
						</Anchor>
					</Group>
				</Group>
			</Container>
		</AppShell.Footer>
	);
}

function AppProviders({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60_000,
						retry: 1,
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: 0,
					},
				},
			}),
	);

	return (
		<MantineProvider theme={theme} forceColorScheme="light">
			<Notifications />
			<ModalsProvider>
				<QueryClientProvider client={queryClient}>
					{children}
					{import.meta.env.DEV ? (
						<ReactQueryDevtools initialIsOpen={false} />
					) : null}
				</QueryClientProvider>
			</ModalsProvider>
		</MantineProvider>
	);
}

const HOME_INTRO_STORAGE_KEY = "home-intro-played";
const COUNTDOWN_STEPS = ["3", "2", "1"] as const;

type HomeIntroScreenProps = {
	active: boolean;
	onComplete: () => void;
};

function HomeIntroScreen({ active, onComplete }: HomeIntroScreenProps) {
	const prefersReducedMotion = useReducedMotion();
	const [countIndex, setCountIndex] = useState(0);
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (!active) {
			setCountIndex(0);
			setIsExiting(false);
			return;
		}

		setCountIndex(0);
		setIsExiting(false);

		if (prefersReducedMotion) {
			const timeoutId = window.setTimeout(() => {
				setIsExiting(true);
			}, 900);

			return () => {
				window.clearTimeout(timeoutId);
			};
		}

		const intervalId = window.setInterval(() => {
			setCountIndex((current) => {
				if (current >= COUNTDOWN_STEPS.length - 1) {
					window.clearInterval(intervalId);
					return current;
				}

				return current + 1;
			});
		}, 700);

		const timeoutId = window.setTimeout(() => {
			window.clearInterval(intervalId);
			setIsExiting(true);
		}, 2_750);

		return () => {
			window.clearInterval(intervalId);
			window.clearTimeout(timeoutId);
		};
	}, [active, prefersReducedMotion]);

	return (
		<motion.div
			className="home-intro"
			initial={{ opacity: 1 }}
			animate={
				isExiting
					? {
							opacity: 0,
							scale: prefersReducedMotion ? 1 : 1.04,
							filter: prefersReducedMotion ? "none" : "blur(10px)",
						}
					: {
							opacity: 1,
							scale: 1,
							filter: "blur(0px)",
						}
			}
			transition={{
				duration: prefersReducedMotion ? 0.2 : 0.45,
				ease: "easeInOut",
			}}
			onAnimationComplete={() => {
				if (isExiting) {
					onComplete();
				}
			}}
		>
			<motion.p
				className="home-intro__account"
				initial={{ opacity: 0, y: 24, letterSpacing: "0.18em" }}
				animate={{
					opacity: 1,
					y: 0,
					letterSpacing: "0.28em",
				}}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				sakuya10969
			</motion.p>
			<AnimatePresence mode="wait">
				<motion.div
					key={COUNTDOWN_STEPS[countIndex]}
					className="home-intro__count"
					initial={{ opacity: 0, scale: 0.78, y: 16 }}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						scale: 1.08,
						y: -20,
					}}
					transition={{ duration: 0.38, ease: [0.2, 1, 0.3, 1] }}
				>
					{COUNTDOWN_STEPS[countIndex]}
				</motion.div>
			</AnimatePresence>
			<motion.div
				className="home-intro__line"
				initial={{ scaleX: 0, opacity: 0 }}
				animate={{ scaleX: 1, opacity: 1 }}
				transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
			/>
			<motion.p
				className="home-intro__caption"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 0.7, y: 0 }}
				transition={{ delay: 0.15, duration: 0.45 }}
			>
				GitHub Portfolio
			</motion.p>
		</motion.div>
	);
}

export const links: Route.LinksFunction = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700;800&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja" {...mantineHtmlProps}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<ColorSchemeScript defaultColorScheme="light" />
				<Meta />
				<Links />
			</head>
			<body>
				<AppProviders>{children}</AppProviders>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const location = useLocation();
	const [introState, setIntroState] = useState<"pending" | "playing" | "done">(
		location.pathname === "/" ? "pending" : "done",
	);

	useEffect(() => {
		if (location.pathname !== "/") {
			setIntroState("done");
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		if (window.sessionStorage.getItem(HOME_INTRO_STORAGE_KEY) === "true") {
			setIntroState("done");
			return;
		}

		setIntroState("playing");
	}, [location.pathname]);

	if (location.pathname === "/" && introState !== "done") {
		return (
			<HomeIntroScreen
				active={introState === "playing"}
				onComplete={() => {
					window.sessionStorage.setItem(HOME_INTRO_STORAGE_KEY, "true");
					setIntroState("done");
				}}
			/>
		);
	}

	return (
		<AppShell header={{ height: 64 }} footer={{ height: 88 }}>
			<AppHeader />
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
			<AppFooter />
		</AppShell>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let title = "Error";
	let description = "An unexpected error occurred.";

	if (isRouteErrorResponse(error)) {
		title = error.status === 404 ? "404" : "Error";
		description =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || description;
	} else if (error instanceof Error) {
		description = error.message;
	}

	return (
		<Container size="sm" py={120}>
			<Stack gap="md">
				<Text size="3rem" fw={800}>
					{title}
				</Text>
				<Text c="dimmed">{description}</Text>
				<Button component={NavLink} to="/" w="fit-content">
					Back to home
				</Button>
				<Text size="sm" c="dimmed">
					{SITE_URL}
				</Text>
			</Stack>
		</Container>
	);
}
