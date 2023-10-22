import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import EmailLoginForm from '$lib/components/auth/EmailLoginForm.svelte';

describe('EmailLoginForm', () => {
	it('should have a button', () => {
		const { getByRole } = render(EmailLoginForm);
		expect(() => getByRole('button')).not.toThrow();
	});

	it('should not have Spinner when not loading', () => {
		const { getByRole } = render(EmailLoginForm);
		expect(() => getByRole('progressbar')).toThrow();
	});

	it('should not have button text when button clicked', async () => {
		const { getByRole, component, getByText } = render(EmailLoginForm);
		const button = getByRole('button');
		button.onclick = (e) => {
			e.preventDefault();
			component.$set({ loading: 'email' });
		};
		await button.click();
		expect(() => getByText('Sign in with email')).toThrow();
	});

	it('should have Spinner when loading', () => {
		const { getByRole } = render(EmailLoginForm, {
			loading: 'email'
		});
		expect(() => getByRole('progressbar')).not.toThrow();
	});

	it('should have disabled button', () => {
		const { getByRole } = render(EmailLoginForm, {
			loading: 'email'
		});
		const onsubmit = vi.fn();
		const form = document.getElementsByTagName('form')[0];
		form.onsubmit = onsubmit;
		const button = getByRole('button');
		button.click();
		expect(onsubmit).not.toHaveBeenCalled();
	});

	it('should have a button with text "Sign in with email" when not loading', () => {
		const { getByRole } = render(EmailLoginForm);
		const button = getByRole('button');
		expect(button.innerHTML).toContain('Sign in with email');
	});
});
