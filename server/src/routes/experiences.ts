import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { getExperiences } from '../services/experience.service';
import { successResponse, errorResponse } from '../lib/response';
import {
  experienceSchema,
  dataEnvelope,
  apiErrorResponseSchema,
} from '../openapi/schemas';

const experienceListEnvelope = dataEnvelope(
  z.array(experienceSchema),
  'ExperienceListResponse',
);

const getExperiencesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Experiences'],
  summary: '経歴一覧取得',
  responses: {
    200: {
      description: '経歴一覧',
      content: { 'application/json': { schema: experienceListEnvelope } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

const experiences = new OpenAPIHono();

experiences.openapi(getExperiencesRoute, async (c) => {
  try {
    const data = await getExperiences();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, '経歴の取得に失敗しました', 'FETCH_ERROR');
  }
});

export default experiences;
