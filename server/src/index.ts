import { Hono } from 'hono';
import { cors } from 'hono/cors';
import profile from './routes/profile';
import projects from './routes/projects';
import skills from './routes/skills';
import experiences from './routes/experiences';
import contact from './routes/contact';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
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

export default {
  port: Number(process.env.PORT ?? 3001),
  fetch: app.fetch,
};
