import { Suspense } from 'react';
import { HeroSection } from '@/widgets/hero-section';
import { getProjects } from '@/entities/project';
import { ProjectCard } from '@/entities/project';
import { getSkills } from '@/entities/skill';
import { Badge } from '@/shared/ui/badge';
import { SectionWrapper } from '@/shared/ui/section-wrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';

async function FeaturedProjects() {
  const projects = await getProjects();
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <SectionWrapper title="注目のプロジェクト" description="最近取り組んだ代表的な作品を紹介します">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="mt-8 text-center">
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
    cat.skills.filter((s) => s.technology).map((s) => s.technology!.name),
  );
  const uniqueTechs = [...new Set(allTechs)].slice(0, 16);

  return (
    <SectionWrapper title="技術スタック" description="日常的に使用している技術の一部です">
      <div className="flex flex-wrap justify-center gap-2">
        {uniqueTechs.map((tech) => (
          <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
            {tech}
          </Badge>
        ))}
      </div>
      <div className="mt-6 text-center">
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
      <div className="mx-auto max-w-5xl space-y-20 px-4 pb-20 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="bg-muted h-64 animate-pulse rounded-lg" />}>
          <FeaturedProjects />
        </Suspense>
        <Suspense fallback={<div className="bg-muted h-32 animate-pulse rounded-lg" />}>
          <TechOverview />
        </Suspense>
      </div>
    </>
  );
}
