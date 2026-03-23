# タスク一覧

features.md の機能を実装順に分解したタスクリスト。
依存関係を考慮し、基盤 → データ層 → エンティティ → 共通 UI → ページ → インタラクション → 仕上げの順で構成する。

## ステータス凡例

- `[ ]` 未着手
- `[-]` 作業中
- `[x]` 完了

---

## Phase 1: 開発基盤セットアップ

- [ ] 1.1 FSD ディレクトリ構造の作成
  - `src/pages/`, `src/widgets/`, `src/features/`, `src/entities/`, `src/shared/` の各レイヤーディレクトリと主要サブディレクトリを作成
  - `shared/ui/`, `shared/lib/`, `shared/config/`, `shared/api/`, `shared/types/` を作成
- [ ] 1.2 追加パッケージのインストール
  - next-themes, framer-motion, swr, prisma, @prisma/client, zod, react-hook-form, @hookform/resolvers をインストール
  - prettier をインストール・設定
- [ ] 1.3 Docker Compose で PostgreSQL 環境構築
  - `docker-compose.yml` を作成（PostgreSQL コンテナ定義）
  - `.env` に DATABASE_URL を定義
  - `.env.example` を作成
- [ ] 1.4 Prisma 初期セットアップ
  - `prisma/schema.prisma` の初期化（datasource, generator 設定）
  - `src/shared/lib/prisma.ts` に Prisma client シングルトンを配置
- [ ] 1.5 shared レイヤー基盤ファイルの作成
  - `shared/config/site.ts` — サイト設定定数（SITE_NAME 等）
  - `shared/api/fetcher.ts` — SWR 用汎用 fetcher
  - `shared/lib/motion.ts` — Framer Motion 共通 variants / transition presets
  - `shared/types/api.ts` — API レスポンス共通型（成功/エラー）
- [ ] 1.6 app レイヤー基盤整備
  - `src/app/providers.tsx` — ThemeProvider 等のプロバイダ統合
  - `src/app/layout.tsx` の更新（providers ラップ、フォント設定、metadata）
  - `src/app/globals.css` のテーマ用 CSS 変数整備

---

## Phase 2: DB スキーマ・シードデータ

- [ ] 2.1 Prisma スキーマ定義（Enum）
  - SocialPlatform, ProjectLinkType, ExperienceType, Proficiency の Enum を定義
- [ ] 2.2 Prisma スキーマ定義（モデル）
  - Profile, SocialLink, ProjectCategory, Project, ProjectLink, Technology, ProjectTechnology, SkillCategory, Skill, Experience, Contact の全モデルを定義
  - リレーション、ユニーク制約、デフォルト値、インデックスを設定
- [ ] 2.3 マイグレーション実行
  - `prisma migrate dev` で初回マイグレーションを実行
  - 生成された SQL を確認
- [ ] 2.4 シードデータ作成
  - `prisma/seed.ts` を作成
  - Profile, SocialLink, ProjectCategory, Project, ProjectLink, Technology, ProjectTechnology, SkillCategory, Skill, Experience のサンプルデータを投入
  - `package.json` に prisma seed スクリプトを追加
  - `prisma db seed` で動作確認

---

## Phase 3: エンティティ層

- [ ] 3.1 entities/profile
  - `model/` — Profile, SocialLink の型定義
  - `api/` — getProfile() データ取得関数
  - `index.ts` — public API
- [ ] 3.2 entities/project
  - `model/` — Project, ProjectLink, ProjectCategory, Technology の型定義、mapper
  - `api/` — getProjects(filter?), getProjectBySlug(slug) データ取得関数
  - `ui/` — ProjectCard コンポーネント（カード表示、ホバーアニメーション）
  - `index.ts` — public API
- [ ] 3.3 entities/skill
  - `model/` — Skill, SkillCategory の型定義
  - `api/` — getSkills() データ取得関数
  - `index.ts` — public API
- [ ] 3.4 entities/experience
  - `model/` — Experience の型定義
  - `api/` — getExperiences() データ取得関数
  - `index.ts` — public API

---

## Phase 4: Route Handlers（API）

- [ ] 4.1 GET /api/projects
  - `src/app/api/projects/route.ts`
  - クエリパラメータ（category, technology）によるフィルタ対応
  - entities/project の取得関数を再利用
- [ ] 4.2 GET /api/projects/[slug]
  - `src/app/api/projects/[slug]/route.ts`
  - 該当なし時の 404 レスポンス
- [ ] 4.3 GET /api/skills
  - `src/app/api/skills/route.ts`
  - SkillCategory ごとにグループ化して返す
- [ ] 4.4 GET /api/experiences
  - `src/app/api/experiences/route.ts`
  - sortOrder 順で返す
- [ ] 4.5 POST /api/contact
  - `src/app/api/contact/route.ts`
  - Zod バリデーション（contactFormSchema）
  - Contact テーブルへの INSERT
  - 成功/エラーの構造化レスポンス

---

## Phase 5: 共通 UI・レイアウト

- [ ] 5.1 shadcn/ui 基本コンポーネント導入
  - Button, Card, Input, Textarea, Label, Badge, Separator, Dialog, Drawer, Sheet 等の必要コンポーネントを `shared/ui/` に追加
- [ ] 5.2 widgets/header
  - ナビゲーションバー（デスクトップ）
  - サイトロゴ / サイト名
  - ページリンク（Home, About, Projects, Skills, Experience, Contact）
  - テーマ切替ボタンの配置枠
  - レスポンシブ対応（モバイル時はハンバーガーアイコン表示）
- [ ] 5.3 widgets/footer
  - コピーライト、SNS リンク、サイトマップ的な導線
- [ ] 5.4 features/theme-toggle
  - next-themes を使った light / dark / system 切替
  - ドロップダウンまたはアイコンボタン
  - Header に組み込み
- [ ] 5.5 features/mobile-menu
  - ハンバーガーメニューの開閉（Sheet / Drawer）
  - AnimatePresence によるアニメーション
  - Header に組み込み
- [ ] 5.6 レイアウト統合
  - `src/app/layout.tsx` に Header / Footer を配置
  - メインコンテンツ領域のレスポンシブレイアウト

---

## Phase 6: ページ実装

- [ ] 6.1 Home ページ
  - `src/pages/home/` — HomePage コンポーネント
  - `src/widgets/hero-section/` — Hero セクション（名前、肩書き、一言紹介、fade-in + slide-up アニメーション）
  - 代表プロジェクト表示（2〜3件、ProjectCard 使用）
  - 技術スタック概要セクション
  - 各セクションへの導線
  - `src/app/page.tsx` からの呼び出し
- [ ] 6.2 About ページ
  - `src/pages/about/` — AboutPage コンポーネント
  - Profile データのサーバー側取得・表示
  - 自己紹介、価値観、関心領域
  - SocialLink の表示
  - `src/app/about/page.tsx` からの呼び出し
- [ ] 6.3 Projects 一覧ページ
  - `src/pages/projects/` — ProjectsPage コンポーネント
  - `src/widgets/project-list-section/` — プロジェクト一覧セクション
  - プロジェクトカード一覧（サーバー側初期取得）
  - スクロール出現アニメーション
  - `src/app/projects/page.tsx` からの呼び出し
- [ ] 6.4 Project Detail ページ
  - `src/pages/project-detail/` — ProjectDetailPage コンポーネント
  - slug によるプロジェクト取得（サーバー側）
  - タイトル、概要、背景、技術スタック、設計要点、工夫、課題、改善予定、外部リンクの全項目表示
  - `src/app/projects/[slug]/page.tsx` からの呼び出し
  - 該当なし時の notFound() 処理
- [ ] 6.5 Skills ページ
  - `src/pages/skills/` — SkillsPage コンポーネント
  - `src/widgets/skill-section/` — スキルセクション
  - カテゴリ別技術一覧（サーバー側取得）
  - 習熟度の視覚的表示
  - `src/app/skills/page.tsx` からの呼び出し
- [ ] 6.6 Experience ページ
  - `src/pages/experience/` — ExperiencePage コンポーネント
  - `src/widgets/experience-section/` — 経歴セクション
  - 時系列表示（タイムライン形式）
  - 期間、役割、組織名、概要の表示
  - `src/app/experience/page.tsx` からの呼び出し
- [ ] 6.7 Contact ページ
  - `src/pages/contact/` — ContactPage コンポーネント
  - `src/widgets/contact-section/` — コンタクトセクション
  - `src/app/contact/page.tsx` からの呼び出し

---

## Phase 7: インタラクション機能

- [ ] 7.1 features/contact-form
  - React Hook Form + Zod Resolver によるフォーム実装
  - contactFormSchema（名前、メール、件名、本文）の Zod 定義
  - Route Handler（POST /api/contact）への送信
  - ローディング状態、成功・エラーフィードバック
  - Contact ページの widgets/contact-section に組み込み
- [ ] 7.2 features/project-filter
  - カテゴリフィルタ、技術フィルタの UI
  - SWR による再取得（GET /api/projects にクエリパラメータ付与）
  - フィルタ切り替え時の layout animation
  - Projects 一覧ページの widgets/project-list-section に組み込み

---

## Phase 8: 状態表示・仕上げ

- [ ] 8.1 ローディング状態
  - 各ルートセグメントに `loading.tsx` を作成
  - スケルトン UI またはスピナー表示
- [ ] 8.2 エラー状態
  - 各ルートセグメントに `error.tsx` を作成
  - ユーザー向けエラーメッセージとリトライ導線
- [ ] 8.3 空状態
  - データが存在しない場合の表示コンポーネント
  - Projects, Skills, Experience の各一覧で使用
- [ ] 8.4 スクロールアニメーション統合
  - 各セクションに whileInView fade-in を適用
  - `prefers-reduced-motion` 対応（reduced motion 時はアニメーション無効化）
- [ ] 8.5 レスポンシブ最終調整
  - 全ページのモバイル / タブレット / デスクトップ表示確認
  - ブレークポイントごとのレイアウト調整
- [ ] 8.6 ダークモード最終調整
  - 全ページ・全コンポーネントの light / dark 表示確認
  - コントラスト比の確認
  - テーマ切替時の flash がないことを確認
