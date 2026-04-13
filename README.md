# 🧑‍💻 Portfolio Site

エンジニアとしての技術力・設計力・制作実績を伝えるためのポートフォリオサイト。
React Router v7 + Mantine UI のフロントエンドと、Hono + Drizzle ORM のバックエンド API によるモノレポ構成。

## 技術スタック

### フロントエンド（`client/`）

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React Router v7 (SSR), React 19 |
| 言語 | TypeScript |
| UI ライブラリ | Mantine UI v9 |
| アニメーション | Framer Motion |
| データフェッチ | TanStack Query (クライアント), React Router loader (サーバー) |
| フォーム | Mantine Form + Zod |
| HTTP クライアント | Axios |
| API クライアント生成 | Orval (OpenAPI → 型安全クライアント) |
| アイコン | Tabler Icons |
| ビルド | Vite |

### バックエンド（`server/`）

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Hono |
| ランタイム | Bun |
| ORM | Drizzle ORM |
| DB | PostgreSQL 16 (本番: Neon Serverless) |
| バリデーション | Zod + @hono/zod-openapi |
| API ドキュメント | OpenAPI 自動生成 |

### 開発基盤

| カテゴリ | 技術 |
|---|---|
| パッケージ管理 | pnpm (client), Bun (server) |
| リンター / フォーマッター | Biome |
| ローカル DB | Docker Compose |
| CSS | PostCSS (Mantine プリセット) |

## ページ構成

| パス | 内容 |
|---|---|
| `/` | Home — ファーストビュー、代表プロジェクト、技術スタック概要 |
| `/about` | About — 自己紹介、経歴要約、外部リンク |
| `/projects` | Projects — プロジェクト一覧、カテゴリ・技術フィルタ |
| `/projects/:slug` | Project Detail — 背景・設計・工夫・課題・改善予定 |
| `/skills` | Skills — 技術スタックをカテゴリ別・習熟度付きで表示 |
| `/experience` | Experience — 職歴・学歴を時系列で表示 |
| `/contact` | Contact — 問い合わせフォーム |

## セットアップ

### 前提条件

- Node.js 20+
- pnpm
- Bun
- Docker (ローカル DB 用)

### 手順

```bash
# クライアント依存パッケージのインストール
cd client && pnpm install

# サーバー依存パッケージのインストール
cd server && bun install

# ローカル DB の起動
docker compose up -d

# 環境変数の設定
cp .env.example .env
# DATABASE_URL, CORS_ORIGIN を設定

# DB スキーマの反映 + シードデータ投入
cd server
bun run db:push
bun run db:seed

# サーバー起動 (http://localhost:3000)
bun run dev

# クライアント起動 (別ターミナル)
cd client
pnpm dev
```

## スクリプト一覧

### クライアント (`client/`)

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバー起動 |
| `pnpm lint` | Biome でリントチェック |
| `pnpm format` | Biome でフォーマット |
| `pnpm typecheck` | TypeScript 型チェック |
| `pnpm generate:api` | Orval で API クライアント生成 |

### サーバー (`server/`)

| コマンド | 説明 |
|---|---|
| `bun run dev` | 開発サーバー起動 (hot reload) |
| `bun run start` | サーバー起動 |
| `bun run generate:openapi` | OpenAPI スキーマ生成 |
| `bun run db:generate` | Drizzle マイグレーション生成 |
| `bun run db:push` | DB スキーマ反映 |
| `bun run db:studio` | Drizzle Studio 起動 |
| `bun run db:seed` | シードデータ投入 |

## ディレクトリ構成

```
portfolio/
├── client/                    # フロントエンド (React Router v7 + Mantine UI)
│   └── app/
│       ├── root.tsx           # MantineProvider, レイアウト
│       ├── routes.ts          # ルート定義
│       ├── routes/            # React Router ルートファイル
│       ├── pages/             # ページ構成 (FSD pages)
│       ├── widgets/           # 大きな UI ブロック
│       ├── features/          # 機能単位 (filter, form, toggle)
│       ├── entities/          # ドメインデータ (project, skill, experience, profile)
│       └── shared/            # 共通基盤 (ui, lib, config, api, types)
├── server/                    # バックエンド API (Hono + Drizzle ORM)
│   └── src/
│       ├── index.ts           # エントリポイント
│       ├── app.ts             # Hono アプリ構築
│       ├── routes/            # ルートハンドラ
│       ├── services/          # ビジネスロジック
│       ├── db/                # Drizzle スキーマ, シード
│       ├── openapi/           # OpenAPI ドキュメント
│       └── lib/               # ユーティリティ
├── docker-compose.yml
└── DESIGN.md                  # デザインシステム定義
```

フロントエンドは Feature-Sliced Design (FSD) を採用。依存方向: `app → pages → widgets → features → entities → shared`

## API エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/profile` | プロフィール取得 |
| GET | `/api/projects` | プロジェクト一覧 (フィルタ対応) |
| GET | `/api/projects/categories` | カテゴリ一覧 |
| GET | `/api/projects/:slug` | プロジェクト詳細 |
| GET | `/api/skills` | スキル一覧 |
| GET | `/api/experiences` | 経歴一覧 |
| POST | `/api/contact` | 問い合わせ送信 |

## DB スキーマ

主要テーブル: profiles, social_links, projects, project_categories, project_links, technologies, project_technologies, skill_categories, skills, experiences, contacts

詳細は `server/src/db/schema/` を参照。

## デプロイ

| コンポーネント | デプロイ先 | プロジェクト名 |
|---|---|---|
| フロントエンド | Cloudflare Pages | `sakuya10969-portfolio-client` |
| バックエンド | Cloudflare Workers | `sakuya10969-portfolio-server` |
| データベース | Neon Serverless PostgreSQL | — |

### フロントエンド（Cloudflare Pages）

```bash
cd client
pnpm build
pnpm wrangler pages deploy build/client --project-name=sakuya10969-portfolio-client
```

- GitHub Actions（`.github/workflows/pages-deployment.yaml`）で `main` ブランチへの push 時に自動デプロイ
- 必要なシークレット: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- 必要な変数: `VITE_API_URL`（API のベース URL）

### バックエンド（Cloudflare Workers）

```bash
cd server
bunx wrangler deploy
```

- 設定ファイル: `server/wrangler.jsonc`
- Workers の環境変数（Secrets）に `DATABASE_URL` を設定する

## ライセンス

Private
