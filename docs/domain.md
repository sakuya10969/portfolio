# ドメインモデル

## 概要

このポートフォリオサイトのドメインは「エンジニアの制作実績・技術力・経歴を構造化して外部に伝える」ことを中心に構成される。
各エンティティはそれぞれ明確な責務を持ち、正規化された関係で結ばれる。

## エンティティ一覧

### Profile（プロフィール）

サイトオーナーの基本情報を保持する。システム内に1件のみ存在する想定。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String | 名前 |
| title | String | 肩書き |
| bio | Text | 自己紹介文 |
| avatarUrl | String? | アバター画像 URL |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

関連: `SocialLink` (1:N)

### SocialLink（ソーシャルリンク）

Profile に紐づく外部リンク（GitHub, Twitter, LinkedIn 等）。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| profileId | UUID | Profile への外部キー |
| platform | Enum | プラットフォーム種別 |
| url | String | リンク URL |
| sortOrder | Int | 表示順 |

### Project（プロジェクト）

制作物の基本情報。ポートフォリオの中核エンティティ。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| slug | String (unique) | URL パス用識別子 |
| title | String | タイトル |
| summary | Text | 概要 |
| background | Text | 背景 / なぜ作ったか |
| architecture | Text | 設計 / アーキテクチャの要点 |
| highlights | Text | 工夫した点 |
| challenges | Text | 苦労した点 |
| futureWork | Text | 今後の改善予定 |
| thumbnailUrl | String? | サムネイル画像 URL |
| isPublished | Boolean | 公開状態 |
| sortOrder | Int | 表示順 |
| categoryId | UUID | ProjectCategory への外部キー |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

関連: `ProjectCategory` (N:1), `ProjectLink` (1:N), `Technology` (N:N via ProjectTechnology)

### ProjectLink（プロジェクトリンク）

プロジェクトに紐づく外部リンク（GitHub, Demo, ドキュメント等）。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| projectId | UUID | Project への外部キー |
| type | Enum | リンク種別（github, demo, docs 等） |
| url | String | リンク URL |
| label | String? | 表示ラベル |
| sortOrder | Int | 表示順 |

### ProjectCategory（プロジェクトカテゴリ）

プロジェクトの分類。フィルタリングに使用する。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String (unique) | カテゴリ名 |
| slug | String (unique) | URL / フィルタ用識別子 |
| sortOrder | Int | 表示順 |

### Technology（技術）

技術の定義。Project と Skill の両方から参照される共通マスタ。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String (unique) | 技術名 |
| iconUrl | String? | アイコン URL |
| officialUrl | String? | 公式サイト URL |
| sortOrder | Int | 表示順 |

### ProjectTechnology（中間テーブル）

Project と Technology の多対多関係を表現する。

| 属性 | 型 | 説明 |
|---|---|---|
| projectId | UUID | Project への外部キー |
| technologyId | UUID | Technology への外部キー |

複合主キー: (projectId, technologyId)

### SkillCategory（スキルカテゴリ）

スキルの分類（言語、フレームワーク、インフラ等）。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String (unique) | カテゴリ名 |
| slug | String (unique) | 識別子 |
| sortOrder | Int | 表示順 |

### Skill（スキル）

個別スキル。SkillCategory に属し、Technology と関連付け可能。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String | スキル名 |
| categoryId | UUID | SkillCategory への外部キー |
| technologyId | UUID? | Technology への外部キー（任意） |
| proficiency | Enum? | 習熟度 |
| sortOrder | Int | 表示順 |

### Experience（経歴）

職歴・学歴・活動歴。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| type | Enum | 種別（work, education, activity） |
| organization | String | 組織名 |
| role | String | 役割 |
| description | Text | 概要 |
| startDate | DateTime | 開始日 |
| endDate | DateTime? | 終了日（null = 現在） |
| sortOrder | Int | 表示順 |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

### Contact（問い合わせ）

問い合わせフォームからの送信内容を保存する。

| 属性 | 型 | 説明 |
|---|---|---|
| id | UUID | 主キー |
| name | String | 送信者名 |
| email | String | メールアドレス |
| subject | String | 件名 |
| message | Text | 本文 |
| createdAt | DateTime | 送信日時 |

## エンティティ関連図

```
Profile ──1:N──▶ SocialLink

ProjectCategory ──1:N──▶ Project
Project ──1:N──▶ ProjectLink
Project ──N:N──▶ Technology  (via ProjectTechnology)

SkillCategory ──1:N──▶ Skill
Skill ──N:1──▶ Technology (optional)

Experience (独立)
Contact (独立)
```

## Enum 定義

| Enum | 値 |
|---|---|
| SocialPlatform | github, twitter, linkedin, website, other |
| ProjectLinkType | github, demo, docs, other |
| ExperienceType | work, education, activity |
| Proficiency | beginner, intermediate, advanced, expert |

## 設計方針

- 全モデルに `createdAt` / `updatedAt` を付与する
- 表示順制御が必要なモデルには `sortOrder` を持たせる
- 公開制御が必要なモデルには `isPublished` を持たせる
- slug はユニーク制約を付与し、URL パスに使用する
- 中間テーブルで多対多を表現し、将来の拡張（属性追加等）に備える
- Technology を共通マスタとし、Project と Skill の両方から参照可能にする
