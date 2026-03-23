import { SkillSection } from "@/widgets/skill-section";
import { SectionWrapper } from "@/shared/ui/section-wrapper";

export function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionWrapper title="Skills" description="カテゴリ別の技術スタックと習熟度を示します">
        <SkillSection />
      </SectionWrapper>
    </div>
  );
}
