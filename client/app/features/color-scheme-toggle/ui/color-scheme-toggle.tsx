import {
	ActionIcon,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light");

	return (
		<ActionIcon
			variant="subtle"
			color="gray"
			size="lg"
			aria-label="Toggle color scheme"
			onClick={() =>
				setColorScheme(computedColorScheme === "light" ? "dark" : "light")
			}
		>
			{computedColorScheme === "light" ? (
				<IconMoon size={18} />
			) : (
				<IconSun size={18} />
			)}
		</ActionIcon>
	);
}
