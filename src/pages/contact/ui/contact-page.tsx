import { ContactSection } from '@/widgets/contact-section';
import { SectionWrapper } from '@/shared/ui/section-wrapper';

export function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionWrapper title="Contact" description="お問い合わせ">
        <ContactSection />
      </SectionWrapper>
    </div>
  );
}
