# アーキテクチャ

## 全体構成

モノレポ構成で、フロントエンド（`client/`）とバックエンド（`server/`）を分離する。

| パッケージ | 技術 | アーキテクチャ |
|---|---|---|
| `client/` | React Router v7 + Mantine UI | Feature-Sliced Design (FSD) |
| `server/` | Hono + Drizzle ORM | レイヤードアーキテクチャ |

---

## フロントエンド: Feature-Sliced Design (FSD)

### 採用理由

- ページ・機能・ドメイン・共通基盤の責務が明確に分離される
- 「この処理はどこに置くか」の判断基準がレイヤーとスライスで一意に決まる
- 依存方向が制約されるため、暗黙の結合を防げる
- 複数のドメインエンティティ（Project / Skill / Experience 等）を扱うため、平坦な構造では責務が曖昧になる
- 将来的な機能追加（ブログ、管理画面等）にも構造を壊さず対応できる

### レイヤー依存ルール

上位から下位への一方向依存のみ許可。逆方向の依存は禁止。

```
app → pages → widgets → features → entities → shared
```

### レイヤー定義

| レイヤー | 配置先 | 責務 |
|---|---|---|
| app | `client/app/` | React Router エントリ。root.tsx, routes.ts, グローバル CSS |
| pages | `client/app/pages/` | 画面単位の構成。widgets / features を合成してページを構築 |
| widgets | `client/app/widgets/` | 大きな UI ブロック。Hero, Project list, Skill section 等 |
| features | `client/app/features/` | 機能単位。project-filter, contact-form, color-scheme-toggle 等 |
| entities | `client/app/entities/` | ドメインデータ表現。型、UI 断片、mapper |
| shared | `client/app/shared/` | 汎用 UI、ユーティリティ、API client、config、型 |

### FSD と React Router の整合

- ルート定義は `client/app/routes.ts` で管理する
- 各ルートファイル（`client/app/routes/*.tsx`）は薄いエントリポイントとし、pages レイヤーのコンポーネントを呼び出す
- loader / action はルートファイル内に定義する
- ドメインロジックをルートファイルに直接書かない

```
client/app/routes/home.tsx       → import { HomePage } from "~/pages/home"
client/app/routes/about.tsx      → import { AboutPage } from "~/pages/about"
client/app/routes/projects.tsx   → import { ProjectsPage } from "~/pages/projects"
```

### shared レイヤー内部構成

| ディレクトリ | 責務 | 主な配置物 |
|---|---|---|
| `shared/ui` | 汎用 UI | Mantine ベースの共通コンポーネント |
| `shared/lib` | ユーティリティ | Framer Motion プリセット、ヘルパー関数 |
| `shared/config` | 設定 | サイト設定定数、環境変数管理 |
| `shared/api` | API 基盤 | Orval 生成クライアント、Axios インスタンス |
| `shared/types` | 共通型 | ドメイン非依存の型定義 |

### スライス内部構成

```
client/app/entities/project/
├── index.ts          # public API（re-export）
├── ui/               # UI 断片（ProjectCard 等）
├── model/            # 型定義、mapper
└── api/              # TanStack Query hooks
```

外部からは必ず `index.ts` 経由で import する。スライス内部への直接参照は禁止。

---

## バックエンド: レイヤードアーキテクチャ

### 採用理由

- Routes → Services → DB の責務分離が明確
- 各レイヤーの責務が単純で理解しやすい
- ポートフォリオ API の規模に適した軽量な構成

### レイヤー定義

| レイヤー | ディレクトリ | 責務 |
|---|---|---|
| Routes | `server/src/routes/` | HTTP ハンドリング、リクエスト/レスポンス変換、バリデーション |
| Services | `server/src/services/` | ビジネスロジック、データ取得・加工 |
| DB / Schema | `server/src/db/` | Drizzle スキーマ定義、DB クライアント、シード |
| Lib | `server/src/lib/` | 共通ユーティリティ（レスポンスヘルパー等） |
| OpenAPI | `server/src/openapi/` | OpenAPI ドキュメント定義、スキーマ |

### データフロー

```
HTTP Request → Routes (バリデーション) → Services (ロジック) → Drizzle → PostgreSQL
            ← Routes (レスポンス整形) ← Services (データ加工) ← Drizzle ← PostgreSQL
```

---

## ディレクトリ構成

```
portfolio/
├── client/                       # フロントエンド
│   ├── app/
│   │   ├── root.tsx              # MantineProvider, レイアウト
│   │   ├── routes.ts             # ルート定義
│   │   ├── app.css
│   │   ├── routes/               # React Router ルートファイル
│   │   │   ├── home.tsx
│   │   │   ├── about.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── project-detail.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── experience.tsx
│   │   │   └── contact.tsx
│   │   ├── pages/                # pages レイヤー（FSD）
│   │   ├── widgets/              # widgets レイヤー
│   │   ├── features/             # features レイヤー
│   │   ├── entities/             # entities レイヤー
│   │   └── shared/               # shared レイヤー
│   ├── public/
│   ├── orval.config.ts
│   ├── react-router.config.ts
│   ├── vite.config.ts
│   └── package.json
├── server/                       # バックエンド
│   ├── src/
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── routes/
│   │   ├── services/
│   │   ├── db/
│   │   ├── openapi/
│   │   └── lib/
│   ├── openapi/
│   │   └── openapi.json
│   ├── drizzle.config.ts
│   └── package.json
├── docs/
├── .kiro/
├── docker-compose.yml
├── DESIGN.md
└── package.json                  # ワークスペースルート
```

## 命名規則

| 対象 | 規則 | 例 |
|---|---|---|
| ディレクトリ名 | kebab-case | `project-filter`, `hero-section` |
| ファイル名 | kebab-case | `project-card.tsx`, `use-projects.ts` |
| React コンポーネント export | PascalCase | `ProjectCard`, `HeroSection` |
| 関数 export | camelCase | `getProjects`, `formatDate` |
| 型 / interface | PascalCase | `Project`, `SkillCategory` |
| 定数 | UPPER_SNAKE_CASE | `SITE_NAME`, `MAX_PROJECTS_PER_PAGE` |
| Hono ルートファイル | kebab-case | `projects.ts`, `contact.ts` |
| Drizzle テーブル | snake_case 複数形 | `projects`, `skill_categories` |
| Zod スキーマ | camelCase + Schema | `contactFormSchema` |
| カスタムフック | use + camelCase | `useProjects`, `useColorScheme` |
