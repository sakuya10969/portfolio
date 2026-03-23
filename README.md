# 🧑‍💻 Portfolio Site

エンジニアとしての技術力・設計力・制作実績を伝えるためのポートフォリオサイト。  
Next.js App Router + Feature-Sliced Design (FSD) によるフルスタック構成。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router), React 19 |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4, shadcn/ui |
| アニメーション | Framer Motion |
| データフェッチ | SWR (クライアント), Server Components (サーバー) |
| DB | PostgreSQL 16 |
| ORM | Prisma 7 |
| バリデーション | Zod, React Hook Form |
| テーマ | next-themes (light / dark / system) |
| アイコン | Lucide React |
| パッケージマネージャ | pnpm |

## ページ構成

| パス | 内容 |
|---|---|
| `/` | Home — ファーストビュー、代表プロジェクト、技術スタック概要 |
| `/about` | About — 自己紹介、経歴要約、外部リンク |
| `/projects` | Projects — プロジェクト一覧、カテゴリ・技術フィルタ |
| `/projects/[slug]` | Project Detail — 背景・設計・工夫・課題・改善予定 |
| `/skills` | Skills — 技術スタックをカテゴリ別・習熟度付きで表示 |
| `/experience` | Experience — 職歴を時系列で表示 |
| `/contact` | Contact — 問い合わせフォーム |

## セットアップ

### 前提条件

- Node.js 20+
- pnpm
- Docker (ローカル DB 用)

### 手順

```bash
# 依存パッケージのインストール
pnpm install

# ローカル DB の起動
docker compose up -d

# 環境変数の設定
cp .env.local.example .env.local
# DATABASE_URL を設定

# DB マイグレーション + シードデータ投入
pnpm db:setup

# 開発サーバー起動
pnpm dev
```

`http://localhost:3000` でアクセス可能。

## スクリプト一覧

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm dev:turbo` | Turbopack で開発サーバー起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバー起動 |
| `pnpm lint` | ESLint 実行 |
| `pnpm lint:fix` | ESLint 自動修正 |
| `pnpm format` | Prettier でフォーマット |
| `pnpm format:check` | フォーマットチェック |
| `pnpm typecheck` | TypeScript 型チェック |
| `pnpm check` | lint + format:check + typecheck を一括実行 |
| `pnpm fix` | lint:fix + format を一括実行 |
| `pnpm db:generate` | Prisma Client 生成 |
| `pnpm db:migrate` | マイグレーション実行 |
| `pnpm db:migrate:create` | マイグレーションファイル作成のみ |
| `pnpm db:migrate:deploy` | 本番向けマイグレーション適用 |
| `pnpm db:migrate:reset` | DB リセット |
| `pnpm db:seed` | シードデータ投入 |
| `pnpm db:studio` | Prisma Studio 起動 |
| `pnpm db:setup` | マイグレーション + シード一括実行 |

## ディレクトリ構成 (FSD)

```
src/
├── app/            # Next.js App Router (ルーティング、layout、providers)
├── views/          # ページ単位の構成 (FSD pages レイヤー)
├── widgets/        # 大きな UI ブロック (hero, header, footer, sections)
├── features/       # 機能単位 (project-filter, contact-form, theme-toggle)
├── entities/       # ドメインデータ (project, skill, experience, profile)
├── shared/         # 共通基盤 (ui, lib, config, api, types)
│   ├── ui/         # shadcn/ui ベースコンポーネント
│   ├── lib/        # Prisma client, ユーティリティ
│   ├── config/     # サイト設定、定数
│   ├── api/        # SWR fetcher
│   └── types/      # 共通型定義
prisma/
├── schema.prisma   # DB スキーマ定義
├── seed.ts         # シードスクリプト (TypeScript)
├── seed.sql        # シードスクリプト (SQL)
└── migrations/     # マイグレーション履歴
```

依存方向: `app → views → widgets → features → entities → shared`

## DB スキーマ

主要モデル: Profile, SocialLink, Project, ProjectCategory, ProjectLink, Technology, ProjectTechnology, SkillCategory, Skill, Experience, Contact

詳細は `prisma/schema.prisma` を参照。

## ライセンス

Private
