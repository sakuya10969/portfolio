import { createApp } from './app';

const app = createApp();

// Cloudflare Workers (ES Module format)
export default app;

// Local development with Bun
if (typeof Bun !== 'undefined') {
  const port = Number(process.env.PORT ?? 3000);
  Bun.serve({
    port,
    fetch: app.fetch,
  });
  console.log(`Started development server: http://localhost:${port}`);
}
