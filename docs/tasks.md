# タスク一覧：Prisma → Drizzle + Hono 移行

現在の Prisma + Next.js Route Handlers 構成から、Drizzle + Hono 構成へ完全移行するためのタスクリスト。

## ステータス凡例

- `[ ]` 未着手
- `[-]` 作業中
- `[x]` 完了

---

## Phase 1: 現状把握

- [ ] 1.1 Prisma に依存しているファイルの洗い出し
  - `src/shared/lib/prisma.ts`（Prisma client シングルトン）
  - `src/shared/lib/generated/`（Prisma 自動生成コード一式）
  - `src/entities/*/api/*.ts`（各エンティティのデータ取得関数）
  - `src/app/api/contact/route.ts`（prisma.contact.create 直接呼び出し）
  - `prisma/schema.prisma`, `prisma/seed.ts`, `prisma/seed.sql`, `prisma.config.ts`
  - `prisma/migrations/` ディレクトリ
- [ ] 1.2 Next.js Route Handlers の洗い出し
  - `src/app/api/projects/route.ts` — GET /api/projects
  - `src/app/api/projects/[slug]/route.ts` — GET /api/projects/:slug
  - `src/app/api/skills/route.ts` — GET /api/skills
  - `src/app/api/experiences/route.ts` — GET /api/experiences
  - `src/app/api/contact/route.ts` — POST /api/contact
- [ ] 1.3 フロントエンドから API を呼び出している箇所の洗い出し
  - `src/shared/api/fetcher.ts`（SWR 用 fetcher）
  - `src/features/project-filter/` 内の SWR 呼び出し
  - `src/features/contact-form/` 内の fetch 呼び出し
  - Server Components から直接 entities の取得関数を呼んでいる箇所（views 層、widgets 層）
- [ ] 1.4 環境変数の確認
  - `.env`: `DATABASE_URL`, `DIRECT_URL`（現在 Neon PostgreSQL を使用）
  - `.env.local`, `.env.production` の内容確認
  - Hono サーバー側で必要な環境変数の整理

---

## Phase 2: Drizzle 導入

- [ ] 2.1 Drizzle 関連パッケージのインストール（`server/` 配下）
  - `drizzle-orm` をインストール
  - `drizzle-kit` を devDependencies にインストール
  - PostgreSQL ドライバ（`postgres` または `@neondatabase/serverless`）をインストール
- [ ] 2.2 Drizzle 設定ファイルの作成
  - `server/drizzle.config.ts` を作成（スキーマパス、マイグレーション出力先、DB 接続情報を定義）
- [ ] 2.3 DB 接続モジュールの作成
  - `server/src/db/index.ts` に Drizzle client インスタンスを作成
  - 環境変数 `DATABASE_URL` から接続文字列を取得
  - 開発環境でのシングルトンパターンを適用

---

## Phase 3: スキーマ・マイグレーション再設計

- [ ] 3.1 Drizzle スキーマ定義（Enum）
  - `server/src/db/schema/enums.ts` に pgEnum を定義
  - `socialPlatform`: github, twitter, linkedin, website, other
  - `projectLinkType`: github, demo, docs, other
  - `experienceType`: work, education, activity
  - `proficiency`: beginner, intermediate, advanced, expert
- [ ] 3.2 Drizzle スキーマ定義（テーブル）
  - `server/src/db/schema/` 配下にテーブル定義ファイルを作成
  - `profiles.ts`: profiles, social_links テーブル
  - `projects.ts`: project_categories, projects, project_links, technologies, project_technologies テーブル
  - `skills.ts`: skill_categories, skills テーブル
  - `experiences.ts`: experiences テーブル
  - `contacts.ts`: contacts テーブル
  - 現行 Prisma スキーマのカラム定義・リレーション・制約・デフォルト値を正確に移植する
  - `server/src/db/schema/index.ts` で全テーブルを re-export
- [ ] 3.3 Drizzle リレーション定義
  - `server/src/db/schema/relations.ts` に Drizzle の `relations()` を定義
  - Profile ↔ SocialLink（1:N）
  - ProjectCategory ↔ Project（1:N）
  - Project ↔ ProjectLink（1:N、cascade delete）
  - Project ↔ ProjectTechnology ↔ Technology（M:N）
  - SkillCategory ↔ Skill（1:N）
  - Skill ↔ Technology（N:1、optional）
- [ ] 3.4 既存 DB に対するマイグレーション整合
  - 仮定：既存の Neon PostgreSQL 上のテーブルは Prisma マイグレーションで作成済み
  - Drizzle スキーマが既存テーブルと一致することを `drizzle-kit push` または `drizzle-kit introspect` で検証
  - 差分がある場合のみマイグレーション SQL を生成・適用
- [ ] 3.5 シードスクリプトの Drizzle 版作成
  - `server/src/db/seed.ts` を作成
  - 現行 `prisma/seed.ts` のデータ内容を Drizzle の insert 構文に書き換える
  - 削除順序（外部キー制約を考慮）を維持する
  - `server/package.json` に seed スクリプトを追加

---

## Phase 4: Hono サーバー構築（`server/`）

- [ ] 4.1 Hono 追加パッケージのインストール
  - `@hono/zod-validator`（バリデーションミドルウェア）をインストール
  - `zod` をインストール
  - CORS ミドルウェア（Hono 組み込みの `hono/cors` を使用）
- [ ] 4.2 Hono アプリケーション基盤の整備
  - `server/src/index.ts` を更新：CORS ミドルウェア、エラーハンドリング、ルーティングマウントを設定
  - `server/src/lib/response.ts` に API レスポンスヘルパーを作成（`{ data }` / `{ error: { message, code } }` 形式）
- [ ] 4.3 データアクセス層（サービス）の作成
  - `server/src/services/profile.service.ts` — getProfile()
  - `server/src/services/project.service.ts` — getProjects(filter?), getProjectBySlug(slug)
  - `server/src/services/skill.service.ts` — getSkills()
  - `server/src/services/experience.service.ts` — getExperiences()
  - `server/src/services/contact.service.ts` — createContact(data)
  - 各サービスは Drizzle クエリを使用し、現行 entities の取得ロジックと同等の結果を返す

---

## Phase 5: API ルーティング移行

- [ ] 5.1 プロフィール API の実装
  - `server/src/routes/profile.ts` に `GET /api/profile` を実装
  - Profile + SocialLinks を結合して返す
- [ ] 5.2 プロジェクト API の実装
  - `server/src/routes/projects.ts` に以下を実装
  - `GET /api/projects` — フィルタ対応（category, technology クエリパラメータ）
  - `GET /api/projects/:slug` — 詳細取得（404 対応）
  - `GET /api/projects/categories` — カテゴリ一覧取得
- [ ] 5.3 スキル API の実装
  - `server/src/routes/skills.ts` に `GET /api/skills` を実装
  - SkillCategory ごとにグループ化して返す
- [ ] 5.4 経歴 API の実装
  - `server/src/routes/experiences.ts` に `GET /api/experiences` を実装
  - sortOrder 順で返す
- [ ] 5.5 問い合わせ API の実装
  - `server/src/routes/contact.ts` に `POST /api/contact` を実装
  - Zod バリデーション（@hono/zod-validator）を適用
  - contacts テーブルへの INSERT
  - 成功 / エラーの構造化レスポンス
- [ ] 5.6 ルーティング統合・動作確認
  - `server/src/index.ts` で全ルートファイルを `.route()` でマウント
  - 各エンドポイントに curl でリクエストして正常レスポンスを確認

---

## Phase 6: フロントエンドの API 呼び出し変更

- [ ] 6.1 API ベース URL の設定
  - `src/shared/config/site.ts` に `API_BASE_URL` を追加（例：`http://localhost:3001`）
  - 環境変数 `NEXT_PUBLIC_API_URL` で切り替え可能にする
- [ ] 6.2 SWR fetcher の更新
  - `src/shared/api/fetcher.ts` を更新し、Hono API のベース URL を使用するように変更
- [ ] 6.3 Server Components のデータ取得を Hono API 経由に変更
  - `src/entities/project/api/get-projects.ts` — Prisma 直接呼び出しを fetch に置き換え
  - `src/entities/skill/api/get-skills.ts` — 同上
  - `src/entities/experience/api/get-experiences.ts` — 同上
  - `src/entities/profile/api/get-profile.ts` — 同上
- [ ] 6.4 Contact フォームの送信先変更
  - `src/features/contact-form/` 内の fetch URL を Hono API（`POST /api/contact`）に変更
- [ ] 6.5 プロジェクトフィルタの API 呼び出し変更
  - `src/features/project-filter/` 内の SWR 呼び出し URL を Hono API に変更

---

## Phase 7: Prisma 完全撤廃

- [ ] 7.1 Prisma 依存コードの削除
  - `src/shared/lib/prisma.ts` を削除
  - `src/shared/lib/generated/` ディレクトリを削除
  - 各 entities の型定義が Prisma 生成型を参照している箇所を Drizzle スキーマ推論型に置き換える
- [ ] 7.2 Prisma 設定ファイルの削除
  - `prisma/schema.prisma` を削除
  - `prisma/seed.ts` を削除
  - `prisma/seed.sql` を削除
  - `prisma.config.ts` を削除
  - `prisma/migrations/` ディレクトリを削除
  - `prisma/` ディレクトリ自体を削除
- [ ] 7.3 Prisma パッケージのアンインストール
  - `pnpm remove prisma @prisma/client @prisma/adapter-neon @prisma/adapter-pg`
- [ ] 7.4 package.json のクリーンアップ
  - `scripts` から Prisma 関連スクリプト（`db:generate`, `db:migrate`, `db:migrate:*`, `db:push`, `db:seed`, `db:studio`, `db:setup`, `db:status`, `postinstall`）を削除
  - `prisma.seed` 設定を削除
  - Drizzle 用スクリプトを追加（`"db:generate": "drizzle-kit generate"`, `"db:push": "drizzle-kit push"`, `"db:seed": "bun run server/src/db/seed.ts"` 等）
- [ ] 7.5 Next.js Route Handlers の削除
  - `src/app/api/projects/route.ts` を削除
  - `src/app/api/projects/[slug]/route.ts` を削除
  - `src/app/api/skills/route.ts` を削除
  - `src/app/api/experiences/route.ts` を削除
  - `src/app/api/contact/route.ts` を削除
  - `src/app/api/` ディレクトリを削除

---

## Phase 8: 環境変数・設定整理

- [ ] 8.1 環境変数の整理
  - `.env` に Hono サーバー用の変数を追加（`PORT=3001` 等）
  - `NEXT_PUBLIC_API_URL` を `.env.local` に追加
  - `.env.production` を更新（本番 API URL）
  - `.env.example` を作成または更新（全環境変数のテンプレート）
- [ ] 8.2 TypeScript 設定の確認
  - `server/tsconfig.json` が Drizzle / Hono の型解決に対応しているか確認
  - パスエイリアスが必要であれば設定
- [ ] 8.3 ESLint / Prettier 設定の確認
  - `server/` 配下のコードが lint / format 対象に含まれているか確認
  - 必要に応じて設定を調整

---

## Phase 9: 開発環境（起動方法）整理

- [ ] 9.1 開発時の起動手順を整理
  - フロントエンド：`pnpm dev`（Next.js、ポート 3000）
  - バックエンド：`bun run --hot server/src/index.ts`（Hono、ポート 3001）
  - DB：`docker compose up -d`（PostgreSQL、ポート 5432）
- [ ] 9.2 ルートの package.json にワークスペース横断スクリプトを追加
  - `"dev:server": "bun run --hot server/src/index.ts"` を追加
  - `"dev:all"` で Next.js と Hono を同時起動する方法を検討（concurrently 等）
- [ ] 9.3 README.md の更新
  - 新しいアーキテクチャ構成の説明
  - セットアップ手順（pnpm install, docker compose up, DB マイグレーション, シード投入, 起動）
  - 開発時の起動コマンド一覧

---

## Phase 10: 不要ファイル削除

- [ ] 10.1 Prisma 関連の残存ファイル確認・削除
  - `prisma/` ディレクトリが完全に削除されていることを確認
  - `src/shared/lib/generated/` が完全に削除されていることを確認
  - `prisma.config.ts` が削除されていることを確認
- [ ] 10.2 Next.js Route Handlers の残存確認
  - `src/app/api/` ディレクトリが完全に削除されていることを確認
- [ ] 10.3 未使用の import / 型参照の除去
  - 全ソースファイルで Prisma 関連の import が残っていないことを確認（`grep -r "prisma" src/`）
  - `@prisma/client`, `@prisma/adapter-neon`, `@prisma/adapter-pg` への参照がないことを確認
- [ ] 10.4 .gitignore の更新
  - Prisma 関連のエントリを削除（不要であれば）
  - Drizzle 関連のエントリを追加（必要に応じて）

---

## Phase 11: 動作確認・検証

- [ ] 11.1 Hono API の単体動作確認
  - `GET /api/profile` — Profile + SocialLinks が返ること
  - `GET /api/projects` — プロジェクト一覧（フィルタなし）
  - `GET /api/projects?category=saas` — カテゴリフィルタ
  - `GET /api/projects/portfolio-site` — 詳細取得
  - `GET /api/projects/nonexistent` — 404 レスポンス
  - `GET /api/skills` — スキル一覧（カテゴリ別）
  - `GET /api/experiences` — 経歴一覧（sortOrder 順）
  - `POST /api/contact` — 正常送信 / バリデーションエラー
- [ ] 11.2 フロントエンド結合確認
  - Home ページ：代表プロジェクト・技術スタックが表示されること
  - About ページ：プロフィール・SNS リンクが表示されること
  - Projects 一覧：カード一覧が表示され、フィルタが動作すること
  - Project Detail：各項目が正しく表示されること
  - Skills ページ：カテゴリ別にスキルが表示されること
  - Experience ページ：時系列で経歴が表示されること
  - Contact ページ：フォーム送信が成功し、DB に保存されること
- [ ] 11.3 ビルド・静的解析の確認
  - `pnpm build` が成功すること
  - `pnpm lint` がエラーなしで通ること
  - `pnpm typecheck` がエラーなしで通ること
- [ ] 11.4 Prisma 残存チェック
  - `grep -r "prisma" src/` で Prisma への参照が残っていないことを確認
  - `grep -r "@prisma" package.json` で依存が残っていないことを確認
