# データベース設計

## 概要

- RDBMS: PostgreSQL
- ORM: Prisma（スキーマファースト）
- ローカル環境: Docker Compose で PostgreSQL コンテナを起動
- スキーマ管理: `prisma/schema.prisma` を単一の真実源とする
- マイグレーション: Prisma Migrate で履歴管理
- シードデータ: `prisma/seed.ts` で開発用初期データを投入

## 設計方針

- 正規化をかなり意識する。一時的な実装都合で denormalized な構造に逃げない
- データの責務と関係を明確に切り分ける
- 将来的な機能追加に耐えられるよう、カテゴリ・リンク・関連情報を分離する
- 多対多の関係は中間テーブルで表現し、将来の属性追加に備える

## 共通カラム方針

| カラム | 対象 | 説明 |
|---|---|---|
| `id` | 全モデル | UUID 主キー |
| `createdAt` | 全モデル | 作成日時（自動設定） |
| `updatedAt` | 全モデル | 更新日時（自動更新） |
| `sortOrder` | 表示順制御が必要なモデル | Int。表示順の明示的制御 |
| `isPublished` | 公開制御が必要なモデル | Boolean。公開/非公開の切り替え |

## テーブル設計

### Profile

サイトオーナーの基本情報。システム内に1件のみ。

```
Profile
├── id          UUID        PK
├── name        String      名前
├── title       String      肩書き
├── bio         Text        自己紹介文
├── avatarUrl   String?     アバター画像 URL
├── createdAt   DateTime    作成日時
└── updatedAt   DateTime    更新日時
```

### SocialLink

Profile に紐づく外部リンク。

```
SocialLink
├── id          UUID        PK
├── profileId   UUID        FK → Profile
├── platform    Enum        SocialPlatform
├── url         String      リンク URL
├── sortOrder   Int         表示順
├── createdAt   DateTime
└── updatedAt   DateTime
```

### ProjectCategory

プロジェクトの分類カテゴリ。

```
ProjectCategory
├── id          UUID        PK
├── name        String      UNIQUE カテゴリ名
├── slug        String      UNIQUE フィルタ用識別子
├── sortOrder   Int         表示順
├── createdAt   DateTime
└── updatedAt   DateTime
```

### Project

制作物の基本情報。ポートフォリオの中核テーブル。

```
Project
├── id            UUID        PK
├── slug          String      UNIQUE URL パス用
├── title         String      タイトル
├── summary       Text        概要
├── background    Text        背景 / なぜ作ったか
├── architecture  Text        設計 / アーキテクチャの要点
├── highlights    Text        工夫した点
├── challenges    Text        苦労した点
├── futureWork    Text        今後の改善予定
├── thumbnailUrl  String?     サムネイル画像 URL
├── isPublished   Boolean     公開状態（default: false）
├── sortOrder     Int         表示順
├── categoryId    UUID        FK → ProjectCategory
├── createdAt     DateTime
└── updatedAt     DateTime
```

### ProjectLink

プロジェクトに紐づく外部リンク。

```
ProjectLink
├── id          UUID        PK
├── projectId   UUID        FK → Project
├── type        Enum        ProjectLinkType
├── url         String      リンク URL
├── label       String?     表示ラベル
├── sortOrder   Int         表示順
├── createdAt   DateTime
└── updatedAt   DateTime
```

### Technology

技術の共通マスタ。Project と Skill の両方から参照される。

```
Technology
├── id            UUID        PK
├── name          String      UNIQUE 技術名
├── iconUrl       String?     アイコン URL
├── officialUrl   String?     公式サイト URL
├── sortOrder     Int         表示順
├── createdAt     DateTime
└── updatedAt     DateTime
```

### ProjectTechnology（中間テーブル）

Project と Technology の多対多。

```
ProjectTechnology
├── projectId     UUID        FK → Project
├── technologyId  UUID        FK → Technology
└── (複合PK: projectId + technologyId)
```

### SkillCategory

スキルの分類カテゴリ。

```
SkillCategory
├── id          UUID        PK
├── name        String      UNIQUE カテゴリ名
├── slug        String      UNIQUE 識別子
├── sortOrder   Int         表示順
├── createdAt   DateTime
└── updatedAt   DateTime
```

### Skill

個別スキル。SkillCategory に属し、Technology と関連付け可能。

```
Skill
├── id            UUID        PK
├── name          String      スキル名
├── categoryId    UUID        FK → SkillCategory
├── technologyId  UUID?       FK → Technology（任意）
├── proficiency   Enum?       Proficiency
├── sortOrder     Int         表示順
├── createdAt     DateTime
└── updatedAt     DateTime
```

### Experience

職歴・学歴・活動歴。

```
Experience
├── id            UUID        PK
├── type          Enum        ExperienceType
├── organization  String      組織名
├── role          String      役割
├── description   Text        概要
├── startDate     DateTime    開始日
├── endDate       DateTime?   終了日（null = 現在）
├── sortOrder     Int         表示順
├── createdAt     DateTime
└── updatedAt     DateTime
```

### Contact

問い合わせ内容の保存。

```
Contact
├── id          UUID        PK
├── name        String      送信者名
├── email       String      メールアドレス
├── subject     String      件名
├── message     Text        本文
└── createdAt   DateTime    送信日時
```

## Enum 定義

| Enum | 値 |
|---|---|
| SocialPlatform | `github`, `twitter`, `linkedin`, `website`, `other` |
| ProjectLinkType | `github`, `demo`, `docs`, `other` |
| ExperienceType | `work`, `education`, `activity` |
| Proficiency | `beginner`, `intermediate`, `advanced`, `expert` |

## ER 図（テキスト）

```
Profile ──1:N──▶ SocialLink

ProjectCategory ──1:N──▶ Project
Project ──1:N──▶ ProjectLink
Project ◀──N:N──▶ Technology  (via ProjectTechnology)

SkillCategory ──1:N──▶ Skill
Skill ──N:1──▶ Technology (optional)

Experience (独立)
Contact (独立)
```

## インデックス方針

- `Project.slug` — UNIQUE インデックス（URL ルーティング用）
- `ProjectCategory.slug` — UNIQUE インデックス（フィルタ用）
- `SkillCategory.slug` — UNIQUE インデックス
- `Technology.name` — UNIQUE インデックス
- 外部キーカラムには自動的にインデックスが付与される（Prisma デフォルト）
- `sortOrder` を使ったソートが頻繁なテーブルでは、必要に応じて複合インデックスを検討する
