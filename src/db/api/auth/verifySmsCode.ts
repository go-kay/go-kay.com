import twilio from '$lib/utils/twilio';
import { TWILIO_SERVICE_SID } from '$env/static/private';

const verifySmsCode = async ({ code, phone }: { code: string; phone: string }) => {
	const result = await twilio.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
		to: phone,
		code
	});
	return result.status === 'approved';
};

export default verifySmsCode;
