import { Suspense } from "react";
import { HeroSection } from "@/widgets/hero-section";
import { getProjects } from "@/entities/project";
import { ProjectCard } from "@/entities/project";
import { getSkills } from "@/entities/skill";
import { Badge } from "@/shared/ui/badge";
import { SectionWrapper } from "@/shared/ui/section-wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

async function FeaturedProjects() {
  const projects = await getProjects();
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <SectionWrapper title="注目のプロジェクト" description="最近取り組んだ代表的な作品を紹介します">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/projects">
            すべてのプロジェクトを見る
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

async function TechOverview() {
  const skillCategories = await getSkills();
  const allTechs = skillCategories.flatMap((cat) =>
    cat.skills.filter((s) => s.technology).map((s) => s.technology!.name)
  );
  const uniqueTechs = [...new Set(allTechs)].slice(0, 16);

  return (
    <SectionWrapper title="技術スタック" description="日常的に使用している技術の一部です">
      <div className="flex flex-wrap justify-center gap-2">
        {uniqueTechs.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
            {tech}
          </Badge>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button asChild variant="ghost">
          <Link href="/skills">
            詳しいスキル一覧
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
          <FeaturedProjects />
        </Suspense>
        <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
          <TechOverview />
        </Suspense>
      </div>
    </>
  );
}
