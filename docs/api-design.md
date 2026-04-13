# API エンドポイント

## 概要

API は Hono（`server/src/routes/`）で実装する。
OpenAPI スキーマは `@hono/zod-openapi` でルート定義から自動生成し、`server/openapi/openapi.json` に出力する。
クライアント側は Orval で OpenAPI スキーマから型安全な API クライアント・TanStack Query hooks を自動生成する。

レスポンス形式は JSON 統一。エラー時も構造化されたレスポンスを返す。

## エンドポイント一覧

### GET /api/profile

プロフィール情報と SNS リンクを取得する。

- レスポンス: `Profile`（social_links を含む）
- 用途: About ページ、Home ページの表示

### GET /api/projects

プロジェクト一覧を取得する。

- クエリパラメータ:
  - `category` (string, optional) — カテゴリ slug でフィルタ
  - `technology` (string, optional) — 技術名でフィルタ
- レスポンス: `Project[]`（公開済みのみ、sortOrder 順。category, technologies を含む）
- 用途: Projects ページ、Home ページの代表プロジェクト表示

### GET /api/projects/categories

プロジェクトカテゴリ一覧を取得する。

- レスポンス: `ProjectCategory[]`（sortOrder 順）
- 用途: プロジェクトフィルタの選択肢

### GET /api/projects/:slug

プロジェクト詳細を取得する。

- パスパラメータ: `slug` (string)
- レスポンス: `Project`（technologies, project_links, category を含む）
- エラー: 404 — 該当プロジェクトが存在しない場合

### GET /api/skills

スキル一覧を取得する。

- レスポンス: `SkillCategory[]`（各カテゴリに属する skills を含む、sortOrder 順）
- 用途: Skills ページ、Home ページの技術スタック概要

### GET /api/experiences

経歴一覧を取得する。

- レスポンス: `Experience[]`（sortOrder 順）
- 用途: Experience ページ

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
- バリデーション: @hono/zod-validator でサーバー側検証
- 処理: contacts テーブルへの INSERT
- 成功レスポンス: `{ data: { id, createdAt } }` (201)
- エラーレスポンス: `{ error: { message, code } }` (400)

### GET /health

ヘルスチェック。

- レスポンス: `{ status: "ok" }`

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
- バリデーションエラーは `VALIDATION_ERROR` コードで返す

## バリデーション方針

- フォーム入力は Zod でスキーマ定義する
- クライアント（Mantine Form + Zod）とサーバー（@hono/zod-validator）の両方で検証する
- エラーメッセージはユーザー向けに簡潔にする

## データ取得の使い分け

| 取得タイミング | 手段 | 用途 |
|---|---|---|
| 初期表示（SSR） | React Router loader → fetch(Hono API) | ページ初期データ |
| クライアント再取得 | TanStack Query → Axios → Hono API | フィルタ変更、フォーム送信後 |
