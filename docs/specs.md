# 技術仕様

## システム構成

```
[ブラウザ]
  └── Next.js App Router (port 3000)
        ├── Server Components → fetch → Hono API
        └── Client Components → SWR → Hono API

[Hono API サーバー] (port 3001)
  ├── Routes → Services → Drizzle ORM → PostgreSQL (Neon)
  └── Zod バリデーション

[データベース]
  └── PostgreSQL (Neon Serverless)
```

## フロントエンド

### フレームワーク・ランタイム

| 技術 | バージョン | 用途 |
|---|---|---|
| Next.js (App Router) | 16.x | フレームワーク、SSR、ルーティング |
| React | 19.x | UI ライブラリ（React Compiler 対応） |
| TypeScript | 5.x | 型安全な開発 |

### UI / スタイリング

| 技術 | 用途 |
|---|---|
| Tailwind CSS 4.x | ユーティリティファーストのスタイリング |
| shadcn/ui | UI コンポーネントライブラリ（`src/shared/ui/` に配置） |
| Lucide React | アイコン |
| react-icons | 追加アイコン（SNS 等） |
| Framer Motion | アニメーション（Hero, スクロール出現, カードホバー, メニュー開閉） |
| next-themes | テーマ切替（light / dark / system） |

### データ取得・フォーム

| 技術 | 用途 |
|---|---|
| SWR | クライアントサイドデータフェッチ（フィルタ変更時の再取得） |
| React Hook Form | フォーム状態管理（Contact フォーム） |
| Zod 4.x | バリデーション（クライアント・サーバー共有） |

### アーキテクチャ: Feature-Sliced Design (FSD)

依存方向: `app → views → widgets → features → entities → shared`

| レイヤー | ディレクトリ | 責務 |
|---|---|---|
| app | `src/app/` | Next.js App Router エントリ。薄い page.tsx から views を呼ぶだけ |
| views | `src/views/` | 画面単位の構成（FSD の pages レイヤーに相当） |
| widgets | `src/widgets/` | 大きな UI ブロック（hero-section, header, footer 等） |
| features | `src/features/` | 機能単位（project-filter, contact-form, theme-toggle, mobile-menu, intro-countdown） |
| entities | `src/entities/` | ドメインデータ表現（project, skill, experience, profile） |
| shared | `src/shared/` | 汎用 UI, ユーティリティ, API client, config, 型 |

### データフロー

初期表示（Server Component）:
```
views/* → entities/*/api/ → fetch(Hono API) → JSON → widgets/* → レンダリング
```

クライアント再取得（Client Component）:
```
features/* → SWR → fetch(Hono API) → JSON → UI 更新
```

フォーム送信:
```
React Hook Form → fetch(Hono API POST) → Zod validation → DB INSERT → レスポンス → UI フィードバック
```

---

## バックエンド

### ランタイム・フレームワーク

| 技術 | 用途 |
|---|---|
| Bun | JavaScript ランタイム（`server/` 配下の実行） |
| Hono | HTTP フレームワーク（ルーティング、CORS、バリデーション） |
| @hono/zod-validator | リクエストバリデーションミドルウェア |
| Zod 4.x | スキーマ定義・バリデーション |

### ORM・データベース

| 技術 | 用途 |
|---|---|
| Drizzle ORM | 型安全な ORM、スキーマ定義、リレーション |
| drizzle-kit | マイグレーション生成・適用・スタジオ |
| postgres (pg driver) | PostgreSQL 接続ドライバ（SSL 必須） |
| PostgreSQL (Neon) | リレーショナルデータベース（サーバーレス） |

### ディレクトリ構成

```
server/
├── src/
│   ├── index.ts              # Hono アプリエントリ（CORS, ルーティングマウント）
│   ├── db/
│   │   ├── index.ts          # Drizzle client インスタンス
│   │   ├── schema/           # テーブル定義、Enum、リレーション
│   │   └── seed.ts           # シードスクリプト
│   ├── routes/               # Hono ルートハンドラ
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experiences.ts
│   │   └── contact.ts
│   ├── services/             # ビジネスロジック・DB アクセス
│   │   ├── profile.service.ts
│   │   ├── project.service.ts
│   │   ├── skill.service.ts
│   │   ├── experience.service.ts
│   │   └── contact.service.ts
│   └── lib/
│       └── response.ts       # API レスポンスヘルパー
├── drizzle.config.ts
└── package.json
```

### API エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/health` | ヘルスチェック |
| GET | `/api/profile` | プロフィール + SNS リンク |
| GET | `/api/projects` | プロジェクト一覧（`?category=`, `?technology=` フィルタ） |
| GET | `/api/projects/categories` | カテゴリ一覧 |
| GET | `/api/projects/:slug` | プロジェクト詳細（404 対応） |
| GET | `/api/skills` | スキル一覧（カテゴリ別グループ化） |
| GET | `/api/experiences` | 経歴一覧（sortOrder 順） |
| POST | `/api/contact` | 問い合わせ送信（Zod バリデーション → DB INSERT） |

### API レスポンス形式

成功: `{ data: T }` (200 or 201)
エラー: `{ error: { message: string, code: string } }` (400 / 404 / 500)

### CORS 設定

- Origin: `CORS_ORIGIN` 環境変数（デフォルト: `http://localhost:3000`）
- Methods: GET, POST
- Headers: Content-Type

---

## データベース

### テーブル一覧

| テーブル | 責務 | 主な関連 |
|---|---|---|
| Profile | サイトオーナー基本情報（1件） | → SocialLink (1:N) |
| SocialLink | SNS / GitHub リンク | → Profile (N:1) |
| ProjectCategory | プロジェクト分類 | → Project (1:N) |
| Project | 制作物情報 | → Category (N:1), → ProjectLink (1:N), ↔ Technology (N:N) |
| ProjectLink | プロジェクト外部リンク | → Project (N:1) |
| Technology | 技術マスタ | ↔ Project (N:N), ← Skill (1:N) |
| ProjectTechnology | Project-Technology 中間テーブル | → Project, → Technology |
| SkillCategory | スキル分類 | → Skill (1:N) |
| Skill | 個別スキル | → SkillCategory (N:1), → Technology (N:1, optional) |
| Experience | 職歴・学歴・活動歴 | 独立 |
| Contact | 問い合わせ | 独立 |

### Enum 定義（PostgreSQL pgEnum）

| Enum | 値 |
|---|---|
| SocialPlatform | github, twitter, linkedin, website, other |
| ProjectLinkType | github, demo, docs, other |
| ExperienceType | work, education, activity |
| Proficiency | beginner, intermediate, advanced, expert |

### 共通カラム方針

- 全テーブル: `id` (text PK), `createdAt`, `updatedAt`
- 表示順制御: `sortOrder` (integer)
- 公開制御: `isPublished` (boolean) — Project のみ
- Contact は `updatedAt` なし（`createdAt` のみ）

---

## 開発環境

### パッケージマネージャ・ツール

| ツール | 用途 |
|---|---|
| pnpm | フロントエンドパッケージ管理 |
| Bun | バックエンドランタイム・パッケージ管理 |
| Docker Compose | ローカル PostgreSQL（port 5432） |
| ESLint | 静的解析 |
| Prettier | コードフォーマッタ |

### 起動コマンド

| コマンド | 説明 |
|---|---|
| `pnpm dev` | Next.js 開発サーバー (port 3000) |
| `pnpm dev:server` | Hono 開発サーバー (port 3001, hot reload) |
| `docker compose up -d` | PostgreSQL コンテナ起動 |
| `pnpm db:push` | Drizzle スキーマを DB に反映 |
| `pnpm db:seed` | シードデータ投入 |
| `pnpm db:studio` | Drizzle Studio 起動 |

### 環境変数

| 変数 | 配置先 | 説明 |
|---|---|---|
| `DATABASE_URL` | `.env`, `server/.env.local` | PostgreSQL 接続文字列 |
| `NEXT_PUBLIC_API_URL` | `.env.local` | Hono API ベース URL |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` | サイト URL |
| `CORS_ORIGIN` | `server/.env.local` | CORS 許可オリジン |
| `PORT` | `server/.env.local` | Hono サーバーポート |
