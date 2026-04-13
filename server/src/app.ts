import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import profile from './routes/profile';
import projects from './routes/projects';
import skills from './routes/skills';
import experiences from './routes/experiences';
import contact from './routes/contact';
import { errorResponse } from './lib/response';

type Bindings = {
  DATABASE_URL?: string;
  CORS_ORIGIN?: string;
  PORT?: string;
};

export function createApp() {
  const app = new OpenAPIHono<{ Bindings: Bindings }>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return errorResponse(c, '入力内容に誤りがあります', 'VALIDATION_ERROR', 400);
      }
    },
  });

  // Bridge Cloudflare Workers env bindings to process.env
  // so existing code using process.env continues to work.
  app.use('*', async (c, next) => {
    if (typeof Bun === 'undefined' && c.env) {
      for (const [key, value] of Object.entries(c.env)) {
        if (typeof value === 'string' && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }
    await next();
  });

  app.use('*', logger());

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
