import { Hono } from 'hono';
import {
  getProjects,
  getProjectBySlug,
  getProjectCategories,
} from '../services/project.service';
import { successResponse, errorResponse } from '../lib/response';

const projects = new Hono();

projects.get('/categories', async (c) => {
  try {
    const data = await getProjectCategories();
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'カテゴリの取得に失敗しました', 'FETCH_ERROR');
  }
});

projects.get('/', async (c) => {
  try {
    const category = c.req.query('category');
    const technology = c.req.query('technology');
    const data = await getProjects({ category, technology });
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロジェクトの取得に失敗しました', 'FETCH_ERROR');
  }
});

projects.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const data = await getProjectBySlug(slug);
    if (!data) return errorResponse(c, 'プロジェクトが見つかりません', 'NOT_FOUND', 404);
    return successResponse(c, data);
  } catch {
    return errorResponse(c, 'プロジェクトの取得に失敗しました', 'FETCH_ERROR');
  }
});

export default projects;
