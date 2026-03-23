import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/entities/project";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, FileText } from "lucide-react";

const linkIcons = {
  github: Github,
  demo: ExternalLink,
  docs: FileText,
  other: ExternalLink,
};

type Props = { slug: string };

export async function ProjectDetailPage({ slug }: Props) {
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            プロジェクト一覧へ
          </Link>
        </Button>
        <div className="space-y-3">
          <Badge variant="secondary">{project.category.name}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.summary}</p>
        </div>
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {project.links.map((link) => {
              const Icon = linkIcons[link.type] ?? ExternalLink;
              return (
                <Button key={link.id} asChild variant="outline" size="sm">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label ?? link.type}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech.id} variant="secondary">
            {tech.name}
          </Badge>
        ))}
      </div>

      <Separator />

      <div className="space-y-10">
        {[
          { label: "背景・制作動機", content: project.background },
          { label: "設計・アーキテクチャ", content: project.architecture },
          { label: "工夫した点", content: project.highlights },
          { label: "苦労した点", content: project.challenges },
          { label: "今後の改善予定", content: project.futureWork },
        ].map(({ label, content }) => (
          <div key={label} className="space-y-3">
            <h2 className="text-xl font-semibold">{label}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
