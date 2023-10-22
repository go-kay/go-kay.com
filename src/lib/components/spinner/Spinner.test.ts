import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Spinner from '$lib/components/spinner/Spinner.svelte';

describe('Spinner', () => {
	it('should be rendered as role of progressbar', () => {
		const { getByRole } = render(Spinner);

		expect(getByRole('progressbar')).toBeTruthy();
	});
});
