import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import GenderInput from '$lib/components/auth/GenderInput.svelte';

describe('GenderInput', () => {
	it('should have Male, Female buttons and a Custom input', () => {
		const { getByText, getByPlaceholderText } = render(GenderInput);
		expect(() => getByText('Male')).not.toThrow();
		expect(() => getByText('Female')).not.toThrow();
		expect(() => getByPlaceholderText('custom')).not.toThrow();
	});

	it('should have transparent buttons when gender is undefined', () => {
		const { getAllByRole } = render(GenderInput);
		const buttons = getAllByRole('button');
		buttons.forEach((button) => {
			expect(button.className).toContain('text-primary');
		});
	});

	it('should have Male button with fill color when gender value is male', () => {
		const { getByText, component } = render(GenderInput);
		component.$set({ gender: 'male' });
		const maleButton = getByText('Male');
		expect(maleButton.className).toContain('bg-primary');
	});

	it('should have Female button with fill color when gender value is female', () => {
		const { getByText } = render(GenderInput, { gender: 'female' });
		const femaleButton = getByText('Female');
		expect(femaleButton.className).toContain('bg-primary');
	});

	it('should have Male button with primaryColor background when button clicked', () => {
		const { getByText } = render(GenderInput);
		const maleButton = getByText('Male');
		maleButton.click();

		expect(maleButton.className).toContain('bg-primary');
	});

	it('should fire custom input keydown event', async () => {
		const { getByPlaceholderText } = render(GenderInput, { gender: 'female' });
		const onKeyDown = vi.fn();
		const customInput = getByPlaceholderText('custom') as HTMLInputElement;
		customInput.addEventListener('keydown', onKeyDown);
		await fireEvent.keyDown(customInput, { key: 'A' });
		expect(onKeyDown).toHaveBeenCalled();
	});
});
