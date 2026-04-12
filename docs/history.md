# 完了済みタスク

## Prisma → Drizzle + Hono 移行（完了）

Prisma + Next.js Route Handlers 構成から、Drizzle ORM + Hono 構成への完全移行を実施した。

### 実施内容

- Drizzle ORM の導入（`server/` 配下）
  - `drizzle-orm`, `drizzle-kit`, `postgres` ドライバをインストール
  - `server/drizzle.config.ts` を作成
  - `server/src/db/index.ts` に Drizzle client インスタンスを作成
- Drizzle スキーマ定義
  - `server/src/db/schema/enums.ts` に pgEnum（SocialPlatform, ProjectLinkType, ExperienceType, Proficiency）を定義
  - `server/src/db/schema/` 配下に全テーブル定義を作成（profiles, projects, skills, experiences, contacts）
  - `server/src/db/schema/relations.ts` に全リレーションを定義
  - `server/src/db/schema/index.ts` で re-export
- シードスクリプトの Drizzle 版作成
  - `server/src/db/seed.ts` を作成（7プロジェクト、34技術、34スキル、6経歴を投入）
- Hono サーバー構築
  - `server/src/index.ts` に Hono アプリケーション基盤を構築（CORS, ルーティング, ヘルスチェック）
  - `server/src/lib/response.ts` に API レスポンスヘルパーを作成
  - サービス層を作成（profile, project, skill, experience, contact）
  - ルートハンドラを作成（全5エンドポイント + categories）
  - Contact API に Zod バリデーション（@hono/zod-validator）を適用
- フロントエンドの API 呼び出し変更
  - `src/shared/config/site.ts` に `API_BASE_URL` を追加
  - `src/entities/*/api/*.ts` を Prisma 直接呼び出しから Hono API fetch に変更
- Prisma 完全撤廃
  - `prisma/` ディレクトリ（schema.prisma, seed.ts, seed.sql, migrations/）を削除
  - `prisma.config.ts` を削除
  - `src/shared/lib/prisma.ts`（Prisma client シングルトン）を削除
  - `src/shared/lib/generated/`（Prisma 自動生成コード）を削除
  - Prisma 関連パッケージをアンインストール（prisma, @prisma/client, @prisma/adapter-neon, @prisma/adapter-pg）
  - package.json から Prisma 関連スクリプトを削除
- Next.js Route Handlers の削除
  - `src/app/api/` ディレクトリを完全削除（projects, skills, experiences, contact の各 route.ts）
- 環境変数・設定整理
  - Hono サーバー用環境変数を追加（PORT, CORS_ORIGIN）
  - `NEXT_PUBLIC_API_URL` を追加
  - Drizzle 用スクリプトを package.json に追加（db:generate, db:push, db:studio, db:seed, dev:server）

## FSD レイヤー構築（完了）

Feature-Sliced Design に基づくフロントエンドアーキテクチャを構築した。

### 実施内容

- views レイヤー（FSD の pages レイヤーに相当）
  - `src/views/` 配下に全7画面を作成（home, about, projects, project-detail, skills, experience, contact）
  - 各 view は widgets / features を合成してページを構築
  - `src/app/` の page.tsx は views を呼び出すだけの薄いエントリポイント
- widgets レイヤー
  - hero-section, project-list-section, skill-section, experience-section, contact-section, header, footer を作成
- features レイヤー
  - project-filter（カテゴリ・技術フィルタ、SWR 再取得）
  - contact-form（React Hook Form + Zod バリデーション）
  - theme-toggle（next-themes による light / dark / system 切替）
  - mobile-menu（ハンバーガーメニュー、AnimatePresence）
  - intro-countdown（初回訪問時カウントダウン演出）
- entities レイヤー
  - project（型定義, ProjectCard UI, API 取得関数）
  - skill（型定義, API 取得関数）
  - experience（型定義, API 取得関数）
  - profile（型定義, API 取得関数）
- shared レイヤー
  - `shared/ui/`: shadcn/ui コンポーネント（button, card, badge, input, label, textarea, separator, sheet, section-wrapper, technology-badge）
  - `shared/api/`: SWR 用 fetcher
  - `shared/config/`: サイト設定（SITE_NAME, API_BASE_URL, NAV_LINKS）、technology-icons マッピング
  - `shared/lib/`: ユーティリティ、Framer Motion プリセット
  - `shared/types/`: 共通型定義

## 全ページ UI 実装（完了）

全7ページの UI を実装した。

### 実施内容

- Home: Hero セクション + 代表プロジェクト3件 + 技術スタック概要 + 導線リンク
- About: プロフィール表示 + SNS リンク
- Projects: カード一覧 + カテゴリ・技術フィルタ
- Project Detail: 全情報表示（背景, 技術, 設計, 工夫, 課題, 改善予定, 外部リンク）
- Skills: カテゴリ別技術一覧 + 習熟度表示
- Experience: 時系列経歴表示
- Contact: フォーム（React Hook Form + Zod）
- 共通: Header（ナビゲーション + テーマ切替 + モバイルメニュー）、Footer
- レスポンシブ対応、ダークモード対応、ローディング / エラー状態
