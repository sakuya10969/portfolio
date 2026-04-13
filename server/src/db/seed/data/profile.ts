import type { InferInsertModel } from 'drizzle-orm';
import type { profiles, socialLinks } from '../../schema';

type ProfileInsert = Omit<InferInsertModel<typeof profiles>, 'id' | 'createdAt' | 'updatedAt'>;
type SocialLinkInsert = Omit<InferInsertModel<typeof socialLinks>, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>;

export const profileData: ProfileInsert = {
  name: '福田 朔哉',
  title: 'フルスタックエンジニア',
  bio: `2026年3月に東京理科大学理学部数学科を卒業。

2024年からスタートアップ企業を中心に複数社でエンジニアインターンを経験し、フロントエンドからバックエンド・インフラまで一貫した開発に携わってきました。

主な技術スタックは TypeScript / Python を軸に、React・Next.js・React Router によるフロントエンド開発、NestJS・Hono・FastAPI によるバックエンド API 開発、PostgreSQL を中心としたデータベース設計です。

アーキテクチャ設計（FSD・レイヤードアーキテクチャ・クリーンアーキテクチャ）やチーム開発の経験もあり、品質と開発速度のバランスを意識したエンジニアリングを実践しています。直近では Hono + Drizzle ORM によるバックエンド構築や、React Router v7 + Mantine UI によるモダンフロントエンド開発にも取り組んでいます。`,
};

export const socialLinksData: SocialLinkInsert[] = [
  { platform: 'github', url: 'https://github.com/sakuya10969', sortOrder: 1 },
  { platform: 'twitter', url: 'https://twitter.com', sortOrder: 2 },
  { platform: 'linkedin', url: 'https://www.linkedin.com/in/sakuya-fukuda-07858a329/', sortOrder: 3 },
];
