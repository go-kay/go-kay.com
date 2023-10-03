import type { SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_REDIRECT_URI } from '$env/static/public';

export default async function signInWithEmail({
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
