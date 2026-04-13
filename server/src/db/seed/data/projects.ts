/** カテゴリ slug → プロジェクト定義。technologies は名前の配列で参照する */
export interface ProjectSeedData {
  slug: string;
  title: string;
  summary: string;
  background: string;
  architecture: string;
  highlights: string;
  challenges: string;
  futureWork?: string;
  isPublished: boolean;
  sortOrder: number;
  categorySlug: string;
  technologies: string[];
  links?: { type: 'github' | 'demo' | 'docs' | 'other'; url: string; label: string; sortOrder: number }[];
}

export const projectsData: ProjectSeedData[] = [
  {
    slug: 'programming-learning-platform',
    title: 'プログラミング学習プラットフォーム',
    summary:
      '株式会社estraにて開発した自社プログラミング学習プラットフォーム。Next.js と Laravel を用いたフルスタック構成。',
    background:
      'プログラミング初学者向けの学習体験を提供するため、インタラクティブな学習プラットフォームの開発に参画した。フロントエンドとバックエンドの両面を担当し、フルスタックでの開発経験を積んだ。',
    architecture:
      'フロントエンドは Next.js、バックエンドは Laravel で構築。MySQL をデータストアとし、AWS 上にインフラを構築した。フロントとバックエンドを分離した API ベースのアーキテクチャを採用。',
    highlights:
      'Next.js によるサーバーサイドレンダリングで初期表示を高速化した。Laravel の Eloquent ORM を活用し、複雑なリレーションを持つ学習コンテンツのデータモデルを設計した。',
    challenges:
      'Next.js と Laravel 間の認証連携や、学習進捗のリアルタイム同期の設計に苦労した。異なるフレームワーク間でのセッション管理の整合性確保が課題だった。',
    isPublished: true,
    sortOrder: 1,
    categorySlug: 'platform',
    technologies: ['TypeScript', 'PHP', 'Next.js', 'Laravel', 'MySQL', 'AWS'],
  },
  {
    slug: 'cdp-development',
    title: 'カスタマーデータプラットフォーム（CDP）',
    summary:
      '株式会社KIYONOにて開発した自社 CDP の新規機能開発および Google Cloud を活用したデータ基盤構築。',
    background:
      '顧客データの統合・分析基盤として CDP の機能拡張が求められていた。新規機能の開発に加え、Google Cloud のマネージドサービスを活用したデータパイプラインの構築を担当した。',
    architecture:
      'バックエンドは Django + PostgreSQL で構築。Google Cloud Storage でファイル管理、Firestore でリアルタイムデータ、BigQuery で大規模データ分析を行うマルチストア構成を採用した。',
    highlights:
      'BigQuery を活用した大規模データの集計・分析パイプラインを構築し、顧客セグメンテーションの高速化を実現した。Google Cloud の各サービスを適材適所で組み合わせたデータ基盤設計を行った。',
    challenges:
      '異なるデータストア間の整合性担保が難しかった。BigQuery のコスト最適化とクエリパフォーマンスのバランス調整にも苦労した。',
    isPublished: true,
    sortOrder: 2,
    categorySlug: 'platform',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Google Cloud'],
  },
  {
    slug: 'intelligent-force-systems',
    title: '社内システム開発・エンタメ LP・AI エージェント PoC',
    summary:
      '株式会社インテリジェントフォースにて、社内システムの開発・運用保守、エンタメ領域の LP 制作、AI エージェントの PoC 開発を担当。',
    background:
      '社内業務の効率化を目的としたシステム開発に加え、エンタメ領域のクライアント向け LP 制作、Microsoft Foundry AI を活用した AI エージェントの PoC 開発など、多岐にわたるプロジェクトに携わった。',
    architecture:
      '社内システムは React + FastAPI + PostgreSQL / SQL Server で構築。Microsoft Azure 上でホスティングし、CI/CD パイプラインを構築した。LP は React + GSAP でリッチなアニメーションを実装。AI PoC は Microsoft Foundry AI を活用。',
    highlights:
      'Azure DevOps を用いた CI/CD パイプラインの構築により、デプロイの自動化と品質担保を実現した。GSAP を活用したエンタメ LP では、パフォーマンスを維持しつつリッチなアニメーション表現を実装した。',
    challenges:
      '社内システム、LP、AI PoC と性質の異なるプロジェクトを並行して進める中で、技術スタックの切り替えとコンテキストスイッチの管理が課題だった。',
    futureWork:
      'AI エージェントの本番導入に向けた精度改善と、社内システムのマイクロサービス化を検討。',
    isPublished: true,
    sortOrder: 3,
    categorySlug: 'enterprise',
    technologies: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'SQL Server', 'Microsoft Azure', 'GSAP', 'Microsoft Foundry AI'],
  },
  {
    slug: 'mobility-saas',
    title: 'モビリティ SaaS プラットフォーム',
    summary:
      'ランディット株式会社にて開発した企業向け・一般消費者向けの自社モビリティ SaaS。Next.js + NestJS のフルスタック構成。',
    background:
      '企業向けと一般消費者向けの両面を持つモビリティサービスの開発を推進した。新規機能開発からバグ改修、テスト実装、DB・API 設計まで幅広く担当した。',
    architecture:
      'フロントエンドは Next.js、バックエンドは NestJS + TypeORM + PostgreSQL で構築。GraphQL API（Hasura）を活用したデータ連携基盤を採用。Google Cloud 上にデプロイ。',
    highlights:
      'Storybook を導入しコンポーネントのカタログ化を推進した。Jest によるテストカバレッジの向上に貢献し、NestJS + TypeORM での型安全な API 設計を実現した。',
    challenges:
      '企業向けと一般消費者向けで異なる要件を同一コードベースで管理する設計が難しかった。GraphQL のスキーマ設計とパフォーマンスチューニングにも苦労した。',
    isPublished: true,
    sortOrder: 4,
    categorySlug: 'saas',
    technologies: ['TypeScript', 'React', 'Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'GraphQL', 'Hasura', 'Google Cloud', 'Storybook', 'Jest'],
  },
  {
    slug: 'nocode-business-saas',
    title: 'ノーコード業務 SaaS 構築サービス',
    summary:
      '株式会社Seppiaにて開発した自社ノーコード業務 SaaS 構築サービス。Next.js + NestJS でフロントからバックエンドまで一貫して開発。',
    background:
      '非エンジニアでも業務アプリケーションを構築できるノーコードプラットフォームの開発に参画した。フロントエンドからバックエンドまでの開発を担当した。',
    architecture:
      'フロントエンドは Next.js、バックエンドは NestJS + FastAPI のハイブリッド構成。GraphQL API（Hasura）を活用したデータ連携基盤を採用し、Google Cloud 上にデプロイ。',
    highlights:
      'ノーコードエディタの UI 実装において、ドラッグ&ドロップや動的フォーム生成などの複雑なインタラクションを実現した。Hasura を活用したリアルタイムデータ同期の仕組みを構築した。',
    challenges:
      'ノーコードプラットフォーム特有の動的スキーマ管理と、ユーザーが自由に定義するデータ構造の型安全性の担保が難しかった。',
    isPublished: true,
    sortOrder: 5,
    categorySlug: 'saas',
    technologies: ['TypeScript', 'Python', 'Next.js', 'NestJS', 'FastAPI', 'GraphQL', 'Hasura', 'Google Cloud'],
  },
  {
    slug: 'blueprint-management-system',
    title: '製造業向け設計図管理システム',
    summary:
      '株式会社STAR UP（株式会社インテリジェントフォースと連携した受託開発）にて開発した製造業向け設計図管理システム。画像処理 AI による図面メタデータ抽出機能を搭載。',
    background:
      '製造業の現場で紙ベースの設計図管理が非効率だった課題を解決するため、デジタル設計図管理システムの開発を担当した。UI コンポーネント基盤の構築からアーキテクチャ刷新、AI を活用した図面解析まで幅広く携わった。',
    architecture:
      'フロントエンドは Next.js + shadcn/ui、バックエンドは FastAPI + PostgreSQL で構築。Alembic による DB マイグレーション管理を導入し、クリーンアーキテクチャへの刷新を行った。画像処理には YOLO を採用。AWS 上にデプロイ。',
    highlights:
      'shadcn/ui の導入によりコンポーネント群の品質と開発速度を向上させた。クリーンアーキテクチャへの刷新でコードの保守性を大幅に改善した。YOLO を用いた設計図内の図表・部品からのメタデータ抽出アルゴリズムのモデル構築・検証を行った。',
    challenges:
      '既存コードベースのクリーンアーキテクチャへの段階的移行が難しかった。YOLO モデルの精度向上のためのデータセット作成と学習パラメータの調整にも苦労した。',
    isPublished: true,
    sortOrder: 6,
    categorySlug: 'enterprise',
    technologies: ['TypeScript', 'Python', 'Next.js', 'FastAPI', 'PostgreSQL', 'AWS', 'shadcn/ui', 'Alembic', 'YOLO', 'SQLAlchemy'],
  },
  {
    slug: 'portfolio-site',
    title: 'ポートフォリオサイト',
    summary:
      'React Router v7 + Mantine UI によるフロントエンドと、Hono + Drizzle ORM によるバックエンド API で構成したフルスタックポートフォリオサイト。FSD とレイヤードアーキテクチャを採用。',
    background:
      '自身の技術力・設計力・プロジェクト経験を体系的に伝えるためのポートフォリオが必要だった。単なる静的な自己紹介ではなく、実際のコードの品質とアーキテクチャ設計で技術力を示す場として構築した。技術選定から設計・実装まで一人で完結させることで、フルスタックエンジニアとしての総合力を証明する目的もある。',
    architecture:
      'フロントエンドは React Router v7 を SSR モードで採用し、Mantine UI でコンポーネントを構築。FSD（Feature-Sliced Design）アーキテクチャで app → pages → widgets → features → entities → shared の依存方向を厳守した。バックエンドは Hono + Drizzle ORM + PostgreSQL（Neon）で構成し、レイヤードアーキテクチャ（Routes → Services → DB）を採用。OpenAPI スキーマから Orval で型安全な API クライアントを自動生成している。',
    highlights:
      'FSD の依存ルールを厳守し、ドメインロジックの混在を防いだ。React Router v7 の loader による SSR データ取得と TanStack Query によるクライアント再取得を適切に使い分けた。Hono + Zod OpenAPI でルート定義から OpenAPI ドキュメントを自動生成し、Orval で型安全なクライアントコードを生成するエンドツーエンドの型安全パイプラインを構築した。Framer Motion による上品なアニメーション演出も実装。',
    challenges:
      'React Router v7 と FSD の整合をとることが最初の難所だった。ルーティングは routes/ に従いながら、ドメインロジックを FSD の各レイヤーに切り出す設計の明確化に時間をかけた。また、Hono の OpenAPI 統合と Orval の自動生成パイプラインの構築にも試行錯誤があった。',
    futureWork:
      '管理画面の追加、ブログ機能の実装、OGP 最適化、アナリティクス導入を検討。',
    isPublished: true,
    sortOrder: 7,
    categorySlug: 'personal',
    technologies: [
      'TypeScript', 'React', 'React Router', 'Mantine UI', 'Framer Motion', 'TanStack Query',
      'Hono', 'Bun', 'Drizzle ORM', 'PostgreSQL', 'Neon', 'Zod', 'Orval', 'Docker', 'Biome',
    ],
    links: [
      { type: 'github', url: 'https://github.com/sakuya10969', label: 'GitHub', sortOrder: 1 },
    ],
  },
];
