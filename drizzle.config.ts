import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();

export default {
	schema: './src/db/schema.ts',
	out: './src/db/migrations/',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string
	}
} satisfies Config;
