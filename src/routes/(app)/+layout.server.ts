import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import getUser from '$db/api/users/getUser';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(302, '/sign-in');
	}

	if (!(await getUser({ id: session.user.id }))) {
		throw redirect(302, '/sign-up');
	}
};
