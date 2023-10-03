import twilio from '$lib/utils/twilio';
import { TWILIO_SERVICE_SID } from '$env/static/private';

const sendVerificationSMS = async ({ phone }: { phone: string }) => {
	await twilio.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
		to: phone,
		channel: 'sms'
	});
};

export default sendVerificationSMS;
