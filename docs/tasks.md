# タスク一覧: Next.js → React Router 刷新

## 概要

Next.js (App Router) + shadcn/ui + Tailwind + SWR 構成から、
React Router v7 + Mantine UI + TanStack Query + Axios 構成（`client/` 配下）への完全移行。

移行元: `src/` 配下の FSD 構成（Next.js）
移行先: `client/app/` 配下の FSD 構成（React Router）

---

## Phase 1: client 基盤構築

### 1.1 Mantine テーマ設定
- `client/app/root.tsx` に DESIGN.md に基づく Mantine テーマを適用する
- `createTheme()` で primaryColor, radius, fontFamily, コンポーネントデフォルトを設定
- `ColorSchemeScript` を `<head>` に配置済みであることを確認
- 参照: DESIGN.md Section 11

### 1.2 TanStack Query プロバイダ設定
- `client/app/root.tsx` に `QueryClientProvider` を追加
- 開発時のみ `ReactQueryDevtools` を表示
- QueryClient のデフォルトオプション設定（staleTime, retry 等）

### 1.3 共通レイアウト構築
- `client/app/root.tsx` に Header / Footer を含む共通レイアウトを構築
- Mantine `AppShell` または独自レイアウトコンポーネントを使用

### 1.4 ルート定義
- `client/app/routes.ts` に全7ページのルートを定義
- `client/app/routes/` に各ルートファイルを作成（home, about, projects, project-detail, skills, experience, contact）
- 各ルートファイルは pages レイヤーのコンポーネントを呼び出す薄いエントリポイント

### 1.5 Orval による API クライアント生成
- `cd server && bun run generate:openapi` で OpenAPI スキーマを最新化
- `cd client && pnpm orval` で API クライアント・型・TanStack Query hooks を生成
- 生成先: `client/app/shared/api/generated/`

---

## Phase 2: shared レイヤー移行

### 2.1 shared/config 移行
- `src/shared/config/site.ts` → `client/app/shared/config/site.ts`
- `src/shared/config/technology-icons.ts` → `client/app/shared/config/technology-icons.ts`
- Next.js 固有の環境変数参照（`process.env.NEXT_PUBLIC_*`）を `import.meta.env.VITE_*` に変更
- API_BASE_URL は `client/app/shared/api/client.ts` の Axios インスタンスに集約済み

### 2.2 shared/lib 移行
- `src/shared/lib/motion.ts` → `client/app/shared/lib/motion.ts`（Framer Motion プリセット）
- `src/shared/lib/utils.ts` の `cn()` は Mantine の `clsx` に置き換え可能か判断し移行
- `src/lib/utils.ts` も同様

### 2.3 shared/types 移行
- `src/shared/types/api.ts` → Orval 生成の型で代替可能か確認
- 必要なら `client/app/shared/types/` に移行

### 2.4 shared/ui 移行（shadcn/ui → Mantine）
- shadcn/ui コンポーネントを Mantine UI コンポーネントに置き換える
- 対応表:
  - `Button` → `@mantine/core` の `Button`
  - `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle` → Mantine `Card`, `Card.Section`
  - `Badge` → Mantine `Badge`
  - `Input` → Mantine `TextInput`
  - `Label` → Mantine `TextInput` の label prop
  - `Textarea` → Mantine `Textarea`
  - `Separator` → Mantine `Divider`
  - `Sheet` → Mantine `Drawer`
  - `section-wrapper` → Mantine `Container` + カスタムコンポーネント
- `technology-badge.tsx` を Mantine Badge ベースで再実装

---

## Phase 3: entities レイヤー移行

### 3.1 entities/project 移行
- `src/entities/project/model/types.ts` → Orval 生成型で代替、または `client/app/entities/project/model/types.ts` に移行
- `src/entities/project/ui/project-card.tsx` → Mantine Card ベースで `client/app/entities/project/ui/project-card.tsx` に再実装
- `src/entities/project/api/` → Orval 生成 hooks で代替
- `src/entities/project/index.ts` → `client/app/entities/project/index.ts`

### 3.2 entities/skill 移行
- 型定義・API 取得関数を Orval 生成で代替
- `client/app/entities/skill/` に index.ts, model/, ui/ を構築

### 3.3 entities/experience 移行
- 型定義・API 取得関数を Orval 生成で代替
- `client/app/entities/experience/` に index.ts, model/ を構築

### 3.4 entities/profile 移行
- 型定義・API 取得関数を Orval 生成で代替
- `client/app/entities/profile/` に index.ts, model/ を構築

---

## Phase 4: features レイヤー移行

### 4.1 features/contact-form 移行
- React Hook Form + Zod → Mantine Form + Zod に書き換え
- Axios 経由で Hono API に POST
- `client/app/features/contact-form/` に ui/, model/ を構築

### 4.2 features/project-filter 移行
- SWR → TanStack Query に書き換え
- Mantine SegmentedControl / Chip でフィルタ UI を再実装
- `client/app/features/project-filter/` に ui/, model/ を構築

### 4.3 features/color-scheme-toggle 新規作成
- next-themes → Mantine `useMantineColorScheme` に置き換え
- `client/app/features/color-scheme-toggle/` に ui/ を構築

### 4.4 features/mobile-menu 移行
- shadcn/ui Sheet + AnimatePresence → Mantine Drawer に書き換え
- `client/app/features/mobile-menu/` に ui/ を構築

---

## Phase 5: widgets レイヤー移行

### 5.1 widgets/header 移行
- Next.js `Link` → React Router `Link` に変更
- shadcn/ui → Mantine コンポーネントに置き換え
- `client/app/widgets/header/` に ui/ を構築

### 5.2 widgets/footer 移行
- Next.js `Link` → React Router `Link` に変更
- `client/app/widgets/footer/` に ui/ を構築

### 5.3 widgets/hero-section 移行
- Next.js `Link`, `Button` → React Router `Link`, Mantine `Button` に変更
- Framer Motion のアニメーションはそのまま移行
- `client/app/widgets/hero-section/` に ui/ を構築

### 5.4 widgets/project-list-section 移行
- Mantine SimpleGrid でカードグリッドを再実装
- `client/app/widgets/project-list-section/` に ui/ を構築

### 5.5 widgets/skill-section 移行
- Mantine コンポーネントで再実装
- `client/app/widgets/skill-section/` に ui/ を構築

### 5.6 widgets/experience-section 移行
- Mantine コンポーネントで再実装
- `client/app/widgets/experience-section/` に ui/ を構築

### 5.7 widgets/contact-section 移行
- Mantine コンポーネントで再実装
- `client/app/widgets/contact-section/` に ui/ を構築

---

## Phase 6: pages レイヤー移行

### 6.1 pages/home 移行
- `src/views/home/` → `client/app/pages/home/`
- widgets を合成してページ構築
- loader で profile + projects + skills を取得

### 6.2 pages/about 移行
- `src/views/about/` → `client/app/pages/about/`
- loader で profile を取得

### 6.3 pages/projects 移行
- `src/views/projects/` → `client/app/pages/projects/`
- loader で projects + categories を取得
- TanStack Query でフィルタ再取得

### 6.4 pages/project-detail 移行
- `src/views/project-detail/` → `client/app/pages/project-detail/`
- loader で project 詳細を slug で取得

### 6.5 pages/skills 移行
- `src/views/skills/` → `client/app/pages/skills/`
- loader で skills を取得

### 6.6 pages/experience 移行
- `src/views/experience/` → `client/app/pages/experience/`
- loader で experiences を取得

### 6.7 pages/contact 移行
- `src/views/contact/` → `client/app/pages/contact/`
- Mantine Form で送信

---

## Phase 7: Next.js 完全撤廃

### 7.1 Next.js 関連ファイル削除
- `src/` ディレクトリ全体を削除
- 削除対象ファイル:
  - `next.config.ts`
  - `next-env.d.ts`
  - `postcss.config.mjs`
  - `eslint.config.mjs`
  - `components.json`
  - `.prettierrc.json`
  - `.prettierignore`
- 削除対象ディレクトリ:
  - `src/`
  - `.next/`
  - `public/`（Next.js 用。client/public/ は残す）

### 7.2 ルート package.json 整理
- Next.js 関連の dependencies を全削除:
  - `next`, `next-themes`, `react-hook-form`, `@hookform/resolvers`
  - `swr`, `shadcn`, `radix-ui`, `class-variance-authority`, `tailwind-merge`, `tw-animate-css`
  - `framer-motion`, `lucide-react`, `react-icons`（client 側に移行済み）
  - `react`, `react-dom`（client 側に存在）
  - `pg`
- Next.js 関連の devDependencies を全削除:
  - `eslint-config-next`, `babel-plugin-react-compiler`
  - `@tailwindcss/postcss`, `prettier`, `prettier-plugin-tailwindcss`
- scripts を更新:
  - `dev`, `build`, `start` → client 向けに変更、または削除
  - `dev:server` → server 向けに整理
  - lint/format は Biome（client 側）に統一

### 7.3 環境変数ファイル整理
- `.env.local` を削除（Next.js 用。`NEXT_PUBLIC_*` 参照あり）
- `.env.production` を確認し、不要なら削除
- `.env` のルートファイルは server 用として整理
- client 側の環境変数は `client/.env` に集約

### 7.4 ルートレベル設定ファイル整理
- `pnpm-workspace.yaml` を更新（client, server をワークスペースとして定義）
- `tsconfig.json`（ルート）が存在すれば削除（各パッケージに個別 tsconfig あり）
- `node_modules/` を再インストール（`pnpm install`）

### 7.5 動作確認
- `cd server && bun run dev` でサーバー起動確認
- `cd client && pnpm dev` でクライアント起動確認
- 全ページの表示確認（Home, About, Projects, Project Detail, Skills, Experience, Contact）
- API 通信確認（loader, TanStack Query, フォーム送信）
- カラースキーム切替確認
- レスポンシブ確認
