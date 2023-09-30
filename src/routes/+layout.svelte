<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Toast from '$lib/components/toast/Toast.svelte';

	export let data: LayoutData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	if (browser) {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else if (localStorage.theme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
				localStorage.theme = 'dark';
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = 'light';
			}
		}
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});
</script>

<div class="relative">
	<slot />
	<Toast />
</div>
