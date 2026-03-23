# 技術スタック一覧

## フロントエンド / アプリケーション基盤

| 技術 | バージョン | 責務 | 選定理由 |
|---|---|---|---|
| Next.js (App Router) | 16.x | フレームワーク、ルーティング、SSR/SSG | Server Components で初期表示を高速化。Route Handlers で軽量バックエンドも兼ねる |
| TypeScript | 5.x | 型安全な開発言語 | 型による自己文書化と IDE 補完でコード品質と開発速度を両立 |
| React | 19.x | UI ライブラリ | React Compiler 対応。Server Components / Client Components の使い分けが可能 |
| Tailwind CSS | 4.x | ユーティリティファーストのスタイリング | クラスベースで一貫したデザイントークン管理。shadcn/ui との親和性が高い |
| shadcn/ui | 最新 | UI コンポーネントライブラリ | コピー&カスタマイズ前提。依存を最小限に保ちつつ高品質な UI を構築 |
| Lucide React | 最新 | アイコンライブラリ | Tree-shakable で軽量。shadcn/ui 標準採用 |
| next-themes | 最新 | テーマ切替 | App Router + Server Components 環境対応。FOUC 防止 |
| Framer Motion | 最新 | アニメーション | 宣言的 API。layout animation / AnimatePresence 等の高度な制御 |
| SWR | 最新 | クライアントサイドデータフェッチ | キャッシュ・再検証・エラーリトライを宣言的に扱える |

## バックエンド / API / データ

| 技術 | 責務 | 選定理由 |
|---|---|---|
| Next.js Route Handlers | API エンドポイント | 外部バックエンド不要。同一リポジトリ内で API を完結 |
| PostgreSQL | リレーショナル DB | 正規化スキーマ設計に適する。拡張性と信頼性が高い |
| Prisma | ORM / マイグレーション / シード | 型安全なクエリ生成。スキーマファーストで DB 設計を管理 |
| Zod | バリデーション | ランタイム型検証。クライアント・サーバー双方で同一スキーマを共有 |
| React Hook Form | フォーム状態管理 | 非制御コンポーネントベースで再レンダリング最小化。Zod Resolver 統合 |

## 開発基盤

| 技術 | 責務 | 選定理由 |
|---|---|---|
| pnpm | パッケージマネージャ | 高速インストールとディスク効率 |
| ESLint | 静的解析 | コード品質の自動チェック |
| Prettier | コードフォーマッタ | フォーマット統一の自動化 |
| Docker Compose | ローカル DB 環境 | PostgreSQL をローカルで再現可能に起動 |
| Prisma Migrate | DB マイグレーション | スキーマ変更の履歴管理 |
| Prisma Seed | 初期データ投入 | 開発・テスト用シードデータ管理 |

## 技術間の関係

```
[ブラウザ]
  ├── React (Server Components / Client Components)
  ├── Tailwind CSS + shadcn/ui → スタイリング・UI
  ├── Framer Motion → アニメーション
  ├── next-themes → テーマ管理
  ├── React Hook Form + Zod → フォーム入力・バリデーション
  └── SWR → クライアント再取得

[Next.js App Router]
  ├── Server Components → Prisma → PostgreSQL（初期表示）
  └── Route Handlers → Prisma → PostgreSQL（API 経由）

[開発環境]
  ├── Docker Compose → PostgreSQL コンテナ
  ├── Prisma Migrate / Seed → DB 管理
  └── ESLint + Prettier → コード品質
```
