import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString:
			'postgresql://postgres:rkawkWhgdk1!@db.izinwsjjssptbzdrftor.supabase.co:5432/postgres'
	},
	out: './src/db/migrations'
} satisfies Config;
