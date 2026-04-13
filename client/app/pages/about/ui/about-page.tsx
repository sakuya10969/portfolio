import { ProfileIntro } from "~/entities/profile";
import type { Profile } from "~/shared/api/generated/models";
import { PageSection } from "~/shared/ui/page-section";

export function AboutPage({ profile }: { profile: Profile }) {
	return (
		<PageSection title="About Me" description="プロフィールとソーシャルリンク">
			<ProfileIntro profile={profile} />
		</PageSection>
	);
}
