import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$db';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const {
			error: e,
			data: { user }
		} = await supabase.auth.exchangeCodeForSession(code);
		if (e) {
			throw error(404, e);
		}

		const selectUser = await db.select().from(users).where(eq(users.id, user!.id));
		if (selectUser.length === 0) {
			throw redirect(303, '/sign-up');
		}
	}
	throw redirect(303, '/?success=true');
};
