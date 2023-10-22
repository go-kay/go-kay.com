import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SendVerifyCodeButton from '$lib/components/auth/SendVerifyCodeButton.svelte';
import CountryCodes from '$lib/assets/CountryCodes';
import { enhance } from '$app/forms';

describe('SendVerifyCodeButton', () => {
	vi.mock('$app/forms', () => {
		const enhance = vi.fn();
		return { enhance };
	});

	it('should have "Verify" button when verificationCodeSent is false', () => {
		const { getByRole } = render(SendVerifyCodeButton, {
			country: 'string',
			verificationCodeSent: false,
			phone: '123'
		});

		const button = getByRole('button');
		expect(button.innerHTML).toBe('Verify');
	});

	it('should have phone input value same with props phone value', () => {
		const { container } = render(SendVerifyCodeButton, {
			country: 'string',
			verificationCodeSent: false,
			phone: '123'
		});

		const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;
		expect(phoneInput.value).toBe('123');
	});

	it('should call enhance function when button clicked', () => {
		const { container, getByRole } = render(SendVerifyCodeButton, {
			country: 'string',
			verificationCodeSent: false,
			phone: '123'
		});

		const button = getByRole('button');

		const form = container.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		button.click();

		expect(enhance).toHaveBeenCalled();
	});

	it('should have countryPhoneInput value same with countryCode.phone[0]', () => {
		const countryCode = CountryCodes[0];
		const { container, getByRole } = render(SendVerifyCodeButton, { country: countryCode });
		expect(getByRole('button').innerHTML).toBe('Verify');
		const countryPhoneInput = container.querySelector(
			'input[name="countryPhone"]'
		) as HTMLInputElement;
		expect(countryPhoneInput.value).toBe(countryCode.phone[0]);
	});

	it('should have "Resend" button When verification code sent', () => {
		const { getByRole } = render(SendVerifyCodeButton, {
			country: 'string',
			verificationCodeSent: true
		});
		const button = getByRole('button');
		expect(button.innerHTML).toContain('Resend');
	});
});
