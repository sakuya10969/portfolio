// dotenv is only needed for local development (Bun).
// Cloudflare Workers provides env vars via the runtime, so dotenv must not be imported
// (it depends on Node.js built-ins like path, os, crypto that are unavailable in Workers).
if (typeof Bun !== 'undefined') {
  const { config } = await import('dotenv');
  const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
  config({ path: envFile });
}

export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set.');
  }

  return databaseUrl;
}

export function shouldUseSsl(databaseUrl: string) {
  try {
    const url = new URL(databaseUrl);
    return !['localhost', '127.0.0.1'].includes(url.hostname);
  } catch {
    return !databaseUrl.includes('localhost') && !databaseUrl.includes('127.0.0.1');
  }
}
