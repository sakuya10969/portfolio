# Server

Hono ベースの API サーバーです。OpenAPI JSON は Swagger UI ではなく、まず Orval の入力として安定生成する用途を優先しています。

## OpenAPI JSON 生成

OpenAPI 対応済みルートから `server/openapi/openapi.json` を生成します。

```txt
bun run generate:openapi
```

生成先:

```txt
server/openapi/openapi.json
```

この JSON は HTTP エンドポイントを叩いて保存するのではなく、コード上で OpenAPI Document を組み立てて直接ファイル出力しています。

## Orval 連携

Orval の `input.target` から次のファイルを参照してください。

```ts
// 例: repo root の orval.config.ts
export default {
  portfolioApi: {
    input: {
      target: './server/openapi/openapi.json',
    },
    output: {
      target: './src/generated/api.ts',
      client: 'fetch',
    },
  },
};
```

## OpenAPI 対応の追加パターン

今後 API を追加するときは、既存ルートを一括で書き換えず、OpenAPI 対応したいルートだけを同じ流儀で増やします。

1. `@hono/zod-openapi` の `z` で request / response schema を定義する
2. `createRoute()` で OpenAPI route を作る
3. `register...Routes()` 関数で `app.openapi()` に登録する
4. `server/src/app.ts` の `registerOpenAPIRoutes()` に追加する
5. `bun run generate:openapi` を再実行する

現時点で OpenAPI 対応済みなのは `POST /api/contact` です。既存の他ルートは runtime の挙動を保ったまま残してあり、必要なものから順次移行できる構成にしています。
