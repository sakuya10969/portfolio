export interface ExperienceSeedData {
  type: 'work' | 'education' | 'activity';
  organization: string;
  role: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string | null;
  sortOrder: number;
}

export const experiencesData: ExperienceSeedData[] = [
  {
    type: 'education',
    organization: '東京理科大学 理学部 数学科',
    role: '学士課程',
    description:
      '数学科にて論理的思考力と抽象化能力を培った。数理モデリングやアルゴリズムの基礎を学び、ソフトウェアエンジニアリングへの応用力を身につけた。在学中からエンジニアインターンに積極的に参加し、実務経験を並行して積んだ。',
    startDate: '2021-04-01',
    endDate: '2026-03-31',
    sortOrder: 1,
  },
  {
    type: 'work',
    organization: '株式会社estra',
    role: 'フルスタックエンジニア',
    description:
      '自社プログラミング学習プラットフォームの開発に従事。Next.js によるフロントエンド実装と Laravel によるバックエンド API 開発を担当し、MySQL を用いたデータベース設計、AWS 上でのインフラ構築を行った。',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    sortOrder: 2,
  },
  {
    type: 'work',
    organization: '株式会社KIYONO',
    role: 'バックエンドエンジニア',
    description:
      '自社 CDP（カスタマーデータプラットフォーム）の新規機能開発を担当。Django と PostgreSQL を用いたバックエンド実装に加え、Google Cloud（Cloud Storage、Datastore、BigQuery）を活用したデータ基盤の構築を行った。',
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    sortOrder: 3,
  },
  {
    type: 'work',
    organization: '株式会社インテリジェントフォース',
    role: 'フルスタックエンジニア',
    description:
      '社内システムの開発・運用保守を担当。Microsoft Azure を用いたサービスホスティングおよび CI/CD パイプラインの構築を行った。エンタメ領域では React と GSAP を用いた LP 制作を担当。また、Microsoft Foundry AI を活用した AI エージェントの PoC 開発にも携わった。',
    startDate: '2024-09-01',
    endDate: null,
    sortOrder: 4,
  },
  {
    type: 'work',
    organization: 'ランディット株式会社',
    role: 'フルスタックエンジニア',
    description:
      '企業向け・一般消費者向けの自社モビリティ SaaS の開発を推進。Next.js を用いた新規機能開発やバグ改修、Storybook・Jest によるテスト実装を担当。NestJS と TypeORM を用いた DB 設計・API 構築から実装までを一貫して行った。',
    startDate: '2024-09-01',
    endDate: '2025-03-31',
    sortOrder: 5,
  },
  {
    type: 'work',
    organization: '株式会社Seppia',
    role: 'フルスタックエンジニア',
    description:
      '自社ノーコード業務 SaaS 構築サービスの開発に従事。Next.js と NestJS を用いてフロントエンドからバックエンドまでの開発を担当した。GraphQL API（Hasura）を活用したデータ連携基盤の構築も行った。',
    startDate: '2025-04-01',
    endDate: '2025-07-31',
    sortOrder: 6,
  },
  {
    type: 'work',
    organization: '株式会社STAR UP',
    role: 'フルスタックエンジニア',
    description:
      '株式会社インテリジェントフォースと連携した受託開発として、製造業向け設計図管理システムの開発を担当。shadcn/ui の導入やコンポーネント群の実装、Alembic を用いた DB マイグレーション管理の仕組み導入、クリーンアーキテクチャへの刷新を行った。設計図内の図表や部品からメタデータを抽出するための画像処理アルゴリズム（YOLO）のモデル構築・検証にも携わった。',
    startDate: '2025-05-01',
    endDate: '2025-11-30',
    sortOrder: 7,
  },
];
