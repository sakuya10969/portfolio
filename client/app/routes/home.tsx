import { HomePage } from "~/pages/home";
import { SITE_DESCRIPTION, SITE_NAME } from "~/shared/config/site";

export function meta() {
	return [
		{ title: SITE_NAME },
		{ name: "description", content: SITE_DESCRIPTION },
	];
}

export default function HomeRoute() {
	return <HomePage />;
}
