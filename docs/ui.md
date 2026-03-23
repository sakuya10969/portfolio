# UI / ビジュアル方針

## UI ライブラリ

### shadcn/ui

コンポーネントライブラリとして shadcn/ui を採用する。

- コピー&カスタマイズ前提の設計で、プロジェクト固有の調整が容易
- Radix UI ベースでアクセシビリティが考慮されている
- Tailwind CSS との統合が自然
- 配置先: `src/shared/ui/`

### Lucide React

アイコンライブラリとして Lucide React を採用する。

- Tree-shakable で必要なアイコンのみバンドルされる
- shadcn/ui が標準採用しており、デザインの統一感を保てる

## スタイリング

### Tailwind CSS

- ユーティリティファーストでスタイリングする
- デザイントークン（色、スペーシング、フォントサイズ等）は Tailwind の設定で一元管理する
- カスタムクラスの定義は最小限にし、ユーティリティの組み合わせを基本とする

### テーマ

- light / dark / system の3モードをサポートする
- next-themes で管理し、`<html>` の `class` 属性で切り替える
- CSS 変数（design token）ベースで色を管理する（shadcn/ui と整合）
- アクセントカラーは1〜2色に絞る
- コントラスト比は WCAG AA 基準を目安にする
- テーマ切替時の flash を防止する（next-themes の script injection）

## アニメーション

### Framer Motion

アニメーションライブラリとして Framer Motion を採用する。宣言的 API で React との統合が自然。

### 利用箇所（限定）

| 箇所 | アニメーション | 手法 |
|---|---|---|
| Hero セクション初回表示 | fade-in + slide-up | `motion.div` + initial/animate |
| セクションスクロール出現 | fade-in | `whileInView` + intersection observer |
| Project card hover | scale + shadow | `whileHover` |
| フィルタ切り替え | リスト更新 | layout animation |
| Dialog / Drawer / Mobile menu | 開閉 | `AnimatePresence` |

### 使わない箇所

上記以外では原則アニメーションを使わない。ページ遷移アニメーション、テキストの文字送り、背景の常時アニメーション等は採用しない。

### アニメーション設計原則

- 「動くことで理解しやすい」を基準にする。演出目的の過剰なアニメーションは避ける
- 上品で軽い動きに統一する（duration: 0.2〜0.4s 程度）
- `prefers-reduced-motion` を尊重する。reduced motion 時はアニメーションを無効化またはフェードのみに簡略化する
- 共通の variants / transition presets は `src/shared/lib/motion.ts` に集約する

## レスポンシブ設計

- モバイルファーストで設計し、デスクトップで拡張する
- ブレークポイントは Tailwind CSS のデフォルト（sm: 640px, md: 768px, lg: 1024px, xl: 1280px）を使用する
- モバイルではハンバーガーメニュー、デスクトップではナビゲーションバーを表示する

## 見た目の仕上がり方針

- 視認性と読みやすさを最優先する。装飾よりも情報の明瞭さを重視する
- タイポグラフィは階層を明確にし、見出し・本文・補足の区別をつける
- カード、リスト等の繰り返し構造は統一されたフォーマットで表示する
- 余白を十分に取り、情報の密度を適切に保つ
- 画像やアイコンは情報伝達を補助する目的で使い、装飾目的では使わない
