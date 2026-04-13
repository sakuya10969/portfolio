import { AboutPage } from "~/pages/about";
import { getApiProfile } from "~/shared/api/generated/endpoints/profile/profile";
import type { ProfileResponse } from "~/shared/api/generated/models";
import { unwrapApiResponse } from "~/shared/lib/api";
import type { Route } from "./+types/about";

export function meta() {
	return [{ title: "About | Portfolio" }];
}

export async function loader(_: Route.LoaderArgs) {
	const response = await getApiProfile();
	const payload = unwrapApiResponse<ProfileResponse>(response);

	return { profile: payload.data };
}

export default function AboutRoute({ loaderData }: Route.ComponentProps) {
	return <AboutPage profile={loaderData.profile} />;
}
