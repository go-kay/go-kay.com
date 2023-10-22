import '@testing-library/svelte';
import { test, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BirthdayInput from '../BirthdayInput.svelte';
import moment from 'moment/moment';

test('BirthdayInput', () => {
	const { getByText, getAllByRole } = render(BirthdayInput);
	it('should contain label "Birthday"', () => {
		const label = getByText('Birthday');
		expect(label.tagName).toBe('small');
	});

	it('should have 3 select elements', () => {
		const now = moment();
		const month = now.format('MMMM');
		const year = 2000;
		const day = 1;

		expect(() => getByText(month)).not.toThrow();
		expect(() => getByText(year)).not.toThrow();
		expect(() => getByText(day)).not.toThrow();
	});

	it('should have all options', () => {
		const options = getAllByRole('option');
		expect(options.length).toBeGreaterThan(12 + 28 + 100 + new Date().getFullYear() - 2000);
	});
});
