import { PageSection } from "~/shared/ui/page-section";
import { ContactSection } from "~/widgets/contact-section";

export function ContactPage() {
	return (
		<PageSection title="Contact" description="お問い合わせ">
			<ContactSection />
		</PageSection>
	);
}
