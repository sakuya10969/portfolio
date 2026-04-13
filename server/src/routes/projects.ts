import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  getProjects,
  getProjectBySlug,
  getProjectCategories,
} from '../services/project.service';
import { successResponse, errorResponse } from '../lib/response';
import {
  projectSchema,
  projectCategorySchema,
  dataEnvelope,
  apiErrorResponseSchema,
} from '../openapi/schemas';

const projectListEnvelope = dataEnvelope(z.array(projectSchema), 'ProjectListResponse');
const projectDetailEnvelope = dataEnvelope(projectSchema, 'ProjectDetailResponse');
const categoryListEnvelope = dataEnvelope(z.array(projectCategorySchema), 'CategoryListResponse');

// ── GET /categories ──

const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  tags: ['Projects'],
  summary: 'カテゴリ一覧取得',
  responses: {
    200: {
      description: 'カテゴリ一覧',
      content: { 'application/json': { schema: categoryListEnvelope } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

// ── GET / ──

const getProjectsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Projects'],
  summary: 'プロジェクト一覧取得',
  request: {
    query: z.object({
      category: z.string().optional().openapi({ description: 'カテゴリ slug でフィルタ' }),
      technology: z.string().optional().openapi({ description: '技術名でフィルタ' }),
    }),
  },
  responses: {
    200: {
      description: 'プロジェクト一覧',
      content: { 'application/json': { schema: projectListEnvelope } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

// ── GET /:slug ──

const getProjectBySlugRoute = createRoute({
  method: 'get',
  path: '/{slug}',
  tags: ['Projects'],
  summary: 'プロジェクト詳細取得',
  request: {
    params: z.object({
      slug: z.string().openapi({ description: 'プロジェクトの slug' }),
    }),
  },
  responses: {
    200: {
      description: 'プロジェクト詳細',
      content: { 'application/json': { schema: projectDetailEnvelope } },
    },
    404: {
      description: 'プロジェクトが見つかりません',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

// ── App ──

const projects = new OpenAPIHono();

projects.openapi(getCategoriesRoute, async (c) => {
  try {
    const data = await getProjectCategories();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'カテゴリの取得に失敗しました', 'FETCH_ERROR');
  }
});

projects.openapi(getProjectsRoute, async (c) => {
  try {
    const { category, technology } = c.req.valid('query');
    const data = await getProjects({ category, technology });
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロジェクトの取得に失敗しました', 'FETCH_ERROR');
  }
});

projects.openapi(getProjectBySlugRoute, async (c) => {
  try {
    const { slug } = c.req.valid('param');
    const data = await getProjectBySlug(slug);
    if (!data) return errorResponse(c, 'プロジェクトが見つかりません', 'NOT_FOUND', 404);
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロジェクトの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default projects;
