-- =============================================================================
-- Seed SQL for Portfolio Site
-- PostgreSQL 用。gen_random_uuid() で UUID を生成。
-- =============================================================================

-- Clean (FK 依存順)
DELETE FROM "Contact";
DELETE FROM "Experience";
DELETE FROM "Skill";
DELETE FROM "SkillCategory";
DELETE FROM "ProjectTechnology";
DELETE FROM "ProjectLink";
DELETE FROM "Project";
DELETE FROM "ProjectCategory";
DELETE FROM "Technology";
DELETE FROM "SocialLink";
DELETE FROM "Profile";

-- =============================================================================
-- Profile
-- =============================================================================
INSERT INTO "Profile" (id, name, title, bio, "avatarUrl", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  '福田 朔哉',
  'フルスタックエンジニア',
  E'東京理科大学理学部数学科を2026年3月に卒業。\n\n 2024年から複数のスタートアップ企業でエンジニアとしてインターンを経験しており、TypeScript, Python, Next,js, NestJS, FastAPIを中心とする技術で開発を経験。\n\n アーキテクチャ設計・チーム開発の経験もあり、品質と速度のバランスを意識したエンジニアリングを実践しています。',
  NULL,
  NOW(),
  NOW()
);

-- SocialLinks
INSERT INTO "SocialLink" (id, "profileId", platform, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), p.id, 'github', 'https://github.com/sakuya10969', 1, NOW(), NOW()
FROM "Profile" p WHERE p.name = '福田 朔哉';

INSERT INTO "SocialLink" (id, "profileId", platform, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), p.id, 'twitter', 'https://twitter.com', 2, NOW(), NOW()
FROM "Profile" p WHERE p.name = '福田 朔哉';

INSERT INTO "SocialLink" (id, "profileId", platform, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), p.id, 'linkedin', 'https://www.linkedin.com/in/sakuya-fukuda-07858a329/', 3, NOW(), NOW()
FROM "Profile" p WHERE p.name = '福田 朔哉';


-- =============================================================================
-- Technologies
-- =============================================================================
INSERT INTO "Technology" (id, name, "iconUrl", "officialUrl", "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'TypeScript',          NULL, NULL, 1,  NOW(), NOW()),
  (gen_random_uuid(), 'Python',              NULL, NULL, 2,  NOW(), NOW()),
  (gen_random_uuid(), 'PHP',                 NULL, NULL, 3,  NOW(), NOW()),
  (gen_random_uuid(), 'Go',                  NULL, NULL, 4,  NOW(), NOW()),
  (gen_random_uuid(), 'SQL',                 NULL, NULL, 5,  NOW(), NOW()),
  (gen_random_uuid(), 'React',               NULL, NULL, 10, NOW(), NOW()),
  (gen_random_uuid(), 'Next.js',             NULL, NULL, 11, NOW(), NOW()),
  (gen_random_uuid(), 'Tailwind CSS',        NULL, NULL, 12, NOW(), NOW()),
  (gen_random_uuid(), 'shadcn/ui',           NULL, NULL, 13, NOW(), NOW()),
  (gen_random_uuid(), 'GSAP',                NULL, NULL, 14, NOW(), NOW()),
  (gen_random_uuid(), 'Storybook',           NULL, NULL, 15, NOW(), NOW()),
  (gen_random_uuid(), 'Node.js',             NULL, NULL, 20, NOW(), NOW()),
  (gen_random_uuid(), 'NestJS',              NULL, NULL, 21, NOW(), NOW()),
  (gen_random_uuid(), 'FastAPI',             NULL, NULL, 22, NOW(), NOW()),
  (gen_random_uuid(), 'Django',              NULL, NULL, 23, NOW(), NOW()),
  (gen_random_uuid(), 'Laravel',             NULL, NULL, 24, NOW(), NOW()),
  (gen_random_uuid(), 'GraphQL',             NULL, NULL, 25, NOW(), NOW()),
  (gen_random_uuid(), 'Hasura',              NULL, NULL, 26, NOW(), NOW()),
  (gen_random_uuid(), 'PostgreSQL',          NULL, NULL, 30, NOW(), NOW()),
  (gen_random_uuid(), 'MySQL',               NULL, NULL, 31, NOW(), NOW()),
  (gen_random_uuid(), 'SQL Server',          NULL, NULL, 32, NOW(), NOW()),
  (gen_random_uuid(), 'Prisma',              NULL, NULL, 33, NOW(), NOW()),
  (gen_random_uuid(), 'TypeORM',             NULL, NULL, 34, NOW(), NOW()),
  (gen_random_uuid(), 'SQLAlchemy',          NULL, NULL, 35, NOW(), NOW()),
  (gen_random_uuid(), 'Alembic',             NULL, NULL, 36, NOW(), NOW()),
  (gen_random_uuid(), 'AWS',                 NULL, NULL, 40, NOW(), NOW()),
  (gen_random_uuid(), 'Google Cloud',        NULL, NULL, 41, NOW(), NOW()),
  (gen_random_uuid(), 'Microsoft Azure',     NULL, NULL, 42, NOW(), NOW()),
  (gen_random_uuid(), 'Docker',              NULL, NULL, 43, NOW(), NOW()),
  (gen_random_uuid(), 'Jest',                NULL, NULL, 50, NOW(), NOW()),
  (gen_random_uuid(), 'pytest',              NULL, NULL, 51, NOW(), NOW()),
  (gen_random_uuid(), 'Zod',                 NULL, NULL, 52, NOW(), NOW()),
  (gen_random_uuid(), 'YOLO',                NULL, NULL, 60, NOW(), NOW()),
  (gen_random_uuid(), 'Microsoft Foundry AI', NULL, NULL, 61, NOW(), NOW());

-- =============================================================================
-- Project Categories
-- =============================================================================
INSERT INTO "ProjectCategory" (id, name, slug, "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'SaaS 開発',       'saas',       1, NOW(), NOW()),
  (gen_random_uuid(), '業務システム',     'enterprise', 2, NOW(), NOW()),
  (gen_random_uuid(), 'プラットフォーム', 'platform',   3, NOW(), NOW()),
  (gen_random_uuid(), '個人開発',         'personal',   4, NOW(), NOW());


-- =============================================================================
-- Projects
-- =============================================================================

-- 1. プログラミング学習プラットフォーム (estra)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'programming-learning-platform',
  'プログラミング学習プラットフォーム',
  '株式会社estraにて開発した自社プログラミング学習プラットフォーム。Next.js と Laravel を用いたフルスタック構成。',
  'プログラミング初学者向けの学習体験を提供するため、インタラクティブな学習プラットフォームの開発に参画した。フロントエンドとバックエンドの両面を担当し、フルスタックでの開発経験を積んだ。',
  'フロントエンドは Next.js、バックエンドは Laravel で構築。MySQL をデータストアとし、AWS 上にインフラを構築した。フロントとバックエンドを分離した API ベースのアーキテクチャを採用。',
  'Next.js によるサーバーサイドレンダリングで初期表示を高速化した。Laravel の Eloquent ORM を活用し、複雑なリレーションを持つ学習コンテンツのデータモデルを設計した。',
  'Next.js と Laravel 間の認証連携や、学習進捗のリアルタイム同期の設計に苦労した。異なるフレームワーク間でのセッション管理の整合性確保が課題だった。',
  '',
  NULL, true, 1, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'platform';

-- 2. CDP 開発 (KIYONO)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'cdp-development',
  'カスタマーデータプラットフォーム（CDP）',
  '株式会社KIYONOにて開発した自社 CDP の新規機能開発および Google Cloud を活用したデータ基盤構築。',
  '顧客データの統合・分析基盤として CDP の機能拡張が求められていた。新規機能の開発に加え、Google Cloud のマネージドサービスを活用したデータパイプラインの構築を担当した。',
  'バックエンドは Django + PostgreSQL で構築。Google Cloud Storage でファイル管理、Firestore でリアルタイムデータ、BigQuery で大規模データ分析を行うマルチストア構成を採用した。',
  'BigQuery を活用した大規模データの集計・分析パイプラインを構築し、顧客セグメンテーションの高速化を実現した。Google Cloud の各サービスを適材適所で組み合わせたデータ基盤設計を行った。',
  '異なるデータストア間の整合性担保が難しかった。BigQuery のコスト最適化とクエリパフォーマンスのバランス調整にも苦労した。',
  '',
  NULL, true, 2, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'platform';

-- 3. 社内システム・LP・AI PoC (インテリジェントフォース)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'intelligent-force-systems',
  '社内システム開発・エンタメ LP・AI エージェント PoC',
  '株式会社インテリジェントフォースにて、社内システムの開発・運用保守、エンタメ領域の LP 制作、AI エージェントの PoC 開発を担当。',
  '社内業務の効率化を目的としたシステム開発に加え、エンタメ領域のクライアント向け LP 制作、Microsoft Foundry AI を活用した AI エージェントの PoC 開発など、多岐にわたるプロジェクトに携わった。',
  '社内システムは React + FastAPI + PostgreSQL / SQL Server で構築。Microsoft Azure 上でホスティングし、CI/CD パイプラインを構築した。LP は React + GSAP でリッチなアニメーションを実装。AI PoC は Microsoft Foundry AI を活用。',
  'Azure DevOps を用いた CI/CD パイプラインの構築により、デプロイの自動化と品質担保を実現した。GSAP を活用したエンタメ LP では、パフォーマンスを維持しつつリッチなアニメーション表現を実装した。',
  '社内システム、LP、AI PoC と性質の異なるプロジェクトを並行して進める中で、技術スタックの切り替えとコンテキストスイッチの管理が課題だった。',
  'AI エージェントの本番導入に向けた精度改善と、社内システムのマイクロサービス化を検討。',
  NULL, true, 3, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'enterprise';

-- 4. モビリティ SaaS (ランディット)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'mobility-saas',
  'モビリティ SaaS プラットフォーム',
  'ランディット株式会社にて開発した企業向け・一般消費者向けの自社モビリティ SaaS。Next.js + NestJS のフルスタック構成。',
  '企業向けと一般消費者向けの両面を持つモビリティサービスの開発を推進した。新規機能開発からバグ改修、テスト実装、DB・API 設計まで幅広く担当した。',
  'フロントエンドは Next.js、バックエンドは NestJS + TypeORM + PostgreSQL で構築。GraphQL API（Hasura）を活用したデータ連携基盤を採用。Google Cloud 上にデプロイ。',
  'Storybook を導入しコンポーネントのカタログ化を推進した。Jest によるテストカバレッジの向上に貢献し、NestJS + TypeORM での型安全な API 設計を実現した。',
  '企業向けと一般消費者向けで異なる要件を同一コードベースで管理する設計が難しかった。GraphQL のスキーマ設計とパフォーマンスチューニングにも苦労した。',
  '',
  NULL, true, 4, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'saas';

-- 5. ノーコード業務 SaaS (Seppia)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'nocode-business-saas',
  'ノーコード業務 SaaS 構築サービス',
  '株式会社Seppiaにて開発した自社ノーコード業務 SaaS 構築サービス。Next.js + NestJS でフロントからバックエンドまで一貫して開発。',
  '非エンジニアでも業務アプリケーションを構築できるノーコードプラットフォームの開発に参画した。フロントエンドからバックエンドまでの開発を担当した。',
  'フロントエンドは Next.js、バックエンドは NestJS + FastAPI のハイブリッド構成。GraphQL API（Hasura）を活用したデータ連携基盤を採用し、Google Cloud 上にデプロイ。',
  'ノーコードエディタの UI 実装において、ドラッグ&ドロップや動的フォーム生成などの複雑なインタラクションを実現した。Hasura を活用したリアルタイムデータ同期の仕組みを構築した。',
  'ノーコードプラットフォーム特有の動的スキーマ管理と、ユーザーが自由に定義するデータ構造の型安全性の担保が難しかった。',
  '',
  NULL, true, 5, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'saas';

-- 6. 設計図管理システム (STAR UP)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'blueprint-management-system',
  '製造業向け設計図管理システム',
  '株式会社STAR UP（株式会社インテリジェントフォースと連携した受託開発）にて開発した製造業向け設計図管理システム。画像処理 AI による図面メタデータ抽出機能を搭載。',
  '製造業の現場で紙ベースの設計図管理が非効率だった課題を解決するため、デジタル設計図管理システムの開発を担当した。UI コンポーネント基盤の構築からアーキテクチャ刷新、AI を活用した図面解析まで幅広く携わった。',
  'フロントエンドは Next.js + shadcn/ui、バックエンドは FastAPI + PostgreSQL で構築。Alembic による DB マイグレーション管理を導入し、クリーンアーキテクチャへの刷新を行った。画像処理には YOLO を採用。AWS 上にデプロイ。',
  'shadcn/ui の導入によりコンポーネント群の品質と開発速度を向上させた。クリーンアーキテクチャへの刷新でコードの保守性を大幅に改善した。YOLO を用いた設計図内の図表・部品からのメタデータ抽出アルゴリズムのモデル構築・検証を行った。',
  '既存コードベースのクリーンアーキテクチャへの段階的移行が難しかった。YOLO モデルの精度向上のためのデータセット作成と学習パラメータの調整にも苦労した。',
  '',
  NULL, true, 6, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'enterprise';

-- 7. ポートフォリオサイト (個人開発)
INSERT INTO "Project" (id, slug, title, summary, background, architecture, highlights, challenges, "futureWork", "thumbnailUrl", "isPublished", "sortOrder", "categoryId", "createdAt", "updatedAt")
SELECT gen_random_uuid(),
  'portfolio-site',
  'ポートフォリオサイト',
  'Next.js App Router と Feature-Sliced Design を採用したフルスタック構成のポートフォリオサイト。',
  '自身の技術力・設計力・プロジェクト経験を体系的に伝えるためのポートフォリオが必要だった。単なる静的な自己紹介ではなく、実際のコードの品質で技術力を示す場として構築した。',
  'Feature-Sliced Design (FSD) を採用し、app → pages → widgets → features → entities → shared の依存方向を厳守。データ取得は Server Components 主体とし、クライアント側の状態を最小限に抑えた。DB は PostgreSQL + Prisma で正規化を意識したスキーマ設計を行った。',
  'FSD の依存ルールを厳守し、ドメインロジックの混在を防いだ。Server Components でのデータ取得を最大限活用し、不要なクライアント処理を排除した。Prisma スキーマから型を自動生成することで型安全性を保った。',
  'App Router と FSD の整合をとることが最初の難所だった。ルーティングは app/ に従いながら、ドメインロジックを FSD の各レイヤーに切り出す設計の明確化に時間をかけた。',
  '管理画面の追加、ブログ機能の実装、OGP 最適化、アナリティクス導入を検討。',
  NULL, true, 7, c.id, NOW(), NOW()
FROM "ProjectCategory" c WHERE c.slug = 'personal';


-- =============================================================================
-- Project Links
-- =============================================================================
INSERT INTO "ProjectLink" (id, "projectId", type, url, label, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), p.id, 'github', 'https://github.com/sakuya10969', 'GitHub', 1, NOW(), NOW()
FROM "Project" p WHERE p.slug = 'portfolio-site';

-- =============================================================================
-- ProjectTechnology (junction)
-- =============================================================================

-- Project 1: programming-learning-platform
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'Laravel';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'MySQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'AWS';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'TypeScript';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'programming-learning-platform' AND t.name = 'PHP';

-- Project 2: cdp-development
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'cdp-development' AND t.name = 'Django';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'cdp-development' AND t.name = 'Python';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'cdp-development' AND t.name = 'PostgreSQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'cdp-development' AND t.name = 'Google Cloud';

-- Project 3: intelligent-force-systems
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'React';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'FastAPI';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'PostgreSQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'SQL Server';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'Microsoft Azure';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'GSAP';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'intelligent-force-systems' AND t.name = 'Microsoft Foundry AI';

-- Project 4: mobility-saas
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'React';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'NestJS';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'TypeORM';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'PostgreSQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'GraphQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'Hasura';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'Google Cloud';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'Storybook';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'mobility-saas' AND t.name = 'Jest';

-- Project 5: nocode-business-saas
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'NestJS';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'FastAPI';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'GraphQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'Hasura';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'Google Cloud';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'TypeScript';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'nocode-business-saas' AND t.name = 'Python';

-- Project 6: blueprint-management-system
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'FastAPI';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'PostgreSQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'AWS';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'shadcn/ui';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'Alembic';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'YOLO';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'Python';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'blueprint-management-system' AND t.name = 'TypeScript';

-- Project 7: portfolio-site
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'TypeScript';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'Next.js';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'PostgreSQL';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'Prisma';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'Tailwind CSS';
INSERT INTO "ProjectTechnology" ("projectId", "technologyId")
SELECT p.id, t.id FROM "Project" p, "Technology" t WHERE p.slug = 'portfolio-site' AND t.name = 'shadcn/ui';


-- =============================================================================
-- Skill Categories
-- =============================================================================
INSERT INTO "SkillCategory" (id, name, slug, "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), '言語',               'languages',     1, NOW(), NOW()),
  (gen_random_uuid(), 'フロントエンド',     'frontend',      2, NOW(), NOW()),
  (gen_random_uuid(), 'バックエンド',       'backend',       3, NOW(), NOW()),
  (gen_random_uuid(), 'データベース / ORM', 'database',      4, NOW(), NOW()),
  (gen_random_uuid(), 'クラウド / インフラ', 'cloud-infra',  5, NOW(), NOW()),
  (gen_random_uuid(), 'テスト / ツール',    'testing-tools', 6, NOW(), NOW()),
  (gen_random_uuid(), 'AI / ML',            'ai-ml',         7, NOW(), NOW());

-- =============================================================================
-- Skills
-- =============================================================================

-- 言語
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'TypeScript', sc.id, t.id, 'advanced', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'languages' AND t.name = 'TypeScript';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Python', sc.id, t.id, 'advanced', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'languages' AND t.name = 'Python';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'PHP', sc.id, t.id, 'intermediate', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'languages' AND t.name = 'PHP';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Go', sc.id, t.id, 'intermediate', 4, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'languages' AND t.name = 'Go';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'SQL', sc.id, t.id, 'advanced', 5, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'languages' AND t.name = 'SQL';

-- フロントエンド
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'React', sc.id, t.id, 'advanced', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'React';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Next.js', sc.id, t.id, 'advanced', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'Next.js';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Tailwind CSS', sc.id, t.id, 'advanced', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'Tailwind CSS';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'shadcn/ui', sc.id, t.id, 'advanced', 4, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'shadcn/ui';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'GSAP', sc.id, t.id, 'intermediate', 5, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'GSAP';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Storybook', sc.id, t.id, 'intermediate', 6, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'frontend' AND t.name = 'Storybook';

-- バックエンド
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Node.js', sc.id, t.id, 'advanced', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'Node.js';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'NestJS', sc.id, t.id, 'advanced', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'NestJS';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'FastAPI', sc.id, t.id, 'advanced', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'FastAPI';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Django', sc.id, t.id, 'intermediate', 4, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'Django';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Laravel', sc.id, t.id, 'intermediate', 5, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'Laravel';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'GraphQL', sc.id, t.id, 'advanced', 6, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'GraphQL';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Hasura', sc.id, t.id, 'intermediate', 7, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'backend' AND t.name = 'Hasura';

-- データベース / ORM
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'PostgreSQL', sc.id, t.id, 'advanced', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'PostgreSQL';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'MySQL', sc.id, t.id, 'intermediate', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'MySQL';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'SQL Server', sc.id, t.id, 'intermediate', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'SQL Server';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Prisma', sc.id, t.id, 'advanced', 4, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'Prisma';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'TypeORM', sc.id, t.id, 'intermediate', 5, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'TypeORM';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'SQLAlchemy', sc.id, t.id, 'intermediate', 6, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'SQLAlchemy';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Alembic', sc.id, t.id, 'intermediate', 7, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'database' AND t.name = 'Alembic';

-- クラウド / インフラ
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'AWS', sc.id, t.id, 'beginner', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'cloud-infra' AND t.name = 'AWS';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Microsoft Azure', sc.id, t.id, 'intermediate', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'cloud-infra' AND t.name = 'Microsoft Azure';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Google Cloud', sc.id, t.id, 'intermediate', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'cloud-infra' AND t.name = 'Google Cloud';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Docker', sc.id, t.id, 'intermediate', 4, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'cloud-infra' AND t.name = 'Docker';

-- テスト / ツール
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Jest', sc.id, t.id, 'intermediate', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'testing-tools' AND t.name = 'Jest';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'pytest', sc.id, t.id, 'intermediate', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'testing-tools' AND t.name = 'pytest';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Zod', sc.id, t.id, 'advanced', 3, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'testing-tools' AND t.name = 'Zod';

-- AI / ML
INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'YOLO', sc.id, t.id, 'beginner', 1, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'ai-ml' AND t.name = 'YOLO';

INSERT INTO "Skill" (id, name, "categoryId", "technologyId", proficiency, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'Microsoft Foundry AI', sc.id, t.id, 'beginner', 2, NOW(), NOW()
FROM "SkillCategory" sc, "Technology" t WHERE sc.slug = 'ai-ml' AND t.name = 'Microsoft Foundry AI';


-- =============================================================================
-- Experiences
-- =============================================================================
INSERT INTO "Experience" (id, type, organization, role, description, "startDate", "endDate", "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'work', '株式会社estra', 'フルスタックエンジニア',
   '自社プログラミング学習プラットフォームの開発に従事。Next.js によるフロントエンド実装と Laravel によるバックエンド API 開発を担当し、MySQL を用いたデータベース設計、AWS 上でのインフラ構築を行った。',
   '2024-03-01', '2024-09-30', 1, NOW(), NOW()),

  (gen_random_uuid(), 'work', '株式会社KIYONO', 'バックエンドエンジニア',
   '自社 CDP（カスタマーデータプラットフォーム）の新規機能開発を担当。Django と PostgreSQL を用いたバックエンド実装に加え、Google Cloud（Cloud Storage、Datastore、BigQuery）を活用したデータ基盤の構築を行った。',
   '2024-06-01', '2024-09-30', 2, NOW(), NOW()),

  (gen_random_uuid(), 'work', '株式会社インテリジェントフォース', 'フルスタックエンジニア',
   '社内システムの開発・運用保守を担当。Microsoft Azure を用いたサービスホスティングおよび CI/CD パイプラインの構築を行った。エンタメ領域では React と GSAP を用いた LP 制作を担当。また、Microsoft Foundry AI を活用した AI エージェントの PoC 開発にも携わった。',
   '2024-09-01', NULL, 3, NOW(), NOW()),

  (gen_random_uuid(), 'work', 'ランディット株式会社', 'フルスタックエンジニア',
   '企業向け・一般消費者向けの自社モビリティ SaaS の開発を推進。Next.js を用いた新規機能開発やバグ改修、Storybook・Jest によるテスト実装を担当。NestJS と TypeORM を用いた DB 設計・API 構築から実装までを一貫して行った。',
   '2024-09-01', '2025-03-31', 4, NOW(), NOW()),

  (gen_random_uuid(), 'work', '株式会社Seppia', 'フルスタックエンジニア',
   '自社ノーコード業務 SaaS 構築サービスの開発に従事。Next.js と NestJS を用いてフロントエンドからバックエンドまでの開発を担当した。GraphQL API（Hasura）を活用したデータ連携基盤の構築も行った。',
   '2025-04-01', '2025-07-31', 5, NOW(), NOW()),

  (gen_random_uuid(), 'work', '株式会社STAR UP', 'フルスタックエンジニア',
   '株式会社インテリジェントフォースと連携した受託開発として、製造業向け設計図管理システムの開発を担当。shadcn/ui の導入やコンポーネント群の実装、Alembic を用いた DB マイグレーション管理の仕組み導入、クリーンアーキテクチャへの刷新を行った。設計図内の図表や部品からメタデータを抽出するための画像処理アルゴリズム（YOLO）のモデル構築・検証にも携わった。',
   '2025-05-01', '2025-11-30', 6, NOW(), NOW());
