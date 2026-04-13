# docs/ ドキュメントインデックス

## ドキュメント一覧

| ファイル | 内容 | 概要 |
|---|---|---|
| [project-overview.md](./project-overview.md) | プロジェクト概要 | サイトの目的、ターゲットユーザー、ページ構成、情報優先順位、設計原則 |
| [tech-stack.md](./tech-stack.md) | 技術スタック一覧 | 採用技術とバージョン、責務、選定理由、技術間の関係 |
| [architecture-philosophy.md](./architecture-philosophy.md) | アーキテクチャ | FSD（フロント）、レイヤードアーキテクチャ（バックエンド）、ディレクトリ構成、命名規則 |
| [features.md](./features.md) | 機能一覧 | ページ機能、インタラクション機能、UI 機能、ユーザーができること |
| [specs.md](./specs.md) | 技術仕様 | システム構成、フロント/バックエンド技術詳細、DB スキーマ、API 仕様、開発環境 |
| [domain-design.md](./domain-design.md) | ドメインモデル | エンティティ定義、属性、関連、Enum、設計方針 |
| [database-design.md](./database-design.md) | データベース設計 | テーブル設計、カラム定義、Enum、ER 図、インデックス方針 |
| [api-design.md](./api-design.md) | API エンドポイント | エンドポイント一覧、リクエスト/レスポンス形式、バリデーション |
| [history.md](./history.md) | 完了済みタスク | Prisma→Drizzle+Hono 移行、FSD 構築、全ページ UI 実装 |
| [tasks.md](./tasks.md) | タスク一覧 | Next.js → React Router 刷新タスク |

## デプロイ構成

| コンポーネント | デプロイ先 | 備考 |
|---|---|---|
| フロントエンド (`client/`) | Cloudflare Pages | GitHub Actions で自動デプロイ |
| バックエンド (`server/`) | Cloudflare Workers | `wrangler.jsonc` で設定管理 |
| データベース | Neon Serverless PostgreSQL | サーバーレス運用 |

デプロイ方針の詳細は `.kiro/steering/tech.md` の「デプロイ方針」セクションを参照。

## ドキュメント責務の切り分け

| ドキュメント | 責務 | 書かないこと |
|---|---|---|
| features.md | ユーザーができること、機能一覧 | 技術的な実装詳細 |
| specs.md | 技術仕様、ライブラリ設定、API 仕様、DB 仕様 | アーキテクチャ方針、構造方針 |
| architecture-philosophy.md | アーキテクチャ方針、ディレクトリ構成、命名規則 | 個別の技術設定 |

## 関連ドキュメント

steering ドキュメント（実装判断の基準文書）は `.kiro/steering/` に配置している。

| ファイル | 内容 |
|---|---|
| `.kiro/steering/product.md` | プロダクト方針（目的、ページ、UX 方針） |
| `.kiro/steering/tech.md` | 技術方針（採用技術、描画戦略、DB 設計方針） |
| `.kiro/steering/structure.md` | 構造方針（FSD、レイヤードアーキテクチャ、ディレクトリ、命名規則、データフロー） |

## 注意事項

- 現在 Next.js → React Router 刷新を進行中。`src/` 配下は旧 Next.js コード。`client/` 配下が新 React Router コード。
- `database-design.md` は ORM 名が Prisma のままの記述が一部残っている。実態は Drizzle ORM（`server/src/db/schema/`）。
- `api-design.md` は Next.js Route Handlers 前提の記述が残っている。実態は Hono（`server/src/routes/`）。
