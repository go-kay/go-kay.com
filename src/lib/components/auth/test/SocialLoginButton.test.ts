import { signInWithOAuth } from '$db/api';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SocialLoginButton from '$lib/components/auth/SocialLoginButton.svelte';

vi.mock('$db/api', () => {
	return {
		signInWithOAuth: vi.fn()
	};
});
describe('SocialLoginButton', () => {
	it('should have "Sign in with facebook" button when provider is "facebook" and loading is false, ', async () => {
		const { getByText, getByRole } = render(SocialLoginButton, { provider: 'facebook' });
		expect(() => getByText('Sign in with facebook')).not.toThrow();
		const button = getByRole('button');
		await button.click();
		expect(signInWithOAuth).toHaveBeenCalled();
		expect(() => getByText('Sign in with facebook')).toThrow();
	});

	it('should have icon instead of text when loading', async () => {
		const { getByText, getByRole } = render(SocialLoginButton, {
			provider: 'facebook',
			loading: 'facebook'
		});
		expect(() => getByText('Sign in with facebook')).toThrow();
		expect(() => getByRole('progressbar')).not.toThrow();
		const button = getByRole('button') as HTMLButtonElement;
		expect(button.disabled).toBeTruthy();
	});
});
