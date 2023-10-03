import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const { error: e } = await supabase.auth.exchangeCodeForSession(code);
		if (e) {
			throw error(404, e);
		}
	}

	throw redirect(303, '/?success=true');
};
