# アーキテクチャ

## 採用アーキテクチャ: Feature-Sliced Design (FSD)

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

## レイヤー定義

| レイヤー | 配置先 | 責務 |
|---|---|---|
| app | `src/app/` | Next.js App Router エントリ。layout, providers, global styles, route segment |
| pages | `src/pages/` | 画面単位の構成。widgets / features を合成してページを構築 |
| widgets | `src/widgets/` | 大きな UI ブロック。Hero, Project list, Skill section 等 |
| features | `src/features/` | 機能単位。project-filter, contact-form, theme-toggle 等 |
| entities | `src/entities/` | ドメインデータ表現。型、UI 断片、mapper、取得関数 |
| shared | `src/shared/` | 汎用 UI、ユーティリティ、API client、config、型 |

### processes レイヤー

現時点では導入しない。複数 feature を跨ぐ長いユーザーフローが明確になった段階で `src/processes/` として検討する。

## FSD と App Router の整合

- ルーティングは `src/app/` のファイルベースルーティングに従う
- `app/` の `page.tsx` は薄いエントリポイントとし、FSD `pages/` のコンポーネントを呼び出すだけにする
- ドメインロジックを `app/` に直接書かない
- Route Handlers（`app/api/`）は例外的に `app/` 内に配置。データ取得ロジックは entities に切り出す

```
src/app/page.tsx          → import { HomePage } from "@/pages/home"
src/app/about/page.tsx    → import { AboutPage } from "@/pages/about"
src/app/projects/page.tsx → import { ProjectsPage } from "@/pages/projects"
```

## shared レイヤー内部構成

| ディレクトリ | 責務 | 主な配置物 |
|---|---|---|
| `shared/ui` | 汎用 UI | shadcn/ui ベースコンポーネント |
| `shared/lib` | ユーティリティ | Prisma client (`prisma.ts`), motion utilities (`motion.ts`), ヘルパー |
| `shared/config` | 設定 | 環境変数管理、サイト設定定数 |
| `shared/api` | API 基盤 | SWR fetcher (`fetcher.ts`), API client, レスポンス型 |
| `shared/types` | 共通型 | ドメイン非依存の型定義 |

## スライス内部構成

```
src/entities/project/
├── index.ts          # public API（re-export）
├── ui/               # UI 断片（ProjectCard, ProjectBadge 等）
├── model/            # 型定義、mapper、軽いロジック
└── api/              # データ取得関数
```

外部からは必ず `index.ts` 経由で import する。スライス内部への直接参照は禁止。

## ディレクトリ構成

```
src/
├── app/                          # app レイヤー（Next.js App Router）
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── providers.tsx
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── skills/page.tsx
│   ├── experience/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       ├── projects/
│       │   ├── route.ts
│       │   └── [slug]/route.ts
│       ├── skills/route.ts
│       ├── experiences/route.ts
│       └── contact/route.ts
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
| Zod スキーマ | camelCase + Schema | `contactFormSchema` |
| カスタムフック | use + camelCase | `useProjects`, `useThemeToggle` |
