import type { LayoutServerLoad } from './$types';
import db from '$db';
import { users } from '$db/schema';
import type { User } from '$db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		const selectUser = await db.select().from(users).where(eq(users.id, session.user.id));
		if (selectUser.length > 0) {
			return {
				user: selectUser[0] as User
			};
		}
	}
};
