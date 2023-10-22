import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import PhoneInput from '$lib/components/auth/PhoneInput.svelte';
import CountryCodes from '$lib/assets/CountryCodes';
import { toast } from '$lib/components/toast/toast';

describe('PhoneInput', () => {
	vi.mock('$lib/components/toast/toast', () => {
		const toast = vi.fn();
		return {
			toast
		};
	});
	it('Should render SelectCountry and phone input', () => {
		const { container } = render(PhoneInput, { country: 'string', verified: false, phone: '' });
		expect(container.querySelector('input[name=country]')).toBeTruthy();
		expect(container.querySelector('input[name=phone]')).toBeTruthy();
	});

	it('should render SendVerificationCodeButton when not verified', () => {
		const { getByText } = render(PhoneInput, { country: 'string', verified: false, phone: '' });
		expect(() => getByText('Verify')).not.toThrow();
	});

	it('should not render SendVerificationCodeButton when verified', () => {
		const { getByText } = render(PhoneInput, { country: 'string', verified: true, phone: '' });
		expect(() => getByText('Verify')).toThrow();
	});

	it('should have country phone text when countryCode is passed by props', () => {
		const { getByText } = render(PhoneInput, {
			country: CountryCodes[5],
			verified: true,
			phone: ''
		});
		expect(() => getByText(CountryCodes[5].phone[0])).not.toThrow();
	});

	it('should not show toast when input keydown event fires when country is CountryCode', () => {
		const { getByPlaceholderText } = render(PhoneInput, {
			country: CountryCodes[5],
			verified: true,
			phone: ''
		});
		const input = getByPlaceholderText('phone') as HTMLInputElement;
		fireEvent.keyDown(input, {
			key: 'a',
			code: 'Keya'
		});
		expect(toast).not.toHaveBeenCalled();
	});

	it('should show toast when input keydown event fires when country is string', () => {
		const { getByPlaceholderText } = render(PhoneInput, {
			country: 'string',
			verified: true,
			phone: ''
		});
		const input = getByPlaceholderText('phone') as HTMLInputElement;
		fireEvent.keyDown(input, {
			key: 'a',
			code: 'Keya'
		});
		expect(toast).toHaveBeenCalled();
	});
});
