import type { Actions } from '@sveltejs/kit';
import db from '$db';
import { fail, redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import type { NewTopic } from '$db/schema';
import { topics, users } from '$db/schema';
import { eq } from 'drizzle-orm';
import { toast } from '$lib/components/toast/toast';

export const actions: Actions = {
	createTopic: async ({ request, locals: { getSession } }) => {
		const session: Session | null = await getSession();
		if (!session) {
			throw redirect(302, '/sign-in');
		}
		const selectUser = await db.select().from(users).where(eq(users.id, session.user.id));
		if (selectUser.length === 0) {
			return fail(400, {
				message: 'Please sign-in to create a topic'
			});
		}
		const userId = selectUser[0].id;
		const data = await request.formData();
		let name = data.get('name');
		if (!name) {
			console.log('fail');
			return fail(400, {
				message: 'Please write name of the topic'
			});
		}
		name = String(name);

		let description = data.get('description');
		if (!description) {
			return fail(400, {
				message: 'Please write description of the topic'
			});
		}
		description = String(description);

		let icon = data.get('icon');
		if (!icon) {
			return fail(400, {
				message: 'Please select an icon of the topic'
			});
		}
		icon = String(icon);

		const newTopic: NewTopic = {
			creatorId: userId,
			name,
			description,
			icon
		};

		const result = await db.insert(topics).values(newTopic);
		if (result.rowCount !== 1) {
			return fail(400, {
				message: "Something's wrong! Please contact our customer service!"
			});
		}
	}
};
