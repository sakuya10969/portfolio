# 構造方針

## FSD 採用理由

Feature-Sliced Design（FSD）を採用する理由は以下の通り。

- ページ・機能・ドメイン・共通基盤の責務が明確に分離される
- 「この処理はどこに置くか」の判断基準がレイヤーとスライスで一意に決まる
- コンポーネントの再利用範囲と依存方向が制約されるため、暗黙の結合を防げる
- ポートフォリオサイトは小規模だが、Project / Skill / Experience など複数のドメインエンティティを扱うため、pages/components/lib の平坦な構造では責務が曖昧になりやすい
- 将来的な機能追加（ブログ、管理画面等）にも構造を壊さず対応できる

## レイヤー定義と責務

FSD のレイヤーは上位から下位への一方向依存を原則とする。上位レイヤーは下位レイヤーに依存できるが、逆方向の依存は禁止する。

```
app → pages → widgets → features → entities → shared
```

### app レイヤー

- Next.js App Router に必要なアプリケーションエントリを担う
- `src/app/` ディレクトリに配置する
- layout.tsx、providers、global styles、route segment 管理を置く
- ルーティングと大枠の初期設定が責務。ドメインロジックは書かない
- 各 route segment の `page.tsx` は pages レイヤーのコンポーネントを呼び出すだけにする

### pages レイヤー

- 画面単位の構成を担う
- `src/pages/` ディレクトリに配置する（Next.js の Pages Router とは無関係。FSD の pages レイヤー）
- ルートごとのページ構成を組み立てる
- 複数の widgets / features を合成してページ全体を構築する
- データ取得のオーケストレーションもここで行う（Server Component として）

### widgets レイヤー

- ページを構成する比較的大きな UI ブロックを担う
- `src/widgets/` ディレクトリに配置する
- 例：hero-section, project-list-section, skill-section, experience-section, contact-section
- 複数の entities / features を組み合わせた表示単位
- ページ固有のレイアウト調整はここで吸収する

### features レイヤー

- ユーザー操作や意味のある機能単位を担う
- `src/features/` ディレクトリに配置する
- 例：project-filter, contact-form, theme-toggle, mobile-menu
- UI とロジックを機能単位でまとめる
- 状態管理、イベントハンドリング、API 呼び出しを含む

### entities レイヤー

- ドメイン上の主要データ表現を担う
- `src/entities/` ディレクトリに配置する
- 例：project, skill, experience, profile
- 型定義、UI 断片（カード、バッジ等）、mapper、軽いロジックを整理する
- ビジネスロジックは最小限。データの表現と変換が中心

### shared レイヤー

- 汎用 UI、ユーティリティ、API client、schema、config、定数を担う
- `src/shared/` ディレクトリに配置する
- どのレイヤーからも参照される共通基盤
- ドメイン知識を含まない

### processes レイヤー

- 今回は必須レイヤーとして固定しない
- 複数 feature を跨ぐ長いユーザーフロー（例：多段階フォーム、ウィザード）が明確になった段階で導入を検討する
- 導入する場合は `src/processes/` に配置する
