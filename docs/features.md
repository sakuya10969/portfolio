# 機能一覧

## 実装ステータス凡例

- ✅ 実装済み
- 🔧 実装中
- 📋 未実装（計画済み）
- 💡 将来検討

## ページ機能

| 機能 | ステータス | 説明 |
|---|---|---|
| Home ページ | 📋 | Hero セクション、代表プロジェクト表示、技術スタック概要、導線 |
| About ページ | 📋 | 自己紹介、価値観、外部リンク |
| Projects 一覧ページ | 📋 | プロジェクトカード一覧、フィルタリング |
| Project Detail ページ | 📋 | 個別プロジェクトの詳細表示 |
| Skills ページ | 📋 | カテゴリ別技術一覧、習熟度表示 |
| Experience ページ | 📋 | 職歴・学歴・活動歴の時系列表示 |
| Contact ページ | 📋 | 問い合わせフォーム |

## インタラクション機能

| 機能 | ステータス | 説明 | FSD 配置 |
|---|---|---|---|
| プロジェクトフィルタ | 📋 | カテゴリ・技術による絞り込み。SWR で再取得 | `features/project-filter` |
| コンタクトフォーム | 📋 | React Hook Form + Zod。Route Handler 経由で DB 保存 | `features/contact-form` |
| テーマ切替 | 📋 | light / dark / system。next-themes で管理 | `features/theme-toggle` |
| モバイルメニュー | 📋 | ハンバーガーメニューの開閉。AnimatePresence | `features/mobile-menu` |

## UI / 表示機能

| 機能 | ステータス | 説明 |
|---|---|---|
| レスポンシブレイアウト | 📋 | モバイルファースト設計、デスクトップ拡張 |
| ダークモード | 📋 | CSS 変数ベースのテーマ切替 |
| スクロールアニメーション | 📋 | セクション出現時の fade-in（Framer Motion） |
| Hero アニメーション | 📋 | 初回表示の fade-in + slide-up |
| カードホバー | 📋 | Project card の scale + shadow |
| ローディング状態 | 📋 | 各ページの loading.tsx |
| エラー状態 | 📋 | 各ページの error.tsx |
| 空状態 | 📋 | データが存在しない場合の表示 |

## バックエンド機能

| 機能 | ステータス | 説明 |
|---|---|---|
| プロジェクト一覧 API | 📋 | `GET /api/projects`（フィルタ対応） |
| プロジェクト詳細 API | 📋 | `GET /api/projects/:slug` |
| スキル一覧 API | 📋 | `GET /api/skills` |
| 経歴一覧 API | 📋 | `GET /api/experiences` |
| 問い合わせ送信 API | 📋 | `POST /api/contact` |
| DB スキーマ設計 | 📋 | Prisma schema、マイグレーション |
| シードデータ | 📋 | 開発用初期データ投入 |

## 将来検討機能

| 機能 | ステータス | 説明 |
|---|---|---|
| ブログ機能 | 💡 | 技術記事の投稿・表示 |
| 管理画面 | 💡 | コンテンツの CRUD 操作 |
| メール送信 | 💡 | Contact フォームからのメール通知 |
| OGP / SEO 最適化 | 💡 | 各ページの metadata、OG 画像生成 |
| アナリティクス | 💡 | アクセス解析の導入 |
| i18n | 💡 | 多言語対応 |
