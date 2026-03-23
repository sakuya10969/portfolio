/**
 * 技術名 → アイコンのマッピング
 *
 * 設計方針:
 * - DB (seed.ts / Technology.name) を正として扱い、UI側で解決する
 * - スキーマやシードに icon 情報を持たせない（表示都合の情報は UI層に閉じる）
 * - normalizeTechnologyName で表記ゆれ・余白・大文字小文字を吸収する
 * - マッピング未定義の技術はテキストのみで表示（強引な代替アイコンは使わない）
 */

import type { IconType } from 'react-icons';
import {
  FaReact,
  FaPython,
  FaAws,
  FaPhp,
  FaGolang,
  FaNodeJs,
  FaDocker,
} from 'react-icons/fa6';
import {
  SiTypescript,
  SiNestjs,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiGooglecloud,
  SiHasura,
  SiGraphql,
  SiVercel,
  SiTailwindcss,
  SiGsap,
  SiStorybook,
  SiDjango,
  SiLaravel,
  SiPrisma,
  SiJest,
  SiGo,
  SiZod,
  SiPytest,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { DiMsqlServer } from 'react-icons/di';

export type TechnologyIconEntry = {
  icon: IconType;
};

/**
 * 正規化済み技術名（小文字・trim済み）→ アイコン設定
 *
 * キーは seed.ts の technology.name を toLowerCase/trim したもの。
 * 表記ゆれ（nextjs / next.js / next 等）も同じアイコンに向ける。
 */
const ICON_MAP: Record<string, TechnologyIconEntry> = {
  // ── 言語 ────────────────────────────────────────────────
  typescript: { icon: SiTypescript },
  python: { icon: FaPython },
  php: { icon: FaPhp },
  go: { icon: FaGolang },
  golang: { icon: FaGolang },

  // ── フロントエンド ───────────────────────────────────────
  react: { icon: FaReact },
  'next.js': { icon: SiVercel },  // Next.js 専用 SI アイコンが弱いため Vercel で代替
  nextjs: { icon: SiVercel },
  next: { icon: SiVercel },
  'tailwind css': { icon: SiTailwindcss },
  tailwind: { icon: SiTailwindcss },
  gsap: { icon: SiGsap },
  storybook: { icon: SiStorybook },

  // ── バックエンド ─────────────────────────────────────────
  'node.js': { icon: FaNodeJs },
  nodejs: { icon: FaNodeJs },
  node: { icon: FaNodeJs },
  nestjs: { icon: SiNestjs },
  fastapi: { icon: SiFastapi },
  django: { icon: SiDjango },
  laravel: { icon: SiLaravel },
  graphql: { icon: SiGraphql },
  hasura: { icon: SiHasura },

  // ── DB / ORM ─────────────────────────────────────────────
  postgresql: { icon: SiPostgresql },
  postgres: { icon: SiPostgresql },
  mysql: { icon: SiMysql },
  'sql server': { icon: DiMsqlServer },
  prisma: { icon: SiPrisma },
  // TypeORM / SQLAlchemy / Alembic は SI 未対応 → テキストフォールバック

  // ── クラウド / インフラ ──────────────────────────────────
  aws: { icon: FaAws },
  'google cloud': { icon: SiGooglecloud },
  gcp: { icon: SiGooglecloud },
  'microsoft azure': { icon: VscAzure },
  azure: { icon: VscAzure },
  docker: { icon: FaDocker },

  // ── テスト / ツール ──────────────────────────────────────
  jest: { icon: SiJest },
  pytest: { icon: SiPytest },
  zod: { icon: SiZod },

  // ── AI / ML ──────────────────────────────────────────────
  // YOLO / Microsoft Foundry AI は SI 未対応 → テキストフォールバック
};

/**
 * 技術名を正規化する（大文字小文字・前後空白の揺れを吸収）
 * @example normalizeTechnologyName("  Next.js ") → "next.js"
 */
export function normalizeTechnologyName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * 技術名からアイコン設定を返す。
 * マッピング未定義の場合は null（呼び出し側でテキストのみ表示に落とす）。
 */
export function getTechnologyIcon(name: string): TechnologyIconEntry | null {
  return ICON_MAP[normalizeTechnologyName(name)] ?? null;
}
