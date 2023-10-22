import type { Actions } from './$types';
import type { CountryCode } from '$lib/assets/CountryCodes';
import GoogleLibPhoneNumber from 'google-libphonenumber';
import db from '$db';
import { users } from '$db/schema';
import type { NewUser } from '$db/schema';
import moment from 'moment';
import { fail, redirect } from '@sveltejs/kit';
import sendVerificationSMS from '$db/api/auth/sendVerificationSMS';
import verifySmsCode from '$db/api/auth/verifySmsCode';

const { PhoneNumberFormat, PhoneNumberUtil } = GoogleLibPhoneNumber;

export const actions: Actions = {
	signUp: async ({ request, locals: { getSession } }) => {
		const data = await request.formData();
		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		let country: string | CountryCode = data.get('country') as string;
		// const verified = data.get('verified') === 'true';
		const gender = data.get('gender') as string;
		const month = data.get('month') as string;
		const day = +data.get('day')!;
		const year = +data.get('year')!;
		let phone = data.get('phone');

		if (!firstName) {
			return fail(400, {
				message: 'Please enter your first name.'
			});
		} else if (!lastName) {
			return fail(400, {
				message: 'Please enter your last name.'
			});
		} else if (!country) {
			return fail(400, {
				message: 'Please select your country.'
			});
		} else if (!phone) {
			return fail(400, {
				message: 'Please enter your phone number.'
			});
		}
		// else if (!verified) {
		// 	return fail(400, {
		// 		message: 'Please verify your phone number.'
		// 	});
		// }
		else if (!gender) {
			return fail(400, {
				message: 'Please select your gender.'
			});
		}

		country = JSON.parse(country) as CountryCode;
		const inputPhoneNumber = (country.phone[0] + phone) as string;
		const phoneUtil = PhoneNumberUtil.getInstance();
		if (!phoneUtil.isPossibleNumberString(inputPhoneNumber, country.phone[0])) {
			return fail(400, {
				message: 'Phone number is invalid.'
			});
		}

		const number = phoneUtil.parseAndKeepRawInput(inputPhoneNumber);
		phone = phoneUtil.format(number, PhoneNumberFormat.E164);

		const birthday = moment().year(year).month(month).day(day).format('YYYY-MM-DD');

		const session = await getSession();

		const newUser: NewUser = {
			id: session.user.id,
			firstName,
			lastName,
			email: session.user.email,
			avatarUrl: session.user.user_metadata.avatar_url,
			gender,
			phone,
			country: country.name,
			countryCode: country.iso['alpha-2'],
			birthday
		};

		try {
			await db.insert(users).values(newUser);
		} catch {
			return fail(400, {
				message: 'Failed to sign up. Please contact our customer service.'
			});
		}

		throw redirect(302, '/?success=true');
	},

	sendVerifySms: async ({ request }) => {
		const data = await request.formData();
		const countryPhone = data.get('countryPhone') as string;

		let phone = data.get('phone');
		if (!phone) {
			return fail(400, {
				message: 'Please enter your phone number'
			});
		}

		const inputPhoneNumber = (countryPhone + data.get('phone')) as string;
		const phoneUtil = PhoneNumberUtil.getInstance();
		if (!phoneUtil.isPossibleNumberString(inputPhoneNumber, countryPhone)) {
			return fail(400, {
				message: 'Phone number is invalid.'
			});
		}

		const number = phoneUtil.parseAndKeepRawInput(inputPhoneNumber);

		if (!phoneUtil.isValidNumber(number)) {
			return fail(400, {
				message: 'Phone number is invalid.'
			});
		}

		phone = phoneUtil.format(number, PhoneNumberFormat.E164);
		await sendVerificationSMS({ phone });

		return {
			message: 'Verification code was sent to your phone.'
		};
	},

	verify: async ({ request }) => {
		const data = await request.formData();
		const code = data.get('code') as string;
		const countryPhone = data.get('countryPhone') as string;
		const inputPhoneNumber = (countryPhone + data.get('phone')) as string;
		const phoneUtil = PhoneNumberUtil.getInstance();
		if (!phoneUtil.isPossibleNumberString(inputPhoneNumber, countryPhone)) {
			return fail(400, {
				message: 'Phone number is invalid.'
			});
		}

		const number = phoneUtil.parseAndKeepRawInput(inputPhoneNumber);
		const phone = phoneUtil.format(number, PhoneNumberFormat.E164);
		if (await verifySmsCode({ code, phone })) {
			return {
				message: 'Your phone is verified!'
			};
		}

		return fail(400, {
			message: 'Invalid code.'
		});
	}
};
