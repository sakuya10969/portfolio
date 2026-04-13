import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { getDatabaseUrl, shouldUseSsl } from '../lib/env';

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const databaseUrl = getDatabaseUrl();
    const client = postgres(databaseUrl, {
      ssl: shouldUseSsl(databaseUrl) ? 'require' : undefined,
      connect_timeout: 10,
    });
    _db = drizzle({ client, schema });
  }
  return _db;
}

// Keep backward-compatible named export as a getter
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
