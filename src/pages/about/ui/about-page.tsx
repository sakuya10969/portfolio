import { getProfile } from "@/entities/profile";
import { notFound } from "next/navigation";
import { Github, Twitter, Linkedin, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { SectionWrapper } from "@/shared/ui/section-wrapper";

const platformIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
  other: ExternalLink,
};

export async function AboutPage() {
  const profile = await getProfile();
  if (!profile) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SectionWrapper title="About Me">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">{profile.title}</p>
          </div>
          <p className="text-base leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
          {profile.socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {profile.socialLinks.map((link) => {
                const Icon = platformIcons[link.platform] ?? ExternalLink;
                return (
                  <Button key={link.id} asChild variant="outline" size="sm">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4 mr-2" />
                      {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
