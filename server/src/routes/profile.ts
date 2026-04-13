import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { getProfile } from '../services/profile.service';
import { successResponse, errorResponse } from '../lib/response';
import {
  profileSchema,
  dataEnvelope,
  apiErrorResponseSchema,
} from '../openapi/schemas';

const profileEnvelope = dataEnvelope(profileSchema, 'ProfileResponse');

const getProfileRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Profile'],
  summary: 'プロフィール取得',
  responses: {
    200: {
      description: 'プロフィール情報',
      content: { 'application/json': { schema: profileEnvelope } },
    },
    404: {
      description: 'プロフィールが見つかりません',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: apiErrorResponseSchema } },
    },
  },
});

const profile = new OpenAPIHono();

profile.openapi(getProfileRoute, async (c) => {
  try {
    const data = await getProfile();
    if (!data) return errorResponse(c, 'プロフィールが見つかりません', 'NOT_FOUND', 404);
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロフィールの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default profile;
