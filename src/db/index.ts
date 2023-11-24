import pg from 'pg';
import { DATABASE_POOL_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const { Pool } = pg;
const pool = new Pool({
	connectionString: DATABASE_POOL_URL
});

const db: NodePgDatabase<typeof schema> = drizzle(pool, {
	schema
});

export default db;
