export type Profile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string | null;
  socialLinks: SocialLink[];
};

export type SocialLink = {
  id: string;
  platform: 'github' | 'twitter' | 'linkedin' | 'website' | 'other';
  url: string;
  sortOrder: number;
};
