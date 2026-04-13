# 技術スタック一覧

## フロントエンド（`client/`）

| 技術 | バージョン | 責務 | 選定理由 |
|---|---|---|---|
| React Router v7 | 7.x | フレームワーク、ルーティング、SSR、loader/action | Vite ベースで高速。ファイルベースルーティングと宣言的データフロー |
| React | 19.x | UI ライブラリ | コンポーネントベースの UI 構築 |
| TypeScript | 6.x | 型安全な開発言語 | 型による自己文書化と IDE 補完でコード品質と開発速度を両立 |
| Mantine UI | 9.x | UI コンポーネントライブラリ | 豊富なコンポーネント群、テーマシステム、PostCSS ベース |
| Mantine Form | 9.x | フォーム状態管理 | Mantine UI との統合が自然。Zod バリデーション連携 |
| Lucide React | 最新 | アイコンライブラリ | Tree-shakable で軽量 |
| Framer Motion | 12.x | アニメーション | 宣言的 API。layout animation / AnimatePresence |
| TanStack Query | 5.x | クライアントサイドデータフェッチ | キャッシュ・再検証・エラーリトライを宣言的に扱える |
| Axios | 最新 | HTTP クライアント | インターセプター、エラーハンドリングが充実 |
| Zod | 4.x | バリデーション | ランタイム型検証。クライアント・サーバー共有 |
| Orval | 最新 | API クライアント自動生成 | OpenAPI スキーマから型安全なクライアントを生成 |
| Vite | 8.x | ビルドツール | React Router v7 の開発サーバー・ビルド |
| PostCSS | 最新 | CSS 処理 | Mantine UI の PostCSS プリセット適用 |
| Tailwind CSS | 4.x | ユーティリティ CSS | Mantine と併用。細かなレイアウト調整に使用 |

## バックエンド（`server/`）

| 技術 | バージョン | 責務 | 選定理由 |
|---|---|---|---|
| Hono | 4.x | HTTP フレームワーク | 軽量・高速。OpenAPI 統合、Zod バリデーションミドルウェア |
| @hono/zod-openapi | 最新 | OpenAPI スキーマ生成 | ルート定義から OpenAPI ドキュメントを自動生成 |
| Bun | 最新 | JavaScript ランタイム | 高速な起動・実行。TypeScript ネイティブサポート |
| Drizzle ORM | 最新 | ORM / スキーマ定義 | 型安全なクエリ生成。SQL に近い API |
| drizzle-kit | 最新 | マイグレーション・スタジオ | スキーマ変更の生成・適用・GUI 管理 |
| PostgreSQL (Neon) | 最新 | リレーショナル DB | 正規化スキーマ設計に適する。Neon でサーバーレス運用 |
| Zod | 4.x | バリデーション | ランタイム型検証。Hono ミドルウェアとの統合 |

## 開発基盤

| 技術 | 責務 | 選定理由 |
|---|---|---|
| pnpm | ワークスペース管理 | モノレポ構成の依存管理 |
| Bun | サーバー側ランタイム | server/ 配下の実行と依存管理 |
| Biome | リンター・フォーマッター | ESLint + Prettier の代替。高速で設定が簡潔 |
| Docker Compose | ローカル DB 環境 | PostgreSQL をローカルで再現可能に起動 |
| MSW | API モック | 開発・テスト時の API モック |

## 技術間の関係

```
[ブラウザ]
  ├── React Router v7 (SSR + クライアントナビゲーション)
  ├── Mantine UI → コンポーネント・テーマ・スタイリング
  ├── Framer Motion → アニメーション
  ├── Mantine Form + Zod → フォーム入力・バリデーション
  └── TanStack Query + Axios → クライアント再取得

[React Router loader]
  └── fetch → Hono API → JSON（初期表示 SSR）

[Hono API サーバー (server/)]
  ├── Routes → Services → Drizzle ORM → PostgreSQL (Neon)
  ├── @hono/zod-openapi → OpenAPI スキーマ生成
  └── Zod バリデーション

[API クライアント生成]
  └── Orval → OpenAPI JSON → 型安全な Axios クライアント (client/)

[開発環境]
  ├── Docker Compose → PostgreSQL コンテナ
  ├── drizzle-kit → DB マイグレーション・スタジオ
  └── Biome → コード品質
```
