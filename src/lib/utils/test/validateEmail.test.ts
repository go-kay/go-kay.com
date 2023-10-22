import { describe, it, expect } from 'vitest';
import validateEmail from '../validateEmail';

describe('email validation', () => {
	it('test@test.com should be true', () => {
		expect(validateEmail('test@test.com')).toBe(true);
	});

	it('test.com should be false', () => {
		expect(validateEmail('test.com')).toBe(false);
	});

	it('empty string should be false', () => {
		expect(validateEmail('')).toBe(false);
	});

	it('only domain should be false', () => {
		expect(validateEmail('@google.com')).toBe(false);
	});

	it('test@google should be false', () => {
		expect(validateEmail('test@google')).toBe(false);
	});
});
