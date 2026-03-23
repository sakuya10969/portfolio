# 構造方針

## FSD 採用理由

Feature-Sliced Design（FSD）を採用する理由は以下の通り。

- ページ・機能・ドメイン・共通基盤の責務が明確に分離される
- 「この処理はどこに置くか」の判断基準がレイヤーとスライスで一意に決まる
- コンポーネントの再利用範囲と依存方向が制約されるため、暗黙の結合を防げる
- ポートフォリオサイトは小規模だが、Project / Skill / Experience など複数のドメインエンティティを扱うため、pages/components/lib の平坦な構造では責務が曖昧になりやすい
- 将来的な機能追加（ブログ、管理画面等）にも構造を壊さず対応できる

## レイヤー定義と責務

FSD のレイヤーは上位から下位への一方向依存を原則とする。上位レイヤーは下位レイヤーに依存できるが、逆方向の依存は禁止する。

```
app → pages → widgets → features → entities → shared
```

### app レイヤー

- Next.js App Router に必要なアプリケーションエントリを担う
- `src/app/` ディレクトリに配置する
- layout.tsx、providers、global styles、route segment 管理を置く
- ルーティングと大枠の初期設定が責務。ドメインロジックは書かない
- 各 route segment の `page.tsx` は pages レイヤーのコンポーネントを呼び出すだけにする

### pages レイヤー

- 画面単位の構成を担う
- `src/pages/` ディレクトリに配置する（Next.js の Pages Router とは無関係。FSD の pages レイヤー）
- ルートごとのページ構成を組み立てる
- 複数の widgets / features を合成してページ全体を構築する
- データ取得のオーケストレーションもここで行う（Server Component として）

### widgets レイヤー

- ページを構成する比較的大きな UI ブロックを担う
- `src/widgets/` ディレクトリに配置する
- 例：hero-section, project-list-section, skill-section, experience-section, contact-section
- 複数の entities / features を組み合わせた表示単位
- ページ固有のレイアウト調整はここで吸収する

### features レイヤー

- ユーザー操作や意味のある機能単位を担う
- `src/features/` ディレクトリに配置する
- 例：project-filter, contact-form, theme-toggle, mobile-menu
- UI とロジックを機能単位でまとめる
- 状態管理、イベントハンドリング、API 呼び出しを含む

### entities レイヤー

- ドメイン上の主要データ表現を担う
- `src/entities/` ディレクトリに配置する
- 例：project, skill, experience, profile
- 型定義、UI 断片（カード、バッジ等）、mapper、軽いロジックを整理する
- ビジネスロジックは最小限。データの表現と変換が中心

### shared レイヤー

- 汎用 UI、ユーティリティ、API client、schema、config、定数を担う
- `src/shared/` ディレクトリに配置する
- どのレイヤーからも参照される共通基盤
- ドメイン知識を含まない

### processes レイヤー

- 今回は必須レイヤーとして固定しない
- 複数 feature を跨ぐ長いユーザーフロー（例：多段階フォーム、ウィザード）が明確になった段階で導入を検討する
- 導入する場合は `src/processes/` に配置する

## FSD と App Router の整合方針

Next.js App Router のファイルベースルーティングと FSD のレイヤー構造を以下のように両立させる。

- ルーティングは Next.js の `src/app/` に従う。`app/` 配下には route segment（`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`）を置く
- `app/` の `page.tsx` は薄いエントリポイントとし、FSD の `pages/` レイヤーのコンポーネントを import して呼び出すだけにする
- 画面の実体ロジック・構成は FSD の `pages/` や `widgets/` に寄せる
- `app/` にドメイン知識を直接書き込まない
- Route Handlers（`app/api/`）は例外的に `app/` 内に置く。ただし、データ取得ロジック自体は shared や entities に切り出す

```
src/app/page.tsx          → import { HomePage } from "@/pages/home"
src/app/about/page.tsx    → import { AboutPage } from "@/pages/about"
src/app/projects/page.tsx → import { ProjectsPage } from "@/pages/projects"
```

## shared レイヤーの内部構成

shared は以下のサブディレクトリで責務を分離する。

| ディレクトリ | 責務 |
|---|---|
| `shared/ui` | shadcn/ui ベースコンポーネント、汎用 UI 部品 |
| `shared/lib` | Prisma client、汎用ヘルパー関数、ユーティリティ |
| `shared/config` | 環境変数管理、サイト設定定数 |
| `shared/api` | SWR fetcher、API client、レスポンス型 |
| `shared/types` | 共通型定義（ドメイン非依存） |

- `shared/lib/prisma.ts` に Prisma client のシングルトンインスタンスを配置する
- `shared/lib/motion.ts` に Framer Motion の共通 variants / transition presets を配置する
- `shared/api/fetcher.ts` に SWR 用の汎用 fetcher を配置する
- Zod スキーマのうちドメイン非依存なもの（メールアドレス形式等）は `shared/lib` に置く。ドメイン固有のスキーマは entities に置く

## 各スライスの内部構成

FSD の各スライスは以下の構成を基本とする。

```
src/entities/project/
├── index.ts          # public API（re-export）
├── ui/               # UI 断片（ProjectCard, ProjectBadge 等）
├── model/            # 型定義、mapper、軽いロジック
└── api/              # データ取得関数（必要な場合）
```

- `index.ts` でスライスの公開 API を制御する。外部からは `index.ts` 経由でのみ import する
- スライス内部の直接参照は禁止する（例：`@/entities/project/ui/ProjectCard` ではなく `@/entities/project` から import）

## データアクセス方針

- DB アクセスは Prisma に集約する
- Prisma client は `src/shared/lib/prisma.ts` にまとめる
- データ取得関数は責務ごとに整理する
  - Project の取得 → `src/entities/project/api/`
  - Skill の取得 → `src/entities/skill/api/`
  - Experience の取得 → `src/entities/experience/api/`
  - Profile の取得 → `src/entities/profile/api/`
- Server Component からは entities の取得関数を直接呼ぶ
- Client Component からは SWR + Route Handler 経由で取得する
- Route Handlers から DB にアクセスする場合も、entities の取得関数を再利用する

## 命名規則

| 対象 | 規則 | 例 |
|---|---|---|
| ディレクトリ名 | kebab-case | `project-filter`, `hero-section` |
| ファイル名 | kebab-case | `project-card.tsx`, `use-projects.ts` |
| React コンポーネント export | PascalCase | `ProjectCard`, `HeroSection` |
| 関数 export | camelCase | `getProjects`, `formatDate` |
| 型 / interface | PascalCase | `Project`, `SkillCategory` |
| 定数 | UPPER_SNAKE_CASE | `SITE_NAME`, `MAX_PROJECTS_PER_PAGE` |
| Route Handler | `route.ts` | `app/api/projects/route.ts` |
| Prisma model | 単数形 PascalCase | `Project`, `Technology` |
| Zod スキーマ | camelCase + Schema 接尾辞 | `contactFormSchema`, `projectFilterSchema` |
| カスタムフック | camelCase + use 接頭辞 | `useProjects`, `useThemeToggle` |

## データフロー方針

### 初期表示（Server Component）

```
Server Component → entities/*/api/ → Prisma → PostgreSQL
                 → widgets/*/ui/ → レンダリング
```

- 初期表示データはサーバー側取得を優先する
- pages レイヤーの Server Component でデータを取得し、widgets / entities に props で渡す

### クライアント再取得（Client Component）

```
Client Component → SWR → Route Handler → entities/*/api/ → Prisma → PostgreSQL
                 → UI 更新
```

- インタラクティブな再取得（フィルタ変更等）だけ SWR を使う
- SWR のキャッシュキーは Route Handler のパスに合わせる

### フォーム送信

```
React Hook Form → fetch → Route Handler → Zod validation → Prisma → PostgreSQL
               → 成功/エラーレスポンス → UI フィードバック
```

- Contact form などの送信は Route Handler 経由にする
- 更新後は SWR mutate によって関連データを再検証可能な構成にする

## 想定ディレクトリ構成

```
src/
├── app/                          # app レイヤー（Next.js App Router）
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── providers.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── skills/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       ├── projects/
│       │   ├── route.ts
│       │   └── [slug]/
│       │       └── route.ts
│       ├── skills/
│       │   └── route.ts
│       ├── experiences/
│       │   └── route.ts
│       └── contact/
│           └── route.ts
├── pages/                        # pages レイヤー（FSD）
│   ├── home/
│   ├── about/
│   ├── projects/
│   ├── project-detail/
│   ├── skills/
│   ├── experience/
│   └── contact/
├── widgets/                      # widgets レイヤー
│   ├── hero-section/
│   ├── project-list-section/
│   ├── skill-section/
│   ├── experience-section/
│   ├── contact-section/
│   ├── header/
│   └── footer/
├── features/                     # features レイヤー
│   ├── project-filter/
│   ├── contact-form/
│   ├── theme-toggle/
│   └── mobile-menu/
├── entities/                     # entities レイヤー
│   ├── project/
│   ├── skill/
│   ├── experience/
│   └── profile/
└── shared/                       # shared レイヤー
    ├── ui/
    ├── lib/
    ├── config/
    ├── api/
    └── types/

prisma/
├── schema.prisma
├── seed.ts
└── migrations/

public/
docker-compose.yml
```
