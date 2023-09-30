import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import type { Provider, SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_REDIRECT_URI } from '$env/static/public';

export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	firstName: varchar('first_name', {
		length: 48
	}),
	lastName: varchar('last_name', {
		length: 48
	}),
	email: varchar('email', {
		length: 80
	}),
	phone: varchar('phone', {
		length: 24
	}),
	birthday: date('birthday'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export async function signInWithEmail({
	supabase,
	email
}: {
	supabase: SupabaseClient;
	email: string;
}) {
	await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: PUBLIC_REDIRECT_URI
		}
	});
}

export async function signInWithOAuth({
	supabase,
	provider
}: {
	supabase: SupabaseClient;
	provider: Provider;
}) {
	if (provider === 'google') {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: PUBLIC_REDIRECT_URI,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});
	} else {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: PUBLIC_REDIRECT_URI
			}
		});
	}
}

export function validateEmail(email: string) {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
