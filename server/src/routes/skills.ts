import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { getSkills } from '../services/skill.service';
import { successResponse, errorResponse } from '../lib/response';
import {
  skillCategoryWithSkillsSchema,
  dataEnvelope,
  apiErrorResponseSchema,
} from '../openapi/schemas';

const skillListEnvelope = dataEnvelope(
  z.array(skillCategoryWithSkillsSchema),
  'SkillListResponse',
);

const getSkillsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Skills'],
  summary: 'スキル一覧取得（カテゴリ別）',
  responses: {
    200: {
      description: 'スキル一覧',
      content: { 'application/json': { schema: skillListEnvelope } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

const skills = new OpenAPIHono();

skills.openapi(getSkillsRoute, async (c) => {
  try {
    const data = await getSkills();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'スキルの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default skills;
