import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import PhoneVerification from '$lib/components/auth/PhoneVerification.svelte';

describe('PhoneVerification', () => {
	it('should have phone, countryPhone and code inputs, and one button with text "Verify"', () => {
		const { container, getByRole } = render(PhoneVerification);
		const phoneInput = container.querySelector('input[name=phone]');
		const countryPhoneInput = container.querySelector('input[name=countryPhone]');
		const codeInput = container.querySelector('input[name=code]');
		const button = getByRole('button');

		expect(phoneInput).toBeTruthy();
		expect(countryPhoneInput).toBeTruthy();
		expect(codeInput).toBeTruthy();
		expect(button.innerHTML).toContain('Verify');
	});

	it('should have a disabled button with text "Verified!" when verified is true', () => {
		const { getByRole } = render(PhoneVerification, { verified: true });
		const button = getByRole('button') as HTMLButtonElement;
		expect(button.disabled).toBeTruthy();
		expect(button.innerHTML).toContain('Verified!');
	});
});
