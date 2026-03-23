# 技術方針

## 採用技術一覧と責務

### フロントエンド / アプリケーション基盤

| 技術 | 責務 | 選定理由 |
|---|---|---|
| Next.js (App Router) | アプリケーションフレームワーク、ルーティング、SSR/SSG | App Router による Server Components 活用で初期表示を高速化。API Route Handlers で軽量バックエンドも兼ねる |
| TypeScript | 型安全な開発言語 | 型による自己文書化と IDE 補完でコード品質と開発速度を両立する |
| Tailwind CSS | ユーティリティファーストのスタイリング | クラスベースで一貫したデザイントークン管理。shadcn/ui との親和性が高い |
| shadcn/ui | UI コンポーネントライブラリ | コピー&カスタマイズ前提の設計。依存を最小限に保ちつつ高品質な UI を素早く構築できる |
| Lucide React | アイコンライブラリ | Tree-shakable で軽量。shadcn/ui が標準採用しており統一感を保てる |
| next-themes | テーマ切替 | App Router + Server Components 環境でのテーマ管理に対応。flash-of-unstyled-content を防止する |
| Framer Motion | アニメーション | 宣言的 API で React との統合が自然。layout animation や AnimatePresence など高度な制御が可能 |
| SWR | クライアントサイドデータフェッチ | キャッシュ・再検証・エラーリトライを宣言的に扱える。サーバー取得との併用が容易 |

### バックエンド / API / データ

| 技術 | 責務 | 選定理由 |
|---|---|---|
| Next.js Route Handlers | API エンドポイント | 外部バックエンドを導入せず、同一リポジトリ内で API を完結させる |
| PostgreSQL | リレーショナルデータベース | 正規化されたスキーマ設計に適する。拡張性と信頼性が高い |
| Prisma | ORM / マイグレーション / シード | 型安全なクエリ生成。スキーマファーストで DB 設計を管理できる |
| Zod | バリデーション | ランタイム型検証。クライアント・サーバー双方で同一スキーマを共有できる |
| React Hook Form | フォーム状態管理 | 非制御コンポーネントベースで再レンダリングを最小化。Zod Resolver との統合が容易 |

### 開発基盤

| 技術 | 責務 | 選定理由 |
|---|---|---|
| pnpm | パッケージマネージャ | 高速インストールとディスク効率。ワークスペース対応 |
| ESLint | 静的解析 | コード品質の自動チェック |
| Prettier | コードフォーマッタ | フォーマットの統一を自動化 |
| Docker Compose | ローカル DB 環境 | PostgreSQL をローカルで再現可能に起動する |
| Prisma Migrate | DB マイグレーション | スキーマ変更を履歴管理する |
| Prisma Seed | 初期データ投入 | 開発・テスト用のシードデータを管理する |

## 描画戦略

- App Router ベースで構築する
- Server Components を基本とする。ページの大部分はサーバー側でレンダリングする
- 初期表示に必要なデータ（プロジェクト一覧、スキル一覧、経歴等）はサーバー側で Prisma 経由で取得する
- Client Components はインタラクションが必要な箇所に限定する
  - テーマ切替（next-themes）
  - プロジェクトフィルタ（カテゴリ・技術での絞り込み）
  - コンタクトフォーム（React Hook Form）
  - アニメーション制御（Framer Motion）
  - モバイルメニューの開閉
- SWR はクライアント側で再取得や状態同期が必要な部分にのみ使う
  - フィルタ変更後のプロジェクト再取得
  - フォーム送信後の状態更新
- 全画面をクライアントコンポーネント化しない。`"use client"` の付与は最小限にする

## API 方針

- 外部バックエンドは導入しない。API が必要な場合は Next.js Route Handlers を使う
- 最小限のエンドポイントで構成する
- 想定エンドポイント：
  - `GET /api/projects` — プロジェクト一覧取得（フィルタパラメータ対応）
  - `GET /api/projects/:slug` — プロジェクト詳細取得
  - `GET /api/skills` — スキル一覧取得
  - `GET /api/experiences` — 経歴一覧取得
  - `POST /api/contact` — 問い合わせ送信
- レスポンス形式は JSON 統一。エラー時も構造化されたレスポンスを返す
- サーバーコンポーネントから直接 Prisma を呼ぶ場合は Route Handler を経由しない。Route Handler はクライアントからの fetch 用途に限定する

## バリデーション方針

- フォーム入力は Zod でスキーマ定義する
- Route Handlers 側でもリクエストボディのバリデーションを行う
- クライアントとサーバーの両方で入力検証を行う（同一 Zod スキーマを共有）
- エラーメッセージはユーザー向けに簡潔にする。内部エラーの詳細はクライアントに露出しない

## フォーム方針

- React Hook Form + Zod Resolver を採用する
- Contact form は Route Handler（`POST /api/contact`）経由で送信する
- 初期段階では DB 保存を中心に設計する（Contact テーブルへの INSERT）
- 将来的なメール送信拡張を想定できる設計にする（送信処理を抽象化しておく）
- フォーム送信中のローディング状態、成功・エラーのフィードバックを必ず実装する

## アニメーション方針

- Framer Motion を採用する
- 利用箇所を明確に限定する：
  - Hero セクションの初回表示（fade-in + slide-up）
  - セクションのスクロール出現（intersection observer + fade-in）
  - Project card の hover（scale + shadow）
  - フィルタ切り替え時のリスト更新（layout animation）
  - Dialog / Drawer / Mobile menu の開閉（AnimatePresence）
- 上記以外の箇所では原則アニメーションを使わない
- 過剰な演出は避け、上品で軽い動きに統一する
- `prefers-reduced-motion` への配慮を前提にする。reduced motion 時はアニメーションを無効化またはフェードのみに簡略化する
- アニメーション用のユーティリティ（variants、transition presets）は shared レイヤーに集約する

## テーマ方針

- light / dark / system の3モードをサポートする
- next-themes で管理し、`<html>` の `class` 属性でテーマを切り替える
- shadcn/ui と整合する CSS 変数（design token）ベースで色を管理する
- アクセントカラーは1〜2色に絞って設計する。多色使いは避ける
- 情報の読みやすさを最優先にする。コントラスト比は WCAG AA 基準を目安にする
- テーマ切替時の flash を防止するため、next-themes の script injection を活用する

## DB とスキーマ設計方針

- PostgreSQL を採用する
- ローカル開発用に `docker-compose.yml` で PostgreSQL コンテナを起動する
- ORM は Prisma を採用する。スキーマファーストで設計し、`prisma/schema.prisma` を単一の真実源とする
- 正規化をかなり意識する。一時的な実装都合で denormalized な構造に逃げない
- データの責務と関係を明確に切り分ける
- 将来的な機能追加に耐えられるよう、カテゴリ・リンク・関連情報の分離を意識する

### 初期モデル候補

| モデル | 責務 |
|---|---|
| Profile | サイトオーナーの基本情報（名前、肩書き、自己紹介、アバター等） |
| SocialLink | SNS / GitHub 等の外部リンク。Profile に紐づく |
| Project | 制作物の基本情報（タイトル、slug、概要、背景、工夫、課題、改善予定等） |
| ProjectLink | プロジェクトに紐づく外部リンク（GitHub、Demo、ドキュメント等） |
| ProjectCategory | プロジェクトの分類カテゴリ |
| Technology | 技術の定義（名前、アイコン、公式URL等） |
| ProjectTechnology | Project と Technology の中間テーブル。多対多の関係を表現する |
| SkillCategory | スキルの分類カテゴリ（言語、フレームワーク、インフラ等） |
| Skill | 個別スキル。SkillCategory に属し、Technology と関連付け可能 |
| Experience | 職歴・学歴・活動歴（期間、役割、組織名、概要） |
| Contact | 問い合わせ内容の保存（名前、メール、件名、本文、送信日時） |

### スキーマ設計の補足方針

- 表示順を制御する `sortOrder` カラムを必要なモデルに持たせる
- 公開状態を制御する `isPublished` カラムを Project 等に持たせる
- `createdAt` / `updatedAt` は全モデルに付与する
- Project と Technology は中間テーブル `ProjectTechnology` で多対多を表現する
- Skill と Technology の関連付けも将来的に可能な設計にする
- slug はプロジェクトの URL パスに使用する。ユニーク制約を付与する
- Enum 型は Prisma の enum で定義する（リンク種別、経歴種別等）
