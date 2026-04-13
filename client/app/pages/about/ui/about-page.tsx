import { ProfileIntro } from "~/entities/profile";
import { useGetApiProfile } from "~/shared/api/generated/endpoints/profile/profile";
import type { Profile } from "~/shared/api/generated/models";
import { extractApiData } from "~/shared/lib/api";
import { PageSection } from "~/shared/ui/page-section";
import { ErrorState, LoadingState } from "~/shared/ui/states";

export function AboutPage() {
	const { data, isLoading, isError } = useGetApiProfile();

	if (isLoading) return <LoadingState />;
	if (isError) return <ErrorState message="プロフィールの取得に失敗しました。" />;

	const profile = extractApiData<Profile>(data);
	if (!profile) return <ErrorState message="プロフィールが見つかりません。" />;

	return (
		<PageSection title="About Me" description="プロフィールとソーシャルリンク">
			<ProfileIntro profile={profile} />
		</PageSection>
	);
}
