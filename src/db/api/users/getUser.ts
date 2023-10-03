import db from '$db';
import { users } from '$db/schema/users';
import type { User } from '$db/schema/users';
import { eq } from 'drizzle-orm';

export default async function getUser({ id }: { id: string }): Promise<User | null> {
	const result = await db.select().from(users).where(eq(users.id, id));
	if (result.length === 0) {
		return null;
	}
	return result[0];
}
