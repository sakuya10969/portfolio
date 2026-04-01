# 機能一覧（Hono + Drizzle 移行後）

## アプリ概要

エンジニアとしての技術力・設計力・制作実績を外部に伝えるためのポートフォリオサイト。
フロントエンドは Next.js（App Router）、バックエンド API は Hono（`server/` 配下）、ORM / DB アクセスは Drizzle で構成する。
Prisma は完全撤廃し、Drizzle に一本化する。

## システム構成

| レイヤー | 技術 | 責務 |
|---|---|---|
| フロントエンド | Next.js (App Router) | SSR/SSG、ルーティング、UI レンダリング、Client Components によるインタラクション |
| バックエンド API | Hono (`server/src/`) | HTTP ハンドリング、リクエストバリデーション、レスポンス整形。ビジネスロジック・DB アクセスとは分離する |
| ORM / DB アクセス | Drizzle ORM | 型安全なクエリ生成、スキーマ定義、マイグレーション管理 |
| データベース | PostgreSQL | リレーショナルデータストア |

### 責務分離の方針

- Hono は HTTP リクエスト/レスポンスの処理に集中する
- DB アクセスロジックはサービス層（またはリポジトリ層）として Hono のルートハンドラから分離する
- Drizzle スキーマを型の単一真実源とし、フロントエンド側の型定義もここから派生させる
- Next.js の Server Components からは Hono API を経由してデータを取得する（直接 DB アクセスしない）
- Next.js の Route Handlers（`src/app/api/`）は廃止し、全 API を Hono に集約する

## 想定ユースケース

| ユーザー | 行動 |
|---|---|
| 採用担当者 | トップページで人物像を把握 → Projects で制作物を確認 → 詳細ページで技術力を評価 → Contact で連絡 |
| エンジニア | Skills で技術スタックを確認 → Projects で設計・アーキテクチャの詳細を閲覧 |
| 学生・第三者 | Home → About で経歴・価値観を把握 → Experience で活動歴を確認 |

## ページ機能

| 機能 | 説明 | データ取得元 |
|---|---|---|
| Home ページ | Hero セクション、代表プロジェクト（2〜3件）、技術スタック概要、各セクション導線 | Hono API（`/api/projects`, `/api/skills`） |
| About ページ | 自己紹介、価値観、SNS / GitHub リンク | Hono API（`/api/profile`） |
| Projects 一覧ページ | プロジェクトカード一覧、カテゴリ・技術フィルタ | Hono API（`/api/projects?category=&technology=`） |
| Project Detail ページ | 個別プロジェクトの全情報（背景、技術、設計、工夫、課題、改善予定、外部リンク） | Hono API（`/api/projects/:slug`） |
| Skills ページ | カテゴリ別技術一覧、習熟度表示 | Hono API（`/api/skills`） |
| Experience ページ | 職歴・学歴・活動歴の時系列表示 | Hono API（`/api/experiences`） |
| Contact ページ | 問い合わせフォーム（名前、メール、件名、本文） | Hono API（`POST /api/contact`） |

## インタラクション機能

| 機能 | 説明 | FSD 配置 |
|---|---|---|
| プロジェクトフィルタ | カテゴリ・技術による絞り込み。SWR で Hono API を再取得 | `features/project-filter` |
| コンタクトフォーム | React Hook Form + Zod。Hono API 経由で DB 保存 | `features/contact-form` |
| テーマ切替 | light / dark / system。next-themes で管理 | `features/theme-toggle` |
| モバイルメニュー | ハンバーガーメニューの開閉。AnimatePresence | `features/mobile-menu` |
| イントロカウントダウン | 初回訪問時のカウントダウン演出 | `features/intro-countdown` |

## UI / 表示機能

| 機能 | 説明 |
|---|---|
| レスポンシブレイアウト | モバイルファースト設計、デスクトップ拡張 |
| ダークモード | CSS 変数ベースのテーマ切替（light / dark / system） |
| スクロールアニメーション | セクション出現時の fade-in（Framer Motion） |
| Hero アニメーション | 初回表示の fade-in + slide-up |
| カードホバー | Project card の scale + shadow |
| ローディング状態 | 各ページの loading.tsx / スケルトン UI |
| エラー状態 | 各ページの error.tsx / ユーザー向けエラー表示 |
| 空状態 | データが存在しない場合の表示 |

## バックエンド API（Hono）

| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/api/profile` | GET | プロフィール情報 + SNS リンク取得 |
| `/api/projects` | GET | プロジェクト一覧取得（`?category=`, `?technology=` フィルタ対応） |
| `/api/projects/:slug` | GET | プロジェクト詳細取得（404 対応） |
| `/api/projects/categories` | GET | プロジェクトカテゴリ一覧取得 |
| `/api/skills` | GET | スキル一覧取得（カテゴリ別グループ化） |
| `/api/experiences` | GET | 経歴一覧取得（sortOrder 順） |
| `/api/contact` | POST | 問い合わせ送信（Zod バリデーション → DB 保存） |

### API 設計方針

- レスポンス形式は JSON 統一。`{ data: T }` または `{ error: { message, code } }` の構造化レスポンス
- バリデーションは Zod で行い、Hono のミドルウェアまたはハンドラ内で実行
- エラー時は適切な HTTP ステータスコードとエラーメッセージを返す
- CORS 設定を Hono ミドルウェアで管理（Next.js からのリクエストを許可）

## データモデル（Drizzle スキーマ）

現行 Prisma スキーマと同等のモデルを Drizzle で再定義する。

| モデル | 責務 |
|---|---|
| profiles | サイトオーナーの基本情報 |
| social_links | SNS / GitHub 等の外部リンク（profiles に紐づく） |
| project_categories | プロジェクトの分類カテゴリ |
| projects | 制作物の基本情報 |
| project_links | プロジェクトに紐づく外部リンク |
| technologies | 技術の定義 |
| project_technologies | projects と technologies の中間テーブル |
| skill_categories | スキルの分類カテゴリ |
| skills | 個別スキル（skill_categories に属し、technologies と関連付け可能） |
| experiences | 職歴・学歴・活動歴 |
| contacts | 問い合わせ内容の保存 |

### Enum（PostgreSQL enum または Drizzle の pgEnum）

- `social_platform`: github, twitter, linkedin, website, other
- `project_link_type`: github, demo, docs, other
- `experience_type`: work, education, activity
- `proficiency`: beginner, intermediate, advanced, expert

## 将来検討機能

| 機能 | 説明 |
|---|---|
| ブログ機能 | 技術記事の投稿・表示 |
| 管理画面 | コンテンツの CRUD 操作 |
| メール送信 | Contact フォームからのメール通知 |
| OGP / SEO 最適化 | 各ページの metadata、OG 画像生成 |
| アナリティクス | アクセス解析の導入 |
| i18n | 多言語対応 |
