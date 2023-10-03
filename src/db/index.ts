import { Pool } from 'pg';
import { DATABASE_POOL_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
	connectionString: DATABASE_POOL_URL
});

const db = drizzle(pool);

export default db;
