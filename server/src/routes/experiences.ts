import { Hono } from 'hono';
import { getExperiences } from '../services/experience.service';
import { successResponse, errorResponse } from '../lib/response';

const experiences = new Hono();

experiences.get('/', async (c) => {
  try {
    const data = await getExperiences();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, '経歴の取得に失敗しました', 'FETCH_ERROR');
  }
});

export default experiences;
