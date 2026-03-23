# API エンドポイント

## 概要

API は Next.js Route Handlers で実装する。外部バックエンドは導入しない。
サーバーコンポーネントから直接 Prisma を呼ぶ場合は Route Handler を経由しない。Route Handler はクライアントからの fetch 用途に限定する。

レスポンス形式は JSON 統一。エラー時も構造化されたレスポンスを返す。

## エンドポイント一覧

### GET /api/projects

プロジェクト一覧を取得する。

- クエリパラメータ:
  - `category` (string, optional) — カテゴリ slug でフィルタ
  - `technology` (string, optional) — 技術名でフィルタ
- レスポンス: `Project[]`（公開済みのみ、sortOrder 順）
- 用途: クライアント側でのフィルタ変更時に SWR 経由で呼び出す

### GET /api/projects/:slug

プロジェクト詳細を取得する。

- パスパラメータ: `slug` (string) — プロジェクトの slug
- レスポンス: `Project`（関連する Technology, ProjectLink, ProjectCategory を含む）
- エラー: 404 — 該当プロジェクトが存在しない場合

### GET /api/skills

スキル一覧を取得する。

- レスポンス: `SkillCategory[]`（各カテゴリに属する Skill を含む、sortOrder 順）
- 用途: クライアント側での再取得が必要な場合

### GET /api/experiences

経歴一覧を取得する。

- レスポンス: `Experience[]`（sortOrder 順）
- 用途: クライアント側での再取得が必要な場合

### POST /api/contact

問い合わせを送信する。

- リクエストボディ:
  ```json
  {
    "name": "string",
    "email": "string (email format)",
    "subject": "string",
    "message": "string"
  }
  ```
- バリデーション: Zod スキーマでサーバー側でも検証する
- 処理: Contact テーブルへの INSERT
- 成功レスポンス: `{ success: true }`
- エラーレスポンス: `{ success: false, errors: [...] }`
- 将来拡張: メール送信処理の追加を想定

## レスポンス形式

### 成功時

```json
{
  "data": { ... }
}
```

### エラー時

```json
{
  "error": {
    "message": "ユーザー向けエラーメッセージ",
    "code": "ERROR_CODE"
  }
}
```

- 内部エラーの詳細はクライアントに露出しない
- バリデーションエラーはフィールド単位で返す

## バリデーション方針

- フォーム入力は Zod でスキーマ定義する
- クライアント（React Hook Form + Zod Resolver）とサーバー（Route Handler）の両方で同一スキーマを使って検証する
- エラーメッセージはユーザー向けに簡潔にする

## データ取得の使い分け

| 取得元 | 手段 | 用途 |
|---|---|---|
| Server Component | Prisma 直接呼び出し | 初期表示（SSR） |
| Client Component | SWR → Route Handler | フィルタ変更、フォーム送信後の再取得 |

Route Handler 内でも entities レイヤーのデータ取得関数を再利用し、ロジックの重複を避ける。
