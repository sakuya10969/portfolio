# 構造方針

## モノレポ構成

プロジェクトは `client/` と `server/` の2パッケージで構成するモノレポとする。

```
portfolio/
├── client/          # フロントエンド（React Router v7 + Mantine UI）
├── server/          # バックエンド API（Hono + Drizzle ORM）
├── docs/            # プロジェクトドキュメント
├── .kiro/           # Kiro 設定・steering
├── docker-compose.yml
├── DESIGN.md        # デザインシステム定義
```

## フロントエンド: FSD（Feature-Sliced Design）

### FSD 採用理由

- ページ・機能・ドメイン・共通基盤の責務が明確に分離される
- 「この処理はどこに置くか」の判断基準がレイヤーとスライスで一意に決まる
- コンポーネントの再利用範囲と依存方向が制約されるため、暗黙の結合を防げる
- 複数のドメインエンティティ（Project / Skill / Experience 等）を扱うため、平坦な構造では責務が曖昧になりやすい
- 将来的な機能追加（ブログ、管理画面等）にも構造を壊さず対応できる

### レイヤー定義と責務

FSD のレイヤーは上位から下位への一方向依存を原則とする。逆方向の依存は禁止。

```
app → pages → widgets → features → entities → shared
```

#### app レイヤー

- React Router のアプリケーションエントリを担う
- `client/app/` ディレクトリに配置する
- root.tsx（MantineProvider, レイアウト）、routes.ts（ルート定義）、グローバル CSS を置く
- ルーティングと大枠の初期設定が責務。ドメインロジックは書かない

#### pages レイヤー

- 画面単位の構成を担う
- `client/app/pages/` ディレクトリに配置する
- 各ルートに対応するページコンポーネントを配置
- 複数の widgets / features を合成してページ全体を構築する
- React Router の loader / action によるデータ取得もここで行う

#### widgets レイヤー

- ページを構成する比較的大きな UI ブロックを担う
- `client/app/widgets/` ディレクトリに配置する
- 例：hero-section, project-list-section, skill-section, experience-section, contact-section, header, footer
- 複数の entities / features を組み合わせた表示単位

#### features レイヤー

- ユーザー操作や意味のある機能単位を担う
- `client/app/features/` ディレクトリに配置する
- 例：project-filter, contact-form, color-scheme-toggle, mobile-menu
- UI とロジックを機能単位でまとめる
- 状態管理、イベントハンドリング、API 呼び出しを含む

#### entities レイヤー

- ドメイン上の主要データ表現を担う
- `client/app/entities/` ディレクトリに配置する
- 例：project, skill, experience, profile
- 型定義、UI 断片（カード、バッジ等）、mapper、軽いロジックを整理する

#### shared レイヤー

- 汎用 UI、ユーティリティ、API client、schema、config、定数を担う
- `client/app/shared/` ディレクトリに配置する
- どのレイヤーからも参照される共通基盤
- ドメイン知識を含まない

### FSD と React Router の整合方針

React Router v7 のファイルベースルーティングと FSD のレイヤー構造を以下のように両立させる。

- ルート定義は `client/app/routes.ts` で管理する
- 各ルートファイルは `client/app/routes/` に配置し、pages レイヤーのコンポーネントを呼び出す薄いエントリポイントとする
- loader / action はルートファイル内に定義し、pages レイヤーのデータ取得関数を呼ぶ
- 画面の実体ロジック・構成は FSD の pages / widgets に寄せる

```
client/app/routes/home.tsx       → import { HomePage } from "~/pages/home"
client/app/routes/about.tsx      → import { AboutPage } from "~/pages/about"
client/app/routes/projects.tsx   → import { ProjectsPage } from "~/pages/projects"
```

### shared レイヤーの内部構成

| ディレクトリ | 責務 |
|---|---|
| `shared/ui` | Mantine ベースの汎用 UI コンポーネント |
| `shared/lib` | 汎用ヘルパー関数、ユーティリティ、Framer Motion プリセット |
| `shared/config` | サイト設定定数、環境変数管理 |
| `shared/api` | Orval 生成の API クライアント、Axios インスタンス |
| `shared/types` | 共通型定義（ドメイン非依存） |

### 各スライスの内部構成

```
client/app/entities/project/
├── index.ts          # public API（re-export）
├── ui/               # UI 断片（ProjectCard 等）
├── model/            # 型定義、mapper
└── api/              # データ取得関数（TanStack Query hooks 等）
```

- `index.ts` でスライスの公開 API を制御する。外部からは `index.ts` 経由でのみ import する
- スライス内部の直接参照は禁止する

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

### ディレクトリ構成

```
server/
├── src/
│   ├── index.ts              # エントリポイント（サーバー起動）
│   ├── app.ts                # Hono アプリ構築（CORS, ルーティングマウント）
│   ├── routes/               # ルートハンドラ
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
│   ├── db/
│   │   ├── index.ts          # Drizzle client インスタンス
│   │   ├── schema/           # テーブル定義、Enum、リレーション
│   │   └── seed.ts           # シードスクリプト
│   ├── openapi/
│   │   ├── document.ts       # OpenAPI ドキュメント生成
│   │   └── schemas.ts        # OpenAPI スキーマ定義
│   └── lib/
│       └── response.ts       # API レスポンスヘルパー
├── openapi/
│   └── openapi.json          # 生成された OpenAPI スキーマ
├── scripts/
│   └── generate-openapi.ts   # OpenAPI 生成スクリプト
├── drizzle.config.ts
└── package.json
```

## データフロー方針

### 初期表示（React Router loader）

```
routes/*.tsx (loader) → fetch(Hono API) → JSON
                      → pages/* → widgets/* → レンダリング
```

- 初期表示データは React Router の loader でサーバーサイド取得する
- loader で取得したデータを useLoaderData() でコンポーネントに渡す

### クライアント再取得（TanStack Query）

```
features/* → TanStack Query → Axios → Hono API → JSON → UI 更新
```

- インタラクティブな再取得（フィルタ変更等）は TanStack Query を使う
- Orval 生成の API クライアントを通じて型安全にデータ取得する

### フォーム送信

```
Mantine Form → Axios → Hono API POST → Zod validation → Drizzle → PostgreSQL
             → 成功/エラーレスポンス → UI フィードバック
```

## 想定ディレクトリ構成（フロントエンド）

```
client/
├── app/
│   ├── root.tsx                  # MantineProvider, レイアウト
│   ├── routes.ts                 # ルート定義
│   ├── app.css                   # グローバル CSS
│   ├── routes/                   # React Router ルートファイル
│   │   ├── home.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── project-detail.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx
│   │   └── contact.tsx
│   ├── pages/                    # pages レイヤー（FSD）
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── project-detail/
│   │   ├── skills/
│   │   ├── experience/
│   │   └── contact/
│   ├── widgets/                  # widgets レイヤー
│   │   ├── hero-section/
│   │   ├── project-list-section/
│   │   ├── skill-section/
│   │   ├── experience-section/
│   │   ├── contact-section/
│   │   ├── header/
│   │   └── footer/
│   ├── features/                 # features レイヤー
│   │   ├── project-filter/
│   │   ├── contact-form/
│   │   ├── color-scheme-toggle/
│   │   └── mobile-menu/
│   ├── entities/                 # entities レイヤー
│   │   ├── project/
│   │   ├── skill/
│   │   ├── experience/
│   │   └── profile/
│   └── shared/                   # shared レイヤー
│       ├── ui/
│       ├── lib/
│       ├── config/
│       ├── api/
│       └── types/
├── public/
├── orval.config.ts
├── react-router.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
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
| Zod スキーマ | camelCase + Schema 接尾辞 | `contactFormSchema`, `projectFilterSchema` |
| カスタムフック | camelCase + use 接頭辞 | `useProjects`, `useColorScheme` |
| TanStack Query キー | camelCase 配列 | `['projects', { category }]` |
