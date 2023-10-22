import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SelectCountry from '$lib/components/auth/SelectCountry.svelte';
import CountryCodes from '$lib/assets/CountryCodes';

describe('SelectCountry', () => {
	it('should have options with length of countries plus 1', () => {
		const { getAllByRole } = render(SelectCountry);
		const options = getAllByRole('option');
		expect(options.length).toBe(CountryCodes.length + 1);
	});

	it('should have input value with selected option as string', async () => {
		const { getAllByRole, container } = render(SelectCountry);
		const options = getAllByRole('option') as HTMLOptionElement[];
		await options[10].click();
		const input = container.querySelector('input') as HTMLInputElement;
		const select = container.querySelector('select') as HTMLSelectElement;
		expect(input.value).toBe(JSON.stringify(select.value));
	});
});
