import { getProfile } from '@/entities/profile';
import { notFound } from 'next/navigation';
import { Globe, ExternalLink } from 'lucide-react';
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { SectionWrapper } from '@/shared/ui/section-wrapper';

const platformIcons = {
  github: FaSquareGithub,
  twitter: FaSquareXTwitter,
  linkedin: FaLinkedin,
  website: Globe,
  other: ExternalLink,
};

export async function AboutPage() {
  const profile = await getProfile();
  if (!profile) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <SectionWrapper title="About Me">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground mt-1 text-lg">{profile.title}</p>
          </div>
          <p className="text-base leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
          {profile.socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {profile.socialLinks.map((link) => {
                const Icon = platformIcons[link.platform] ?? ExternalLink;
                return (
                  <Button key={link.id} asChild variant="outline" size="sm">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="mr-2 h-6 w-6" />
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
