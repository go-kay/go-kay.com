<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/components/toast/toast';

	$: {
		const signInSuccess = $page.url.searchParams.get('success');
		if (signInSuccess) {
			toast({
				title: 'Successfully signed in!',
				description: 'Welcome to Go Kay!',
				duration: 5000
			});
		}
	}
	function handleSwitchDarkMode() {
		let darkMode = false;
		if (localStorage.theme === 'light') {
			darkMode = true;
			localStorage.theme = 'dark';
		} else {
			localStorage.theme = 'light';
		}

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<h1>Welcome to SvelteKit</h1>

<button on:click={handleSwitchDarkMode}>change</button>
<h3>
	Visit
	<a href="https://kit.svelte.dev"> kit.svelte.dev </a>
	to read the documentation check
</h3>

<a href="/sign-in"> Sign In </a>

<button class="bg-primary text-background">hello</button>
