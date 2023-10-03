import db from '$db';
import { smsVerificationCodes } from '$db/schema/sms_verification_codes';
import { and, eq, gt } from 'drizzle-orm';

const verifySmsCode = async ({ code, userId }: { code: string; userId: string }) => {
	const { rowCount } = await db
		.delete(smsVerificationCodes)
		.where(
			and(
				eq(smsVerificationCodes.code, code),
				eq(smsVerificationCodes.userId, userId),
				gt(smsVerificationCodes.expireAt, new Date())
			)
		);

	return rowCount > 0;
};

export default verifySmsCode;
