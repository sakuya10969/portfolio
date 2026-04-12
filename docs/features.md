# 機能一覧

## アプリ概要

エンジニアとしての技術力・設計力・制作実績を外部に伝えるためのポートフォリオサイト。
フロントエンドは Next.js（App Router）、バックエンド API は Hono（`server/` 配下）、ORM / DB アクセスは Drizzle で構成する。

## システム構成

| レイヤー | 技術 | 責務 |
|---|---|---|
| フロントエンド | Next.js (App Router) | SSR/SSG、ルーティング、UI レンダリング、Client Components によるインタラクション |
| バックエンド API | Hono (`server/src/`) | HTTP ハンドリング、リクエストバリデーション、レスポンス整形 |
| ORM / DB アクセス | Drizzle ORM | 型安全なクエリ生成、スキーマ定義、マイグレーション管理 |
| データベース | PostgreSQL (Neon) | リレーショナルデータストア |

## 想定ユースケース

| ユーザー | 行動 |
|---|---|
| 採用担当者 | トップページで人物像を把握 → Projects で制作物を確認 → 詳細ページで技術力を評価 → Contact で連絡 |
| エンジニア | Skills で技術スタックを確認 → Projects で設計・アーキテクチャの詳細を閲覧 |
| 学生・第三者 | Home → About で経歴・価値観を把握 → Experience で活動歴を確認 |

---

## ページ機能

### Home ページ

ファーストビューで人物像と代表的な制作物を提示し、全体への導線起点とする。

- Hero セクション（名前・肩書き・一言紹介）
- 代表プロジェクト（2〜3件）のハイライト表示
- 技術スタック概要
- 各セクションへの導線リンク
- イントロカウントダウン演出（初回訪問時）

ユーザーができること:
- 代表プロジェクトのカードをクリックして詳細ページへ遷移
- 各セクションへのナビゲーション

### About ページ

経歴・価値観・技術的関心領域を伝える。

- 自己紹介文
- エンジニアとしての価値観・関心領域
- SNS / GitHub 等の外部リンク

ユーザーができること:
- 外部リンク（GitHub, SNS 等）をクリックして遷移

### Projects 一覧ページ

制作物一覧をカード形式で表示し、フィルタリング機能を提供する。

- プロジェクトカード一覧表示
- カテゴリフィルタ（SWR で API 再取得）
- 技術フィルタ（SWR で API 再取得）

ユーザーができること:
- カテゴリ・技術でプロジェクトを絞り込む
- プロジェクトカードをクリックして詳細ページへ遷移

### Project Detail ページ

個別プロジェクトの全情報を網羅的に表示する。

- タイトル、概要
- 背景 / なぜ作ったか
- 技術スタック（Technology バッジ表示）
- 設計 / アーキテクチャの要点
- 工夫した点
- 苦労した点
- 今後の改善予定
- 外部リンク（GitHub, Demo, ドキュメント等）

ユーザーができること:
- 外部リンクをクリックして GitHub / Demo 等へ遷移

### Skills ページ

技術スタックをカテゴリ別に分類・習熟度とともに提示する。

- カテゴリ別技術一覧
- 各スキルの習熟度表示
- Technology アイコン表示

ユーザーができること:
- カテゴリ別にスキルを閲覧

### Experience ページ

職歴・学歴・活動歴を時系列で整理して表示する。

- 時系列での経歴表示
- 各項目に期間、役割、組織名、概要を記載

ユーザーができること:
- 経歴を時系列で閲覧

### Contact ページ

問い合わせフォームを提供する。

- フォーム入力（名前、メール、件名、本文）
- Zod バリデーション（クライアント + サーバー）
- 送信中のローディング状態表示
- 送信成功 / エラーのフィードバック

ユーザーができること:
- フォームに入力して問い合わせを送信
- バリデーションエラーの確認と修正

---

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

---

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
| `/health` | GET | ヘルスチェック |

### API レスポンス形式

成功時: `{ data: T }`
エラー時: `{ error: { message: string, code: string } }`

---

## データモデル（Drizzle スキーマ）

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
| skills | 個別スキル |
| experiences | 職歴・学歴・活動歴 |
| contacts | 問い合わせ内容の保存 |

---

## 将来検討機能

| 機能 | 説明 |
|---|---|
| ブログ機能 | 技術記事の投稿・表示 |
| 管理画面 | コンテンツの CRUD 操作 |
| メール送信 | Contact フォームからのメール通知 |
| OGP / SEO 最適化 | 各ページの metadata、OG 画像生成 |
| アナリティクス | アクセス解析の導入 |
| i18n | 多言語対応 |
