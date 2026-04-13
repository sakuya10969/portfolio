import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import profile from './routes/profile';
import projects from './routes/projects';
import skills from './routes/skills';
import experiences from './routes/experiences';
import contact from './routes/contact';
import { errorResponse } from './lib/response';

export function createApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return errorResponse(c, '入力内容に誤りがあります', 'VALIDATION_ERROR', 400);
      }
    },
  });

  app.use(
    '*',
    cors({
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
      allowMethods: ['GET', 'POST'],
      allowHeaders: ['Content-Type'],
    }),
  );

  app.get('/health', (c) => c.json({ status: 'ok' }));

  app.route('/api/profile', profile);
  app.route('/api/projects', projects);
  app.route('/api/skills', skills);
  app.route('/api/experiences', experiences);
  app.route('/api/contact', contact);

  return app;
}
