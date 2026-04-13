import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { getDatabaseUrl, shouldUseSsl } from '../lib/env';

const databaseUrl = getDatabaseUrl();

const client = postgres(databaseUrl, {
  ssl: shouldUseSsl(databaseUrl) ? 'require' : undefined,
  connect_timeout: 10,
});
export const db = drizzle({ client, schema });
