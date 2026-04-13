import { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Started development server: http://localhost:${port}`);
