import { defineConfig } from "orval";

export default defineConfig({
  // TanStack Query hooks + TypeScript 型定義
  api: {
    input: "../server/openapi/openapi.json",
    output: {
      target: "./app/shared/api/generated/endpoints",
      schemas: "./app/shared/api/generated/models",
      client: "react-query",
      mode: "tags-split",
      override: {
        mutator: {
          path: "./app/shared/api/client.ts",
          name: "httpClient",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
  // Zod スキーマ生成
  apiZod: {
    input: "../server/openapi/openapi.json",
    output: {
      target: "./app/shared/api/generated/endpoints",
      client: "zod",
      mode: "tags-split",
      fileExtension: ".zod.ts",
    },
  },
});