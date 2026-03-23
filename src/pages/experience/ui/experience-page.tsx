import { ExperienceSection } from "@/widgets/experience-section";
import { SectionWrapper } from "@/shared/ui/section-wrapper";

export function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionWrapper title="Experience" description="職歴・学歴・活動歴を時系列で示します">
        <ExperienceSection />
      </SectionWrapper>
    </div>
  );
}
