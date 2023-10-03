import type { Provider, SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_REDIRECT_URI } from '$env/static/public';

export default async function signInWithOAuth({
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
