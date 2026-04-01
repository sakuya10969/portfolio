import { Hono } from 'hono';
import { getProfile } from '../services/profile.service';
import { successResponse, errorResponse } from '../lib/response';

const profile = new Hono();

profile.get('/', async (c) => {
  try {
    const data = await getProfile();
    if (!data) return errorResponse(c, 'プロフィールが見つかりません', 'NOT_FOUND', 404);
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロフィールの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default profile;
