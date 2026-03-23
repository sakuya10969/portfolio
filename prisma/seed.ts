import { PrismaClient } from "../src/shared/lib/generated";

const prisma = new PrismaClient();

async function main() {
  // Clean
  await prisma.contact.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.projectLink.deleteMany();
  await prisma.project.deleteMany();
  await prisma.projectCategory.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.profile.deleteMany();

  // Profile
  const profile = await prisma.profile.create({
    data: {
      name: "山田 太郎",
      title: "Full-Stack Developer",
      bio: "TypeScript・Next.js・PostgreSQL を中心としたフルスタック開発が得意です。\n\nバックエンドからフロントエンドまで一貫した設計・実装を行い、「動くもの」だけでなく「保守しやすいもの」を作ることを大切にしています。\n\nアーキテクチャ設計・コードレビュー・チーム開発の経験もあり、品質と速度のバランスを意識したエンジニアリングを実践しています。",
      socialLinks: {
        create: [
          { platform: "github", url: "https://github.com", sortOrder: 1 },
          { platform: "twitter", url: "https://twitter.com", sortOrder: 2 },
          { platform: "linkedin", url: "https://linkedin.com", sortOrder: 3 },
        ],
      },
    },
  });

  console.log("Created profile:", profile.name);

  // Technologies
  const technologies = await Promise.all([
    prisma.technology.create({ data: { name: "TypeScript", sortOrder: 1 } }),
    prisma.technology.create({ data: { name: "Next.js", sortOrder: 2 } }),
    prisma.technology.create({ data: { name: "React", sortOrder: 3 } }),
    prisma.technology.create({ data: { name: "Node.js", sortOrder: 4 } }),
    prisma.technology.create({ data: { name: "PostgreSQL", sortOrder: 5 } }),
    prisma.technology.create({ data: { name: "Prisma", sortOrder: 6 } }),
    prisma.technology.create({ data: { name: "Docker", sortOrder: 7 } }),
    prisma.technology.create({ data: { name: "Tailwind CSS", sortOrder: 8 } }),
    prisma.technology.create({ data: { name: "Zod", sortOrder: 9 } }),
    prisma.technology.create({ data: { name: "Redis", sortOrder: 10 } }),
    prisma.technology.create({ data: { name: "Go", sortOrder: 11 } }),
    prisma.technology.create({ data: { name: "AWS", sortOrder: 12 } }),
  ]);

  const techMap = Object.fromEntries(technologies.map((t) => [t.name, t]));

  // Project Categories
  const webAppCat = await prisma.projectCategory.create({
    data: { name: "Web App", slug: "web-app", sortOrder: 1 },
  });
  const cliCat = await prisma.projectCategory.create({
    data: { name: "CLI Tool", slug: "cli-tool", sortOrder: 2 },
  });
  const libCat = await prisma.projectCategory.create({
    data: { name: "Library", slug: "library", sortOrder: 3 },
  });

  console.log("Created categories:", webAppCat.name, cliCat.name, libCat.name);

  // Projects
  const project1 = await prisma.project.create({
    data: {
      slug: "portfolio-site",
      title: "ポートフォリオサイト",
      summary: "Next.js App Router と FSD アーキテクチャを採用した、フルスタック構成のポートフォリオサイト。",
      background: "自身の技術力・設計力・プロジェクト経験を体系的に伝えるためのポートフォリオが必要だった。単なる静的な自己紹介ではなく、実際のコードの品質で技術力を示す場として構築した。",
      architecture: "Feature-Sliced Design (FSD) を採用し、app → pages → widgets → features → entities → shared の依存方向を厳守した。データ取得は Server Components 主体とし、クライアント側の状態を最小限に抑えた。DBは PostgreSQL + Prisma で正規化を意識したスキーマ設計を行った。",
      highlights: "FSD の依存ルールを機械的に守ることで、ドメインロジックの混在を防いだ。Server Components でのデータ取得を最大限活用し、不要なクライアント処理を排除した。Prisma スキーマから型を自動生成することで型安全性を保った。",
      challenges: "App Router と FSD の整合をとることが最初の難所だった。ルーティングは app/ に従いながら、ドメインロジックを FSD の各レイヤーに切り出す設計の明確化に時間をかけた。",
      futureWork: "管理画面の追加、ブログ機能の実装、OGP 最適化、アナリティクス導入を検討している。",
      isPublished: true,
      sortOrder: 1,
      categoryId: webAppCat.id,
    },
  });

  await prisma.projectLink.createMany({
    data: [
      { projectId: project1.id, type: "github", url: "https://github.com", label: "GitHub", sortOrder: 1 },
      { projectId: project1.id, type: "demo", url: "https://example.com", label: "Live Demo", sortOrder: 2 },
    ],
  });

  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project1.id, technologyId: techMap["TypeScript"].id },
      { projectId: project1.id, technologyId: techMap["Next.js"].id },
      { projectId: project1.id, technologyId: techMap["PostgreSQL"].id },
      { projectId: project1.id, technologyId: techMap["Prisma"].id },
      { projectId: project1.id, technologyId: techMap["Tailwind CSS"].id },
    ],
  });

  const project2 = await prisma.project.create({
    data: {
      slug: "task-management-api",
      title: "タスク管理 REST API",
      summary: "Go で構築した高パフォーマンスなタスク管理 API。JWT 認証・ページネーション・Redis キャッシュを実装。",
      background: "チーム内でのタスク管理ツールを自作し、バックエンド設計の理解を深めることを目的とした。Go のパフォーマンスと明示的なエラーハンドリングに興味を持ち採用した。",
      architecture: "レイヤードアーキテクチャ（Handler → Service → Repository）でドメインロジックを分離。PostgreSQL を主データストア、Redis をセッションと検索結果のキャッシュとして使用した。JWT によるステートレス認証を実装。",
      highlights: "Go の interface を活用して依存を抽象化し、テスタビリティを確保した。Redis キャッシュにより頻繁なリスト取得のレスポンスタイムを大幅に削減した。",
      challenges: "Go 初学者として、エラー処理のパターンとインターフェース設計の設計思想を理解するのに時間がかかった。",
      futureWork: "gRPC 対応、WebSocket によるリアルタイム通知、OpenAPI ドキュメント自動生成を検討。",
      isPublished: true,
      sortOrder: 2,
      categoryId: webAppCat.id,
    },
  });

  await prisma.projectLink.createMany({
    data: [
      { projectId: project2.id, type: "github", url: "https://github.com", label: "GitHub", sortOrder: 1 },
    ],
  });

  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project2.id, technologyId: techMap["Go"].id },
      { projectId: project2.id, technologyId: techMap["PostgreSQL"].id },
      { projectId: project2.id, technologyId: techMap["Redis"].id },
      { projectId: project2.id, technologyId: techMap["Docker"].id },
    ],
  });

  const project3 = await prisma.project.create({
    data: {
      slug: "ts-validation-lib",
      title: "型安全バリデーションライブラリ",
      summary: "TypeScript で書かれた型推論対応のバリデーションライブラリ。Zod にインスパイアされた軽量実装。",
      background: "既存のバリデーションライブラリの内部実装を理解するために自作した学習目的のプロジェクト。型推論の仕組みを深く学ぶ機会となった。",
      architecture: "Builder パターンでスキーマを宣言的に構築し、TypeScript の条件型と infer を活用して入力から型を自動推論できる構造を実現した。",
      highlights: "TypeScript の高度な型機能（Template Literal Types, Conditional Types, Mapped Types）を実際のプロダクトで使いこなす経験を積めた。",
      challenges: "型の再帰構造とパフォーマンスのトレードオフ。深くネストしたスキーマで TypeScript のコンパイル速度が低下する問題に直面した。",
      futureWork: "非同期バリデーション、カスタムエラーフォーマッター、JSON Schema との相互変換機能の追加を検討。",
      isPublished: true,
      sortOrder: 3,
      categoryId: libCat.id,
    },
  });

  await prisma.projectLink.createMany({
    data: [
      { projectId: project3.id, type: "github", url: "https://github.com", label: "GitHub", sortOrder: 1 },
      { projectId: project3.id, type: "docs", url: "https://example.com/docs", label: "ドキュメント", sortOrder: 2 },
    ],
  });

  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project3.id, technologyId: techMap["TypeScript"].id },
      { projectId: project3.id, technologyId: techMap["Node.js"].id },
    ],
  });

  console.log("Created 3 projects");

  // Skill Categories
  const frontendCat = await prisma.skillCategory.create({
    data: { name: "フロントエンド", slug: "frontend", sortOrder: 1 },
  });
  const backendCat = await prisma.skillCategory.create({
    data: { name: "バックエンド", slug: "backend", sortOrder: 2 },
  });
  const infraCat = await prisma.skillCategory.create({
    data: { name: "インフラ・ツール", slug: "infrastructure", sortOrder: 3 },
  });

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: "TypeScript", categoryId: frontendCat.id, technologyId: techMap["TypeScript"].id, proficiency: "advanced", sortOrder: 1 },
      { name: "React", categoryId: frontendCat.id, technologyId: techMap["React"].id, proficiency: "advanced", sortOrder: 2 },
      { name: "Next.js", categoryId: frontendCat.id, technologyId: techMap["Next.js"].id, proficiency: "advanced", sortOrder: 3 },
      { name: "Tailwind CSS", categoryId: frontendCat.id, technologyId: techMap["Tailwind CSS"].id, proficiency: "advanced", sortOrder: 4 },
      { name: "Node.js", categoryId: backendCat.id, technologyId: techMap["Node.js"].id, proficiency: "advanced", sortOrder: 1 },
      { name: "Go", categoryId: backendCat.id, technologyId: techMap["Go"].id, proficiency: "intermediate", sortOrder: 2 },
      { name: "PostgreSQL", categoryId: backendCat.id, technologyId: techMap["PostgreSQL"].id, proficiency: "advanced", sortOrder: 3 },
      { name: "Prisma", categoryId: backendCat.id, technologyId: techMap["Prisma"].id, proficiency: "advanced", sortOrder: 4 },
      { name: "Redis", categoryId: backendCat.id, technologyId: techMap["Redis"].id, proficiency: "intermediate", sortOrder: 5 },
      { name: "Docker", categoryId: infraCat.id, technologyId: techMap["Docker"].id, proficiency: "intermediate", sortOrder: 1 },
      { name: "AWS", categoryId: infraCat.id, technologyId: techMap["AWS"].id, proficiency: "beginner", sortOrder: 2 },
    ],
  });

  console.log("Created skills");

  // Experiences
  await prisma.experience.createMany({
    data: [
      {
        type: "work",
        organization: "株式会社テックカンパニー",
        role: "フルスタックエンジニア",
        description: "TypeScript・Next.js・PostgreSQL を用いた SaaS プロダクトの開発。フロントエンドからバックエンドまで横断的に担当し、機能開発・コードレビュー・技術選定に従事。",
        startDate: new Date("2022-04-01"),
        endDate: null,
        sortOrder: 1,
      },
      {
        type: "education",
        organization: "〇〇大学 情報工学部",
        role: "学士（情報工学）",
        description: "アルゴリズム・データ構造・ネットワーク・データベース・ソフトウェア工学を学習。卒業研究では分散システムの障害検知アルゴリズムを実装・評価した。",
        startDate: new Date("2018-04-01"),
        endDate: new Date("2022-03-31"),
        sortOrder: 2,
      },
      {
        type: "activity",
        organization: "オープンソースコミュニティ",
        role: "コントリビューター",
        description: "TypeScript 製 OSS ライブラリへのバグ修正・ドキュメント改善のコントリビューション。GitHub で複数の PR がマージされた実績あり。",
        startDate: new Date("2021-01-01"),
        endDate: null,
        sortOrder: 3,
      },
    ],
  });

  console.log("Created experiences");
  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
