# 技術仕様

## 概要

本ドキュメントはポートフォリオサイトの技術仕様を定義する。
アーキテクチャや構造方針は `docs/architecture-philosophy.md` および `.kiro/steering/structure.md` を参照すること。
機能一覧は `docs/features.md` を参照すること。

---

## システム構成

```
[ブラウザ]
  └── React Router v7 (SSR, port 5173 dev)
        ├── loader → fetch → Hono API（初期表示 SSR）
        └── TanStack Query + Axios → Hono API（クライアント再取得）

[Hono API サーバー] (port 3000)
  ├── Routes → Services → Drizzle ORM → PostgreSQL (Neon)
  ├── @hono/zod-openapi → OpenAPI スキーマ生成
  └── Zod バリデーション

[データベース]
  └── PostgreSQL (Neon Serverless)

[API クライアント生成]
  └── Orval → server/openapi/openapi.json → client/app/shared/api/
```

---

## フロントエンド技術仕様（`client/`）

### ランタイム・ビルド

| 技術 | バージョン | 仕様 |
|---|---|---|
| React Router v7 | 7.x | SSR 有効（`ssr: true`）。loader/action でサーバーサイドデータ取得 |
| React | 19.x | JSX ランタイム: `react-jsx` |
| TypeScript | 6.x | `strict: true`, `moduleResolution: bundler` |
| Vite | 8.x | `@react-router/dev/vite` プラグイン使用 |

### UI・スタイリング

| 技術 | 仕様 |
|---|---|
| Mantine UI 9.x | `@mantine/core` の `MantineProvider` で root.tsx をラップ。`ColorSchemeScript` を `<head>` に配置 |
| PostCSS | `postcss-preset-mantine` + `postcss-simple-vars` |
| Tailwind CSS 4.x | `@tailwindcss/vite` プラグイン。Mantine と併用（レイアウト微調整用） |
| Framer Motion 12.x | アニメーション。`prefers-reduced-motion` 対応必須 |
| Lucide React | アイコン。Tree-shakable import |

### データ取得

| 技術 | 仕様 |
|---|---|
| TanStack Query 5.x | `QueryClientProvider` を root.tsx に配置。devtools は開発時のみ |
| Axios | `client/app/shared/api/client.ts` に共通インスタンス。baseURL は `VITE_API_URL` |
| Orval | `client/orval.config.ts` で設定。`react-query` クライアント生成。mutator は `httpClient` |

### フォーム・バリデーション

| 技術 | 仕様 |
|---|---|
| Mantine Form 9.x | `@mantine/form` でフォーム状態管理 |
| Zod 4.x | バリデーションスキーマ定義。サーバーと共有可能 |

### パスエイリアス

- `~/` → `client/app/`（tsconfig.json の `paths` で定義）

### 環境変数

| 変数 | 説明 |
|---|---|
| `VITE_API_URL` | Hono API のベース URL（デフォルト: `http://localhost:3000`） |

---

## バックエンド技術仕様（`server/`）

### ランタイム・フレームワーク

| 技術 | 仕様 |
|---|---|
| Bun | ランタイム。`bun run --hot` でホットリロード開発 |
| Hono 4.x | `OpenAPIHono` を使用。CORS ミドルウェア適用 |
| @hono/zod-openapi | ルート定義から OpenAPI 3.0 スキーマを自動生成 |
| @hono/zod-validator | リクエストボディの Zod バリデーション |

### ORM・データベース

| 技術 | 仕様 |
|---|---|
| Drizzle ORM | `server/src/db/schema/` でテーブル定義。リレーション定義あり |
| drizzle-kit | `server/drizzle.config.ts` で設定。push / generate / studio 対応 |
| PostgreSQL (Neon) | SSL 必須。`postgres` ドライバ使用 |

### API レスポンス形式

成功: `{ data: T }` (200 / 201)
エラー: `{ error: { message: string, code: string } }` (400 / 404 / 500)

### CORS

- Origin: `CORS_ORIGIN` 環境変数（デフォルト: `http://localhost:5173`）
- Methods: GET, POST
- Headers: Content-Type

### 環境変数

| 変数 | 配置先 | 説明 |
|---|---|---|
| `DATABASE_URL` | `server/.env.local` | PostgreSQL 接続文字列 |
| `CORS_ORIGIN` | `server/.env.local` | CORS 許可オリジン |
| `PORT` | `server/.env.local` | サーバーポート（デフォルト: 3000） |

---

## データベース仕様

### テーブル一覧

| テーブル | 責務 | 主な関連 |
|---|---|---|
| profiles | サイトオーナー基本情報（1件） | → social_links (1:N) |
| social_links | SNS / GitHub リンク | → profiles (N:1) |
| project_categories | プロジェクト分類 | → projects (1:N) |
| projects | 制作物情報 | → categories (N:1), → project_links (1:N), ↔ technologies (N:N) |
| project_links | プロジェクト外部リンク | → projects (N:1) |
| technologies | 技術マスタ | ↔ projects (N:N), ← skills (1:N) |
| project_technologies | projects-technologies 中間テーブル | → projects, → technologies |
| skill_categories | スキル分類 | → skills (1:N) |
| skills | 個別スキル | → skill_categories (N:1), → technologies (N:1, optional) |
| experiences | 職歴・学歴・活動歴 | 独立 |
| contacts | 問い合わせ | 独立 |

### Enum 定義（pgEnum）

| Enum | 値 |
|---|---|
| SocialPlatform | github, twitter, linkedin, website, other |
| ProjectLinkType | github, demo, docs, other |
| ExperienceType | work, education, activity |
| Proficiency | beginner, intermediate, advanced, expert |

### 共通カラム方針

- 全テーブル: `id` (text PK), `createdAt`, `updatedAt`
- 表示順制御: `sortOrder` (integer)
- 公開制御: `isPublished` (boolean) — projects のみ
- contacts は `updatedAt` なし

---

## API エンドポイント仕様

| メソッド | パス | 説明 | バリデーション |
|---|---|---|---|
| GET | `/health` | ヘルスチェック | なし |
| GET | `/api/profile` | プロフィール + SNS リンク | なし |
| GET | `/api/projects` | プロジェクト一覧 | query: `?category=`, `?technology=` |
| GET | `/api/projects/categories` | カテゴリ一覧 | なし |
| GET | `/api/projects/:slug` | プロジェクト詳細 | param: slug (404 対応) |
| GET | `/api/skills` | スキル一覧（カテゴリ別） | なし |
| GET | `/api/experiences` | 経歴一覧（sortOrder 順） | なし |
| POST | `/api/contact` | 問い合わせ送信 | body: Zod スキーマ（name, email, subject, message） |

---

## 開発環境仕様

### 起動コマンド

| コマンド | 説明 |
|---|---|
| `cd client && pnpm dev` | React Router 開発サーバー (port 5173) |
| `cd server && bun run dev` | Hono 開発サーバー (port 3000, hot reload) |
| `docker compose up -d` | PostgreSQL コンテナ起動 |
| `cd server && bun run db:push` | Drizzle スキーマを DB に反映 |
| `cd server && bun run db:seed` | シードデータ投入 |
| `cd server && bun run db:studio` | Drizzle Studio 起動 |
| `cd server && bun run generate:openapi` | OpenAPI スキーマ生成 |
| `cd client && pnpm orval` | API クライアント自動生成 |

### OpenAPI → クライアント生成フロー

```
1. server/src/routes/ でルート定義（@hono/zod-openapi）
2. bun run generate:openapi → server/openapi/openapi.json 生成
3. cd client && pnpm orval → client/app/shared/api/generated/ に型・hooks 生成
```
