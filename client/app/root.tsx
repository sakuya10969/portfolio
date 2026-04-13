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
import { useState } from "react";
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
import { ColorSchemeToggle } from "~/features/color-scheme-toggle";
import { NAV_LINKS, SITE_NAME, SITE_URL } from "~/shared/config/site";

const theme = createTheme({
	primaryColor: "blue",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	defaultRadius: "md",
	colors: {
		blue: [
			"#E7F5FF",
			"#D0EBFF",
			"#A5D8FF",
			"#74C0FC",
			"#4DABF7",
			"#339AF0",
			"#228BE6",
			"#1C7ED6",
			"#1971C2",
			"#1864AB",
		],
		lime: [
			"#F4FCE3",
			"#E9FAC8",
			"#D8F5A2",
			"#C0EB75",
			"#A9E34B",
			"#94D82D",
			"#82C91E",
			"#74B816",
			"#66A80F",
			"#5C940D",
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
						<ColorSchemeToggle />
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
		<MantineProvider theme={theme} defaultColorScheme="light">
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

export const links: Route.LinksFunction = () => [];

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
