# 技術方針

## 採用技術一覧と責務

### フロントエンド（`client/`）

| 技術 | 責務 | 選定理由 |
|---|---|---|
| React Router v7 | フレームワーク、ルーティング、SSR、データローディング | ファイルベースルーティングと loader/action による宣言的データフロー。Vite ベースで高速 |
| React | UI ライブラリ | コンポーネントベースの UI 構築。React 19 対応 |
| TypeScript | 型安全な開発言語 | 型による自己文書化と IDE 補完でコード品質と開発速度を両立する |
| Mantine UI | UI コンポーネントライブラリ | 豊富なコンポーネント群とテーマシステム。CSS-in-JS 不要で PostCSS ベース |
| Mantine Form | フォーム状態管理 | Mantine UI との統合が自然。Zod バリデーションとの連携が容易 |
| Lucide React | アイコンライブラリ | Tree-shakable で軽量。一貫したアイコンセット |
| Framer Motion | アニメーション | 宣言的 API で React との統合が自然。layout animation や AnimatePresence など高度な制御が可能 |
| TanStack Query | クライアントサイドデータフェッチ | キャッシュ・再検証・エラーリトライを宣言的に扱える。React Router との併用が容易 |
| Axios | HTTP クライアント | インターセプター、リクエスト/レスポンス変換、エラーハンドリングが充実 |
| Zod | バリデーション | ランタイム型検証。クライアント・サーバー双方で同一スキーマを共有できる |
| Orval | API クライアント自動生成 | OpenAPI スキーマから型安全な API クライアントを自動生成 |

### バックエンド（`server/`）

| 技術 | 責務 | 選定理由 |
|---|---|---|
| Hono | HTTP フレームワーク | 軽量・高速。OpenAPI 統合、Zod バリデーションミドルウェアが充実 |
| @hono/zod-openapi | OpenAPI スキーマ生成 | ルート定義から OpenAPI ドキュメントを自動生成 |
| Bun | JavaScript ランタイム | 高速な起動・実行。TypeScript をネイティブサポート |
| Drizzle ORM | ORM / スキーマ定義 / マイグレーション | 型安全なクエリ生成。SQL に近い API で学習コストが低い |
| PostgreSQL (Neon) | リレーショナルデータベース | 正規化されたスキーマ設計に適する。Neon でサーバーレス運用 |
| Zod | バリデーション | ランタイム型検証。Hono ミドルウェアとの統合が自然 |

### 開発基盤

| 技術 | 責務 | 選定理由 |
|---|---|---|
| pnpm | ワークスペース管理 | モノレポ構成（root, client, server）の依存管理 |
| Bun | サーバー側パッケージ管理・ランタイム | server/ 配下の実行と依存管理 |
| Vite | フロントエンドビルドツール | React Router v7 の開発サーバー・ビルドに使用 |
| Biome | リンター・フォーマッター | ESLint + Prettier の代替。高速で設定が簡潔 |
| Docker Compose | ローカル DB 環境 | PostgreSQL をローカルで再現可能に起動する |
| drizzle-kit | DB マイグレーション・スタジオ | スキーマ変更の生成・適用・GUI 管理 |
| PostCSS | CSS 処理 | Mantine UI の PostCSS プリセット適用 |

## 描画戦略

- React Router v7 の SSR モードで構築する
- loader 関数でサーバーサイドデータ取得を行い、コンポーネントに渡す
- 全ページは SSR を基本とする。初期表示に必要なデータは loader で Hono API から取得する
- クライアントサイドのインタラクティブな再取得には TanStack Query を使う
  - プロジェクトフィルタ（カテゴリ・技術での絞り込み）
  - フォーム送信後の状態更新
- Mantine UI のテーマシステムでカラースキーム（light / dark）を管理する

## API 方針

- バックエンドは Hono で独立したサーバーとして構築する（`server/` 配下）
- OpenAPI スキーマを Hono ルート定義から自動生成する
- Orval で OpenAPI スキーマから型安全な API クライアントを client 側に自動生成する
- 最小限のエンドポイントで構成する
- エンドポイント：
  - `GET /api/profile` — プロフィール取得
  - `GET /api/projects` — プロジェクト一覧取得（フィルタパラメータ対応）
  - `GET /api/projects/categories` — カテゴリ一覧取得
  - `GET /api/projects/:slug` — プロジェクト詳細取得
  - `GET /api/skills` — スキル一覧取得
  - `GET /api/experiences` — 経歴一覧取得
  - `POST /api/contact` — 問い合わせ送信
- レスポンス形式は JSON 統一
  - 成功: `{ data: T }`
  - エラー: `{ error: { message: string, code: string } }`

## バリデーション方針

- フォーム入力は Zod でスキーマ定義する
- Hono 側でも @hono/zod-validator でリクエストバリデーションを行う
- クライアントとサーバーの両方で入力検証を行う
- エラーメッセージはユーザー向けに簡潔にする。内部エラーの詳細はクライアントに露出しない

## フォーム方針

- Mantine Form + Zod バリデーションを採用する
- Contact form は Hono API（`POST /api/contact`）経由で送信する
- 初期段階では DB 保存を中心に設計する（contacts テーブルへの INSERT）
- 将来的なメール送信拡張を想定できる設計にする
- フォーム送信中のローディング状態、成功・エラーのフィードバックを必ず実装する

## アニメーション方針

- Framer Motion を採用する
- 利用箇所を明確に限定する：
  - Hero セクションの初回表示（fade-in + slide-up）
  - セクションのスクロール出現（intersection observer + fade-in）
  - Project card の hover（scale + shadow）
  - フィルタ切り替え時のリスト更新（layout animation）
  - Drawer / Mobile menu の開閉（AnimatePresence）
- 上記以外の箇所では原則アニメーションを使わない
- 過剰な演出は避け、上品で軽い動きに統一する
- `prefers-reduced-motion` への配慮を前提にする
- アニメーション用のユーティリティ（variants、transition presets）は shared レイヤーに集約する

## テーマ方針

- Mantine UI のカラースキーム機能で light / dark を管理する
- Mantine Theme の CSS 変数ベースで色を管理する
- DESIGN.md に定義されたカラーパレットに従う
- 白ベースの背景にブルー・ライムグリーンのアクセントカラー
- 情報の読みやすさを最優先にする。コントラスト比は WCAG AA 基準を目安にする

## デプロイ方針

- フロントエンドは Cloudflare Pages にデプロイする
- バックエンドは Cloudflare Workers にデプロイする
- データベースは Neon Serverless PostgreSQL を使用する

### フロントエンド（Cloudflare Pages）

- `client/` を `pnpm build` でビルドし、`build/client` を Cloudflare Pages にデプロイする
- GitHub Actions で `main` ブランチへの push 時に自動デプロイする
- ビルド時に `VITE_API_URL` 環境変数で API のベース URL を注入する
- wrangler CLI を使用してデプロイする（`pnpm wrangler pages deploy build/client`）

### バックエンド（Cloudflare Workers）

- `server/` を Cloudflare Workers にデプロイする
- `server/wrangler.jsonc` で Workers の設定を管理する
- `nodejs_compat` フラグを有効にして Node.js 互換 API を使用する
- Workers の Secrets に `DATABASE_URL` を設定して Neon に接続する
- ローカル開発は Bun で実行し、本番は Workers ランタイムで動作する

### 環境変数の管理

| 変数 | 設定先 | 用途 |
|---|---|---|
| `VITE_API_URL` | GitHub Actions Variables / `.env.production` | フロントエンドの API 接続先 |
| `CLOUDFLARE_API_TOKEN` | GitHub Actions Secrets | wrangler CLI の認証 |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions Secrets | Cloudflare アカウント識別 |
| `DATABASE_URL` | Workers Secrets / `.env.local` | Neon PostgreSQL 接続文字列 |
| `CORS_ORIGIN` | Workers Secrets（将来） | CORS 許可オリジン |

## DB とスキーマ設計方針

- PostgreSQL（Neon Serverless）を採用する
- ローカル開発用に `docker-compose.yml` で PostgreSQL コンテナを起動する
- ORM は Drizzle ORM を採用する。`server/src/db/schema/` 配下でスキーマを定義する
- 正規化を意識する。一時的な実装都合で denormalized な構造に逃げない
- データの責務と関係を明確に切り分ける
- 将来的な機能追加に耐えられるよう、カテゴリ・リンク・関連情報の分離を意識する

### モデル一覧

| モデル | 責務 |
|---|---|
| profiles | サイトオーナーの基本情報（名前、肩書き、自己紹介、アバター等） |
| social_links | SNS / GitHub 等の外部リンク。profiles に紐づく |
| projects | 制作物の基本情報（タイトル、slug、概要、背景、工夫、課題、改善予定等） |
| project_links | プロジェクトに紐づく外部リンク（GitHub、Demo、ドキュメント等） |
| project_categories | プロジェクトの分類カテゴリ |
| technologies | 技術の定義（名前、アイコン、公式URL等） |
| project_technologies | projects と technologies の中間テーブル |
| skill_categories | スキルの分類カテゴリ（言語、フレームワーク、インフラ等） |
| skills | 個別スキル。skill_categories に属し、technologies と関連付け可能 |
| experiences | 職歴・学歴・活動歴（期間、役割、組織名、概要） |
| contacts | 問い合わせ内容の保存（名前、メール、件名、本文、送信日時） |

### スキーマ設計の補足方針

- 表示順を制御する `sortOrder` カラムを必要なテーブルに持たせる
- 公開状態を制御する `isPublished` カラムを projects 等に持たせる
- `createdAt` / `updatedAt` は全テーブルに付与する
- projects と technologies は中間テーブル `project_technologies` で多対多を表現する
- slug はプロジェクトの URL パスに使用する。ユニーク制約を付与する
- Enum 型は Drizzle の pgEnum で定義する（SocialPlatform, ProjectLinkType, ExperienceType, Proficiency）
