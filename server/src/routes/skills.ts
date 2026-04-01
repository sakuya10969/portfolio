import { Hono } from 'hono';
import { getSkills } from '../services/skill.service';
import { successResponse, errorResponse } from '../lib/response';

const skills = new Hono();

skills.get('/', async (c) => {
  try {
    const data = await getSkills();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'スキルの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default skills;
