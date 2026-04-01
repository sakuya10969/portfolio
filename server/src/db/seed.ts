import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import {
  profiles,
  socialLinks,
  technologies,
  projectCategories,
  projects,
  projectLinks,
  projectTechnologies,
  skillCategories,
  skills,
  experiences,
  contacts,
} from './schema';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client, schema });

function uuid() {
  return crypto.randomUUID();
}

async function main() {
  // Clean（外部キー制約を考慮した削除順）
  await db.delete(contacts);
  await db.delete(experiences);
  await db.delete(skills);
  await db.delete(skillCategories);
  await db.delete(projectTechnologies);
  await db.delete(projectLinks);
  await db.delete(projects);
  await db.delete(projectCategories);
  await db.delete(technologies);
  await db.delete(socialLinks);
  await db.delete(profiles);

  // Profile
  const profileId = uuid();
  await db.insert(profiles).values({
    id: profileId,
    name: '福田 朔哉',
    title: 'フルスタックエンジニア',
    bio: '東京理科大学理学部数学科を2026年3月に卒業。\n\n 2024年から複数のスタートアップ企業でエンジニアとしてインターンを経験しており、TypeScript, Python, Next,js, NestJS, FastAPIを中心とする技術で開発を経験。\n\n アーキテクチャ設計・チーム開発の経験もあり、品質と速度のバランスを意識したエンジニアリングを実践しています。',
    updatedAt: new Date(),
  });
  await db.insert(socialLinks).values([
    { id: uuid(), profileId, platform: 'github', url: 'https://github.com/sakuya10969', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), profileId, platform: 'twitter', url: 'https://twitter.com', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), profileId, platform: 'linkedin', url: 'https://www.linkedin.com/in/sakuya-fukuda-07858a329/', sortOrder: 3, updatedAt: new Date() },
  ]);
  console.log('Created profile');

  // Technologies
  const techNames = [
    { name: 'TypeScript', sortOrder: 1 },
    { name: 'Python', sortOrder: 2 },
    { name: 'PHP', sortOrder: 3 },
    { name: 'Go', sortOrder: 4 },
    { name: 'SQL', sortOrder: 5 },
    { name: 'React', sortOrder: 10 },
    { name: 'Next.js', sortOrder: 11 },
    { name: 'Tailwind CSS', sortOrder: 12 },
    { name: 'shadcn/ui', sortOrder: 13 },
    { name: 'GSAP', sortOrder: 14 },
    { name: 'Storybook', sortOrder: 15 },
    { name: 'Node.js', sortOrder: 20 },
    { name: 'NestJS', sortOrder: 21 },
    { name: 'FastAPI', sortOrder: 22 },
    { name: 'Django', sortOrder: 23 },
    { name: 'Laravel', sortOrder: 24 },
    { name: 'GraphQL', sortOrder: 25 },
    { name: 'Hasura', sortOrder: 26 },
    { name: 'PostgreSQL', sortOrder: 30 },
    { name: 'MySQL', sortOrder: 31 },
    { name: 'SQL Server', sortOrder: 32 },
    { name: 'Prisma', sortOrder: 33 },
    { name: 'TypeORM', sortOrder: 34 },
    { name: 'SQLAlchemy', sortOrder: 35 },
    { name: 'Alembic', sortOrder: 36 },
    { name: 'AWS', sortOrder: 40 },
    { name: 'Google Cloud', sortOrder: 41 },
    { name: 'Microsoft Azure', sortOrder: 42 },
    { name: 'Docker', sortOrder: 43 },
    { name: 'Jest', sortOrder: 50 },
    { name: 'pytest', sortOrder: 51 },
    { name: 'Zod', sortOrder: 52 },
    { name: 'YOLO', sortOrder: 60 },
    { name: 'Microsoft Foundry AI', sortOrder: 61 },
  ];

  const techRows = techNames.map((t) => ({ id: uuid(), ...t, updatedAt: new Date() }));
  await db.insert(technologies).values(techRows);
  const techMap = Object.fromEntries(techRows.map((t) => [t.name, t]));
  console.log('Created technologies');

  // Project Categories
  const catPlatform = { id: uuid(), name: 'プラットフォーム', slug: 'platform', sortOrder: 3, updatedAt: new Date() };
  const catEnterprise = { id: uuid(), name: '業務システム', slug: 'enterprise', sortOrder: 2, updatedAt: new Date() };
  const catSaas = { id: uuid(), name: 'SaaS 開発', slug: 'saas', sortOrder: 1, updatedAt: new Date() };
  const catPersonal = { id: uuid(), name: '個人開発', slug: 'personal', sortOrder: 4, updatedAt: new Date() };
  await db.insert(projectCategories).values([catSaas, catEnterprise, catPlatform, catPersonal]);
  console.log('Created categories');

  // Projects
  const p1 = { id: uuid(), slug: 'programming-learning-platform', title: 'プログラミング学習プラットフォーム', summary: '株式会社estraにて開発した自社プログラミング学習プラットフォーム。Next.js と Laravel を用いたフルスタック構成。', background: 'プログラミング初学者向けの学習体験を提供するため、インタラクティブな学習プラットフォームの開発に参画した。フロントエンドとバックエンドの両面を担当し、フルスタックでの開発経験を積んだ。', architecture: 'フロントエンドは Next.js、バックエンドは Laravel で構築。MySQL をデータストアとし、AWS 上にインフラを構築した。フロントとバックエンドを分離した API ベースのアーキテクチャを採用。', highlights: 'Next.js によるサーバーサイドレンダリングで初期表示を高速化した。Laravel の Eloquent ORM を活用し、複雑なリレーションを持つ学習コンテンツのデータモデルを設計した。', challenges: 'Next.js と Laravel 間の認証連携や、学習進捗のリアルタイム同期の設計に苦労した。異なるフレームワーク間でのセッション管理の整合性確保が課題だった。', isPublished: true, sortOrder: 1, categoryId: catPlatform.id, updatedAt: new Date() };
  const p2 = { id: uuid(), slug: 'cdp-development', title: 'カスタマーデータプラットフォーム（CDP）', summary: '株式会社KIYONOにて開発した自社 CDP の新規機能開発および Google Cloud を活用したデータ基盤構築。', background: '顧客データの統合・分析基盤として CDP の機能拡張が求められていた。新規機能の開発に加え、Google Cloud のマネージドサービスを活用したデータパイプラインの構築を担当した。', architecture: 'バックエンドは Django + PostgreSQL で構築。Google Cloud Storage でファイル管理、Firestore でリアルタイムデータ、BigQuery で大規模データ分析を行うマルチストア構成を採用した。', highlights: 'BigQuery を活用した大規模データの集計・分析パイプラインを構築し、顧客セグメンテーションの高速化を実現した。Google Cloud の各サービスを適材適所で組み合わせたデータ基盤設計を行った。', challenges: '異なるデータストア間の整合性担保が難しかった。BigQuery のコスト最適化とクエリパフォーマンスのバランス調整にも苦労した。', isPublished: true, sortOrder: 2, categoryId: catPlatform.id, updatedAt: new Date() };
  const p3 = { id: uuid(), slug: 'intelligent-force-systems', title: '社内システム開発・エンタメ LP・AI エージェント PoC', summary: '株式会社インテリジェントフォースにて、社内システムの開発・運用保守、エンタメ領域の LP 制作、AI エージェントの PoC 開発を担当。', background: '社内業務の効率化を目的としたシステム開発に加え、エンタメ領域のクライアント向け LP 制作、Microsoft Foundry AI を活用した AI エージェントの PoC 開発など、多岐にわたるプロジェクトに携わった。', architecture: '社内システムは React + FastAPI + PostgreSQL / SQL Server で構築。Microsoft Azure 上でホスティングし、CI/CD パイプラインを構築した。LP は React + GSAP でリッチなアニメーションを実装。AI PoC は Microsoft Foundry AI を活用。', highlights: 'Azure DevOps を用いた CI/CD パイプラインの構築により、デプロイの自動化と品質担保を実現した。GSAP を活用したエンタメ LP では、パフォーマンスを維持しつつリッチなアニメーション表現を実装した。', challenges: '社内システム、LP、AI PoC と性質の異なるプロジェクトを並行して進める中で、技術スタックの切り替えとコンテキストスイッチの管理が課題だった。', futureWork: 'AI エージェントの本番導入に向けた精度改善と、社内システムのマイクロサービス化を検討。', isPublished: true, sortOrder: 3, categoryId: catEnterprise.id, updatedAt: new Date() };
  const p4 = { id: uuid(), slug: 'mobility-saas', title: 'モビリティ SaaS プラットフォーム', summary: 'ランディット株式会社にて開発した企業向け・一般消費者向けの自社モビリティ SaaS。Next.js + NestJS のフルスタック構成。', background: '企業向けと一般消費者向けの両面を持つモビリティサービスの開発を推進した。新規機能開発からバグ改修、テスト実装、DB・API 設計まで幅広く担当した。', architecture: 'フロントエンドは Next.js、バックエンドは NestJS + TypeORM + PostgreSQL で構築。GraphQL API（Hasura）を活用したデータ連携基盤を採用。Google Cloud 上にデプロイ。', highlights: 'Storybook を導入しコンポーネントのカタログ化を推進した。Jest によるテストカバレッジの向上に貢献し、NestJS + TypeORM での型安全な API 設計を実現した。', challenges: '企業向けと一般消費者向けで異なる要件を同一コードベースで管理する設計が難しかった。GraphQL のスキーマ設計とパフォーマンスチューニングにも苦労した。', isPublished: true, sortOrder: 4, categoryId: catSaas.id, updatedAt: new Date() };
  const p5 = { id: uuid(), slug: 'nocode-business-saas', title: 'ノーコード業務 SaaS 構築サービス', summary: '株式会社Seppiaにて開発した自社ノーコード業務 SaaS 構築サービス。Next.js + NestJS でフロントからバックエンドまで一貫して開発。', background: '非エンジニアでも業務アプリケーションを構築できるノーコードプラットフォームの開発に参画した。フロントエンドからバックエンドまでの開発を担当した。', architecture: 'フロントエンドは Next.js、バックエンドは NestJS + FastAPI のハイブリッド構成。GraphQL API（Hasura）を活用したデータ連携基盤を採用し、Google Cloud 上にデプロイ。', highlights: 'ノーコードエディタの UI 実装において、ドラッグ&ドロップや動的フォーム生成などの複雑なインタラクションを実現した。Hasura を活用したリアルタイムデータ同期の仕組みを構築した。', challenges: 'ノーコードプラットフォーム特有の動的スキーマ管理と、ユーザーが自由に定義するデータ構造の型安全性の担保が難しかった。', isPublished: true, sortOrder: 5, categoryId: catSaas.id, updatedAt: new Date() };
  const p6 = { id: uuid(), slug: 'blueprint-management-system', title: '製造業向け設計図管理システム', summary: '株式会社STAR UP（株式会社インテリジェントフォースと連携した受託開発）にて開発した製造業向け設計図管理システム。画像処理 AI による図面メタデータ抽出機能を搭載。', background: '製造業の現場で紙ベースの設計図管理が非効率だった課題を解決するため、デジタル設計図管理システムの開発を担当した。UI コンポーネント基盤の構築からアーキテクチャ刷新、AI を活用した図面解析まで幅広く携わった。', architecture: 'フロントエンドは Next.js + shadcn/ui、バックエンドは FastAPI + PostgreSQL で構築。Alembic による DB マイグレーション管理を導入し、クリーンアーキテクチャへの刷新を行った。画像処理には YOLO を採用。AWS 上にデプロイ。', highlights: 'shadcn/ui の導入によりコンポーネント群の品質と開発速度を向上させた。クリーンアーキテクチャへの刷新でコードの保守性を大幅に改善した。YOLO を用いた設計図内の図表・部品からのメタデータ抽出アルゴリズムのモデル構築・検証を行った。', challenges: '既存コードベースのクリーンアーキテクチャへの段階的移行が難しかった。YOLO モデルの精度向上のためのデータセット作成と学習パラメータの調整にも苦労した。', isPublished: true, sortOrder: 6, categoryId: catEnterprise.id, updatedAt: new Date() };
  const p7 = { id: uuid(), slug: 'portfolio-site', title: 'ポートフォリオサイト', summary: 'Next.js App Router と Feature-Sliced Design を採用したフルスタック構成のポートフォリオサイト。', background: '自身の技術力・設計力・プロジェクト経験を体系的に伝えるためのポートフォリオが必要だった。単なる静的な自己紹介ではなく、実際のコードの品質で技術力を示す場として構築した。', architecture: 'Feature-Sliced Design (FSD) を採用し、app → pages → widgets → features → entities → shared の依存方向を厳守。データ取得は Server Components 主体とし、クライアント側の状態を最小限に抑えた。DB は PostgreSQL + Drizzle で正規化を意識したスキーマ設計を行った。', highlights: 'FSD の依存ルールを厳守し、ドメインロジックの混在を防いだ。Server Components でのデータ取得を最大限活用し、不要なクライアント処理を排除した。', challenges: 'App Router と FSD の整合をとることが最初の難所だった。ルーティングは app/ に従いながら、ドメインロジックを FSD の各レイヤーに切り出す設計の明確化に時間をかけた。', futureWork: '管理画面の追加、ブログ機能の実装、OGP 最適化、アナリティクス導入を検討。', isPublished: true, sortOrder: 7, categoryId: catPersonal.id, updatedAt: new Date() };

  await db.insert(projects).values([p1, p2, p3, p4, p5, p6, p7]);

  await db.insert(projectLinks).values([
    { id: uuid(), projectId: p7.id, type: 'github', url: 'https://github.com/sakuya10969', label: 'GitHub', sortOrder: 1, updatedAt: new Date() },
  ]);

  await db.insert(projectTechnologies).values([
    { projectId: p1.id, technologyId: techMap['Next.js'].id },
    { projectId: p1.id, technologyId: techMap['Laravel'].id },
    { projectId: p1.id, technologyId: techMap['MySQL'].id },
    { projectId: p1.id, technologyId: techMap['AWS'].id },
    { projectId: p1.id, technologyId: techMap['TypeScript'].id },
    { projectId: p1.id, technologyId: techMap['PHP'].id },
    { projectId: p2.id, technologyId: techMap['Django'].id },
    { projectId: p2.id, technologyId: techMap['Python'].id },
    { projectId: p2.id, technologyId: techMap['PostgreSQL'].id },
    { projectId: p2.id, technologyId: techMap['Google Cloud'].id },
    { projectId: p3.id, technologyId: techMap['React'].id },
    { projectId: p3.id, technologyId: techMap['Next.js'].id },
    { projectId: p3.id, technologyId: techMap['FastAPI'].id },
    { projectId: p3.id, technologyId: techMap['PostgreSQL'].id },
    { projectId: p3.id, technologyId: techMap['SQL Server'].id },
    { projectId: p3.id, technologyId: techMap['Microsoft Azure'].id },
    { projectId: p3.id, technologyId: techMap['GSAP'].id },
    { projectId: p3.id, technologyId: techMap['Microsoft Foundry AI'].id },
    { projectId: p4.id, technologyId: techMap['React'].id },
    { projectId: p4.id, technologyId: techMap['Next.js'].id },
    { projectId: p4.id, technologyId: techMap['NestJS'].id },
    { projectId: p4.id, technologyId: techMap['TypeORM'].id },
    { projectId: p4.id, technologyId: techMap['PostgreSQL'].id },
    { projectId: p4.id, technologyId: techMap['GraphQL'].id },
    { projectId: p4.id, technologyId: techMap['Hasura'].id },
    { projectId: p4.id, technologyId: techMap['Google Cloud'].id },
    { projectId: p4.id, technologyId: techMap['Storybook'].id },
    { projectId: p4.id, technologyId: techMap['Jest'].id },
    { projectId: p5.id, technologyId: techMap['Next.js'].id },
    { projectId: p5.id, technologyId: techMap['NestJS'].id },
    { projectId: p5.id, technologyId: techMap['FastAPI'].id },
    { projectId: p5.id, technologyId: techMap['GraphQL'].id },
    { projectId: p5.id, technologyId: techMap['Hasura'].id },
    { projectId: p5.id, technologyId: techMap['Google Cloud'].id },
    { projectId: p5.id, technologyId: techMap['TypeScript'].id },
    { projectId: p5.id, technologyId: techMap['Python'].id },
    { projectId: p6.id, technologyId: techMap['Next.js'].id },
    { projectId: p6.id, technologyId: techMap['FastAPI'].id },
    { projectId: p6.id, technologyId: techMap['PostgreSQL'].id },
    { projectId: p6.id, technologyId: techMap['AWS'].id },
    { projectId: p6.id, technologyId: techMap['shadcn/ui'].id },
    { projectId: p6.id, technologyId: techMap['Alembic'].id },
    { projectId: p6.id, technologyId: techMap['YOLO'].id },
    { projectId: p6.id, technologyId: techMap['Python'].id },
    { projectId: p6.id, technologyId: techMap['TypeScript'].id },
    { projectId: p7.id, technologyId: techMap['TypeScript'].id },
    { projectId: p7.id, technologyId: techMap['Next.js'].id },
    { projectId: p7.id, technologyId: techMap['PostgreSQL'].id },
    { projectId: p7.id, technologyId: techMap['Tailwind CSS'].id },
    { projectId: p7.id, technologyId: techMap['shadcn/ui'].id },
  ]);
  console.log('Created 7 projects');

  // Skill Categories
  const skLang = { id: uuid(), name: '言語', slug: 'languages', sortOrder: 1, updatedAt: new Date() };
  const skFront = { id: uuid(), name: 'フロントエンド', slug: 'frontend', sortOrder: 2, updatedAt: new Date() };
  const skBack = { id: uuid(), name: 'バックエンド', slug: 'backend', sortOrder: 3, updatedAt: new Date() };
  const skDb = { id: uuid(), name: 'データベース / ORM', slug: 'database', sortOrder: 4, updatedAt: new Date() };
  const skInfra = { id: uuid(), name: 'クラウド / インフラ', slug: 'cloud-infra', sortOrder: 5, updatedAt: new Date() };
  const skTest = { id: uuid(), name: 'テスト / ツール', slug: 'testing-tools', sortOrder: 6, updatedAt: new Date() };
  const skAi = { id: uuid(), name: 'AI / ML', slug: 'ai-ml', sortOrder: 7, updatedAt: new Date() };
  await db.insert(skillCategories).values([skLang, skFront, skBack, skDb, skInfra, skTest, skAi]);

  await db.insert(skills).values([
    { id: uuid(), name: 'TypeScript', categoryId: skLang.id, technologyId: techMap['TypeScript'].id, proficiency: 'advanced', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'Python', categoryId: skLang.id, technologyId: techMap['Python'].id, proficiency: 'advanced', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'PHP', categoryId: skLang.id, technologyId: techMap['PHP'].id, proficiency: 'intermediate', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'Go', categoryId: skLang.id, technologyId: techMap['Go'].id, proficiency: 'intermediate', sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), name: 'SQL', categoryId: skLang.id, technologyId: techMap['SQL'].id, proficiency: 'advanced', sortOrder: 5, updatedAt: new Date() },
    { id: uuid(), name: 'React', categoryId: skFront.id, technologyId: techMap['React'].id, proficiency: 'advanced', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'Next.js', categoryId: skFront.id, technologyId: techMap['Next.js'].id, proficiency: 'advanced', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'Tailwind CSS', categoryId: skFront.id, technologyId: techMap['Tailwind CSS'].id, proficiency: 'advanced', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'shadcn/ui', categoryId: skFront.id, technologyId: techMap['shadcn/ui'].id, proficiency: 'advanced', sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), name: 'GSAP', categoryId: skFront.id, technologyId: techMap['GSAP'].id, proficiency: 'intermediate', sortOrder: 5, updatedAt: new Date() },
    { id: uuid(), name: 'Storybook', categoryId: skFront.id, technologyId: techMap['Storybook'].id, proficiency: 'intermediate', sortOrder: 6, updatedAt: new Date() },
    { id: uuid(), name: 'Node.js', categoryId: skBack.id, technologyId: techMap['Node.js'].id, proficiency: 'advanced', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'NestJS', categoryId: skBack.id, technologyId: techMap['NestJS'].id, proficiency: 'advanced', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'FastAPI', categoryId: skBack.id, technologyId: techMap['FastAPI'].id, proficiency: 'advanced', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'Django', categoryId: skBack.id, technologyId: techMap['Django'].id, proficiency: 'intermediate', sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), name: 'Laravel', categoryId: skBack.id, technologyId: techMap['Laravel'].id, proficiency: 'intermediate', sortOrder: 5, updatedAt: new Date() },
    { id: uuid(), name: 'GraphQL', categoryId: skBack.id, technologyId: techMap['GraphQL'].id, proficiency: 'advanced', sortOrder: 6, updatedAt: new Date() },
    { id: uuid(), name: 'Hasura', categoryId: skBack.id, technologyId: techMap['Hasura'].id, proficiency: 'intermediate', sortOrder: 7, updatedAt: new Date() },
    { id: uuid(), name: 'PostgreSQL', categoryId: skDb.id, technologyId: techMap['PostgreSQL'].id, proficiency: 'advanced', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'MySQL', categoryId: skDb.id, technologyId: techMap['MySQL'].id, proficiency: 'intermediate', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'SQL Server', categoryId: skDb.id, technologyId: techMap['SQL Server'].id, proficiency: 'intermediate', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'Prisma', categoryId: skDb.id, technologyId: techMap['Prisma'].id, proficiency: 'advanced', sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), name: 'TypeORM', categoryId: skDb.id, technologyId: techMap['TypeORM'].id, proficiency: 'intermediate', sortOrder: 5, updatedAt: new Date() },
    { id: uuid(), name: 'SQLAlchemy', categoryId: skDb.id, technologyId: techMap['SQLAlchemy'].id, proficiency: 'intermediate', sortOrder: 6, updatedAt: new Date() },
    { id: uuid(), name: 'Alembic', categoryId: skDb.id, technologyId: techMap['Alembic'].id, proficiency: 'intermediate', sortOrder: 7, updatedAt: new Date() },
    { id: uuid(), name: 'AWS', categoryId: skInfra.id, technologyId: techMap['AWS'].id, proficiency: 'beginner', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'Microsoft Azure', categoryId: skInfra.id, technologyId: techMap['Microsoft Azure'].id, proficiency: 'intermediate', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'Google Cloud', categoryId: skInfra.id, technologyId: techMap['Google Cloud'].id, proficiency: 'intermediate', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'Docker', categoryId: skInfra.id, technologyId: techMap['Docker'].id, proficiency: 'intermediate', sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), name: 'Jest', categoryId: skTest.id, technologyId: techMap['Jest'].id, proficiency: 'intermediate', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'pytest', categoryId: skTest.id, technologyId: techMap['pytest'].id, proficiency: 'intermediate', sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), name: 'Zod', categoryId: skTest.id, technologyId: techMap['Zod'].id, proficiency: 'advanced', sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), name: 'YOLO', categoryId: skAi.id, technologyId: techMap['YOLO'].id, proficiency: 'beginner', sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), name: 'Microsoft Foundry AI', categoryId: skAi.id, technologyId: techMap['Microsoft Foundry AI'].id, proficiency: 'beginner', sortOrder: 2, updatedAt: new Date() },
  ]);
  console.log('Created skills');

  // Experiences
  await db.insert(experiences).values([
    { id: uuid(), type: 'work', organization: '株式会社estra', role: 'フルスタックエンジニア', description: '自社プログラミング学習プラットフォームの開発に従事。Next.js によるフロントエンド実装と Laravel によるバックエンド API 開発を担当し、MySQL を用いたデータベース設計、AWS 上でのインフラ構築を行った。', startDate: new Date('2024-03-01'), endDate: new Date('2024-09-30'), sortOrder: 1, updatedAt: new Date() },
    { id: uuid(), type: 'work', organization: '株式会社KIYONO', role: 'バックエンドエンジニア', description: '自社 CDP（カスタマーデータプラットフォーム）の新規機能開発を担当。Django と PostgreSQL を用いたバックエンド実装に加え、Google Cloud（Cloud Storage、Datastore、BigQuery）を活用したデータ基盤の構築を行った。', startDate: new Date('2024-06-01'), endDate: new Date('2024-09-30'), sortOrder: 2, updatedAt: new Date() },
    { id: uuid(), type: 'work', organization: '株式会社インテリジェントフォース', role: 'フルスタックエンジニア', description: '社内システムの開発・運用保守を担当。Microsoft Azure を用いたサービスホスティングおよび CI/CD パイプラインの構築を行った。エンタメ領域では React と GSAP を用いた LP 制作を担当。また、Microsoft Foundry AI を活用した AI エージェントの PoC 開発にも携わった。', startDate: new Date('2024-09-01'), endDate: null, sortOrder: 3, updatedAt: new Date() },
    { id: uuid(), type: 'work', organization: 'ランディット株式会社', role: 'フルスタックエンジニア', description: '企業向け・一般消費者向けの自社モビリティ SaaS の開発を推進。Next.js を用いた新規機能開発やバグ改修、Storybook・Jest によるテスト実装を担当。NestJS と TypeORM を用いた DB 設計・API 構築から実装までを一貫して行った。', startDate: new Date('2024-09-01'), endDate: new Date('2025-03-31'), sortOrder: 4, updatedAt: new Date() },
    { id: uuid(), type: 'work', organization: '株式会社Seppia', role: 'フルスタックエンジニア', description: '自社ノーコード業務 SaaS 構築サービスの開発に従事。Next.js と NestJS を用いてフロントエンドからバックエンドまでの開発を担当した。GraphQL API（Hasura）を活用したデータ連携基盤の構築も行った。', startDate: new Date('2025-04-01'), endDate: new Date('2025-07-31'), sortOrder: 5, updatedAt: new Date() },
    { id: uuid(), type: 'work', organization: '株式会社STAR UP', role: 'フルスタックエンジニア', description: '株式会社インテリジェントフォースと連携した受託開発として、製造業向け設計図管理システムの開発を担当。shadcn/ui の導入やコンポーネント群の実装、Alembic を用いた DB マイグレーション管理の仕組み導入、クリーンアーキテクチャへの刷新を行った。設計図内の図表や部品からメタデータを抽出するための画像処理アルゴリズム（YOLO）のモデル構築・検証にも携わった。', startDate: new Date('2025-05-01'), endDate: new Date('2025-11-30'), sortOrder: 6, updatedAt: new Date() },
  ]);
  console.log('Created experiences');
  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => client.end());
