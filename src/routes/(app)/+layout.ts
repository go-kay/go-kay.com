import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();
	// console.log(session?.user);
	if (!session) {
		throw redirect(302, '/sign-in');
	}
};
