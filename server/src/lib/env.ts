import { config } from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';

config({ path: envFile });

export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(`DATABASE_URL is not set. Expected it in ${envFile}.`);
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
