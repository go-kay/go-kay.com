import type { Actions } from '@sveltejs/kit';
import { signInWithEmail } from '$db/api';
import validateEmail from '$lib/utils/validateEmail';

export const actions: Actions = {
	email: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const email = data.get('email');
		if (!email) {
			return {
				error: 'The email address is empty'
			};
		}
		if (validateEmail(email as string)) {
			await signInWithEmail({ supabase, email: email as string });
			return {
				success: true,
				message: 'Login link was sent to your email!'
			};
		} else {
			return {
				error: 'The email address you provided is invalid.'
			};
		}
	}
};
