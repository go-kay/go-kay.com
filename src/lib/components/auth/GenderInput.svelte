<script lang="ts">
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let gender: string;

	const handleCustomInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
		gender = (e.target as HTMLInputElement).value;
	};
</script>

<small class="text-primary">Gender</small>

<div class="flex space-x-4">
	<button
		type="button"
		class="border rounded border-primary w-full h-12 {gender === 'male'
			? 'bg-primary text-background'
			: 'text-primary sm:hover:bg-primary-100 dark:sm:hover:bg-primary-800'}"
		on:click={() => (gender = 'male')}
		value="male">Male</button
	>
	<button
		type="button"
		class="border rounded border-primary w-full h-12 {gender === 'female'
			? 'bg-primary text-background'
			: 'text-primary sm:hover:bg-primary-100 dark:sm:hover:bg-primary-800'}"
		on:click={() => (gender = 'female')}
		value="female">Female</button
	>
	<input type="text" placeholder="custom" on:keydown={handleCustomInput} />
	<input type="text" name="gender" value={gender} class="hidden" />
</div>
