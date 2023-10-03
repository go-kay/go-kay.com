import twilio from '$lib/utils/twilio';
import { TWILIO_PHONE_NUMBER } from '$env/static/private';
import { smsVerificationCodes } from '$db/schema/sms_verification_codes';
import db from '$db';
import moment from 'moment';
import { generateRandomCode } from '$lib/utils/generateRandomCode';

const sendVerificationSMS = async ({ userId, phone }: { userId: string; phone: string }) => {
	const expireAt = moment().add(3, 'minutes').toDate();
	const code = generateRandomCode({ length: 6 });
	await db
		.insert(smsVerificationCodes)
		.values({
			userId,
			expireAt,
			code
		})
		.onConflictDoUpdate({
			target: smsVerificationCodes.userId,
			set: {
				expireAt,
				code
			}
		});

	await twilio.messages.create({
		to: phone,
		from: TWILIO_PHONE_NUMBER,
		body: `Your go kay phone verification code is: [${code}]`
	});
};

export default sendVerificationSMS;
