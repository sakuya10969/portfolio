import { ProjectListSection } from "@/widgets/project-list-section";
import { SectionWrapper } from "@/shared/ui/section-wrapper";
import type { ProjectFilter } from "@/entities/project";

type Props = {
  filter?: ProjectFilter;
};

export function ProjectsPage({ filter }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionWrapper title="Projects" description="これまでに制作したプロジェクト一覧です">
        <ProjectListSection filter={filter} />
      </SectionWrapper>
    </div>
  );
}
