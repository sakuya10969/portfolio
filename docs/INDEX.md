# docs/ ドキュメントインデックス

## ドキュメント一覧

| ファイル | 内容 | 概要 |
|---|---|---|
| [project-overview.md](./project-overview.md) | プロジェクト概要 | サイトの目的、ターゲットユーザー、ページ構成、情報優先順位、設計原則 |
| [tech-stack.md](./tech-stack.md) | 技術スタック一覧 | 採用技術とバージョン、責務、選定理由、技術間の関係 |
| [architecture-philosophy.md](./architecture-philosophy.md) | アーキテクチャ | FSD 採用理由、レイヤー定義、App Router との整合、ディレクトリ構成、命名規則 |
| [features.md](./features.md) | 機能一覧 | ページ機能、インタラクション機能、UI 機能、バックエンド API、ユーザーができること |
| [specs.md](./specs.md) | 技術仕様 | システム構成、フロント/バックエンド技術詳細、DB スキーマ、API 仕様、開発環境 |
| [domain-design.md](./domain-design.md) | ドメインモデル | エンティティ定義、属性、関連、Enum、設計方針 |
| [database-design.md](./database-design.md) | データベース設計 | テーブル設計、カラム定義、Enum、ER 図、インデックス方針 |
| [api-design.md](./api-design.md) | API エンドポイント | エンドポイント一覧、リクエスト/レスポンス形式、バリデーション |
| [history.md](./history.md) | 完了済みタスク | Prisma→Drizzle+Hono 移行、FSD 構築、全ページ UI 実装 |
| [tasks.md](./tasks.md) | タスク一覧 | 今後の開発タスク（現在なし） |

## 関連ドキュメント

steering ドキュメント（実装判断の基準文書）は `.kiro/steering/` に配置している。

| ファイル | 内容 |
|---|---|
| `.kiro/steering/product.md` | プロダクト方針（目的、ページ、UX 方針） |
| `.kiro/steering/tech.md` | 技術方針（採用技術、描画戦略、DB 設計方針） |
| `.kiro/steering/structure.md` | 構造方針（FSD、ディレクトリ、命名規則、データフロー） |

## 注意事項

- `tech-stack.md`, `architecture-philosophy.md`, `api-design.md`, `database-design.md` は Prisma 時代の記述が一部残っている。最新の実態は `specs.md` を参照すること。
- 現在のバックエンドは Hono + Drizzle ORM 構成（`server/` 配下）。Prisma / Next.js Route Handlers は完全撤廃済み。
